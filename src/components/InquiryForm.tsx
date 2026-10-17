"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { useHotel } from "@/context/HotelContext";
import { formatPhoneNumber } from "@/lib/formatPhone";

const emptySubscribe = () => () => { };

interface FormData {
  name: string;
  email: string;
  arrival: string;
  departure: string;
  guests: number;
  roomPreference: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  arrival?: string;
  departure?: string;
  guests?: string;
}

type SubmissionState = {
  status: "idle" | "ready-to-send" | "submitting" | "demo-notice";
  actionType?: "mailto" | "whatsapp" | "demo" | "endpoint";
  url?: string;
};

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDaysToDate = (dateString: string, days: number) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return getLocalDateString(date);
};

export function InquiryForm() {
  const hotel = useHotel();
  const { inquiry, rooms, name: hotelName, contact } = hotel;

  const whatsappDisplay = (contact as any)?.whatsappNumber || "995597123880";
  const whatsappRaw = String(whatsappDisplay).replace(/[^0-9]/g, "");
  const formattedPhone = formatPhoneNumber(whatsappDisplay);

  const nameId = useId();
  const emailId = useId();
  const arrivalId = useId();
  const departureId = useId();
  const guestsId = useId();
  const roomId = useId();
  const messageId = useId();

  // Local date avoids UTC timezone issues that can make today's date appear as yesterday.
  const todayStr = useSyncExternalStore(
    emptySubscribe,
    () => getLocalDateString(),
    () => ""
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    arrival: "",
    departure: "",
    guests: 2,
    roomPreference: rooms[0]?.id || "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
  });

  useEffect(() => {
    const checkHashForRoom = () => {
      const hash = window.location.hash;
      if (!hash.includes("room=")) return;

      const roomIdParam = hash.split("room=")[1]?.split("&")[0];
      if (!roomIdParam) return;

      try {
        const decodedRoomId = decodeURIComponent(roomIdParam);
        if (rooms.some((room) => room.id === decodedRoomId)) {
          setFormData((prev) => ({ ...prev, roomPreference: decodedRoomId }));
        }
      } catch {
        // Ignore malformed URL fragments.
      }
    };

    checkHashForRoom();
    window.addEventListener("hashchange", checkHashForRoom);
    return () => window.removeEventListener("hashchange", checkHashForRoom);
  }, [rooms]);

  const stayNights = (() => {
    if (!formData.arrival || !formData.departure) return null;
    const start = new Date(`${formData.arrival}T00:00:00`);
    const end = new Date(`${formData.departure}T00:00:00`);
    const days = Math.round((end.getTime() - start.getTime()) / 86400000);
    return days > 0 ? days : null;
  })();

  const handleArrivalChange = (arrival: string) => {
    setFormData((prev) => {
      const next = { ...prev, arrival };
      if (prev.departure && prev.departure <= arrival) {
        next.departure = addDaysToDate(arrival, 1);
      }
      return next;
    });

    setErrors((prev) => ({ ...prev, arrival: undefined, departure: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Enter your name.";
    if (!formData.email.trim()) {
      nextErrors.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!formData.arrival) {
      nextErrors.arrival = "Choose check-in.";
    } else if (todayStr && formData.arrival < todayStr) {
      nextErrors.arrival = "Check-in cannot be in the past.";
    }

    if (!formData.departure) {
      nextErrors.departure = "Choose check-out.";
    } else if (formData.arrival && formData.departure <= formData.arrival) {
      nextErrors.departure = "Check-out must be after check-in.";
    }

    if (!formData.guests || formData.guests < 1) {
      nextErrors.guests = "Select at least 1 guest.";
    } else if (formData.guests > 6) {
      nextErrors.guests = "For more than 6 guests, contact the property directly.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const selectedRoom =
      rooms.find((room) => room.id === formData.roomPreference)?.name ||
      "Entire accommodation";

    const inquiryText = [
      `Stay enquiry — ${hotelName}`,
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Check-in: ${formData.arrival}`,
      `Check-out: ${formData.departure}`,
      stayNights ? `Duration: ${stayNights} night(s)` : "",
      `Guests: ${formData.guests}`,
      `Preferred accommodation: ${selectedRoom}`,
      formData.message.trim() ? `Special requests: ${formData.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (inquiry.destinationType === "mailto") {
      const recipient = inquiry.contactEmail || "nakascottage@gmail.com";
      const subject = encodeURIComponent(
        `Stay enquiry: ${formData.name.trim()} (${formData.arrival} to ${formData.departure})`
      );
      const url = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(inquiryText)}`;
      setSubmissionState({ status: "ready-to-send", actionType: "mailto", url });
    } else if (inquiry.destinationType === "whatsapp") {
      const number = String(inquiry.whatsappNumber || whatsappRaw).replace(/[^0-9]/g, "");
      const url = `https://wa.me/${number}?text=${encodeURIComponent(inquiryText)}`;
      setSubmissionState({ status: "ready-to-send", actionType: "whatsapp", url });
    } else if (inquiry.destinationType === "endpoint" && inquiry.endpointUrl) {
      setSubmissionState({ status: "submitting", actionType: "endpoint" });

      try {
        const response = await fetch(inquiry.endpointUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmissionState({ status: "ready-to-send", actionType: "endpoint" });
        } else {
          alert("We couldn't send your enquiry. Please contact the property directly.");
          setSubmissionState({ status: "idle" });
        }
      } catch {
        alert("Network error. Please contact the property directly.");
        setSubmissionState({ status: "idle" });
      }
    } else {
      setSubmissionState({ status: "demo-notice", actionType: "demo" });
    }
  };

  const launchExternalApp = () => {
    if (submissionState.url) window.location.href = submissionState.url;
  };

  const inputClass =
    "w-full rounded-xl border border-[#e5e0d5] bg-white px-4 py-3 text-sm text-[#26372d] outline-none transition placeholder:text-[#9a9b91] focus:border-[#526b58] focus:ring-4 focus:ring-[#526b58]/10";
  const labelClass =
    "mb-2 block text-xs uppercase tracking-wider font-extrabold text-[#1B2E24]";

  return (
    <section
      id="inquire"
      aria-labelledby="inquiry-heading"
      className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 bg-[#F6F2EA]"
    >
      <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] border border-[#E7DDCE] bg-[#FFFCF7] p-6 shadow-2xl sm:rounded-[36px] sm:p-10 md:p-12">
        <div className="mb-8 max-w-2xl sm:mb-12">
          <div className="mb-2 flex items-center space-x-2">
            <span className="h-[2px] w-6 bg-[#B18A5A] sm:w-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B18A5A] sm:text-xs">
              Reservations &amp; Inquiries
            </span>
          </div>
          <h2
            id="inquiry-heading"
            className="mb-2.5 font-serif text-2xl font-bold leading-tight text-[#1B2E24] sm:text-3xl md:text-4xl"
          >
            Plan Your Stay at {hotelName || "Naka's Cottage"}
          </h2>
          <p className="text-xs font-normal leading-relaxed text-[#6D7168] sm:text-sm">
            Send your preferred dates and guest details to ask about availability and the current rate.
            Your reservation is not confirmed until the property replies.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <aside className="flex flex-col justify-between rounded-[24px] border border-[#31483A]/60 bg-[#14231A] p-6 text-white shadow-xl sm:rounded-[30px] sm:p-8">
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#E7DDCE]/30 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E7DDCE]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span>{hotelName || "Naka's Cottage"}</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                A Private Stay in Tbilisi
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                Entire accommodation with approximately 104 m² of space, views toward Tbilisi Sea,
                and a comfortable setting for families or small groups.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["104 m²", "Accommodation"],
                  ["Up to 6", "Guests"],
                  ["Indoor pool", "Pool facility"],
                  ["Free Wi-Fi", "Internet access"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-xs"
                  >
                    <p className="text-base font-bold text-white">{value}</p>
                    <p className="mt-0.5 text-[11px] text-[#E7DDCE]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/15 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#B18A5A]">
                  Property Amenities
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-medium text-white/90">
                  <li>✓ Indoor pool</li>
                  <li>✓ Free Wi-Fi</li>
                  <li>✓ Free parking</li>
                  <li>✓ Balcony / terrace</li>
                  <li>✓ Garden area</li>
                  <li>✓ Tbilisi Sea views</li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-[#B18A5A]/40 bg-white/[0.07] p-4">
                <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#E7DDCE]">
                  Nightly Rate
                </span>
                <p className="mt-1 font-serif text-2xl font-bold text-white">
                  Check current rates
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                  Prices can vary by date, guest count, and availability. Contact the property for
                  the exact quote before confirming your stay.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <span className="mb-2.5 block text-xs font-medium text-white/75">
                Contact the property directly
              </span>
              <a
                href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                  `Hello! I would like to check availability and current rates at ${hotelName || "Naka's Cottage"}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full transform items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-[#20bd5a]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.9 11.9 0 0 0 5.76 1.47h.01c6.58 0 11.93-5.35 11.93-11.93a11.85 11.85 0 0 0-3.5-8.42ZM12.09 21.8h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.23-.37a9.85 9.85 0 0 1-1.51-5.27c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
                <span>WhatsApp: {formattedPhone}</span>
              </a>
            </div>
          </aside>

          <div className="rounded-[24px] border border-[#E7DDCE] bg-[#F6F2EA]/75 p-6 shadow-sm sm:rounded-[30px] sm:p-9">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {rooms.length > 0 && (
                <div>
                  <label htmlFor={roomId} className={labelClass}>
                    Preferred accommodation
                  </label>
                  <select
                    id={roomId}
                    value={formData.roomPreference}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, roomPreference: event.target.value }))
                    }
                    className={inputClass}
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}{room.rate ? ` — ${room.rate}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={nameId} className={labelClass}>Full name *</label>
                  <input
                    id={nameId}
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(event) => {
                      setFormData((prev) => ({ ...prev, name: event.target.value }));
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                    className={inputClass}
                  />
                  {errors.name && <p id={`${nameId}-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor={emailId} className={labelClass}>Email address *</label>
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(event) => {
                      setFormData((prev) => ({ ...prev, email: event.target.value }));
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${emailId}-error` : undefined}
                    className={inputClass}
                  />
                  {errors.email && <p id={`${emailId}-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={arrivalId} className={labelClass}>Check-in *</label>
                  <input
                    id={arrivalId}
                    type="date"
                    min={todayStr || undefined}
                    value={formData.arrival}
                    onChange={(event) => handleArrivalChange(event.target.value)}
                    aria-invalid={Boolean(errors.arrival)}
                    aria-describedby={errors.arrival ? `${arrivalId}-error` : undefined}
                    className={inputClass}
                  />
                  {errors.arrival && <p id={`${arrivalId}-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.arrival}</p>}
                </div>
                <div>
                  <label htmlFor={departureId} className={labelClass}>Check-out *</label>
                  <input
                    id={departureId}
                    type="date"
                    min={formData.arrival ? addDaysToDate(formData.arrival, 1) : todayStr || undefined}
                    value={formData.departure}
                    onChange={(event) => {
                      setFormData((prev) => ({ ...prev, departure: event.target.value }));
                      setErrors((prev) => ({ ...prev, departure: undefined }));
                    }}
                    aria-invalid={Boolean(errors.departure)}
                    aria-describedby={errors.departure ? `${departureId}-error` : undefined}
                    className={inputClass}
                  />
                  {errors.departure && <p id={`${departureId}-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.departure}</p>}
                </div>
              </div>

              {stayNights && (
                <div className="flex items-center justify-between rounded-xl bg-[#f5f4ee] px-4 py-3 text-sm">
                  <span className="text-[#6d756b]">Length of stay</span>
                  <span className="font-semibold text-[#263d30]">
                    {stayNights} {stayNights === 1 ? "night" : "nights"}
                  </span>
                </div>
              )}

              <div>
                <label htmlFor={guestsId} className={labelClass}>Guests *</label>
                <select
                  id={guestsId}
                  value={formData.guests}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, guests: Number(event.target.value) }))
                  }
                  className={inputClass}
                >
                  {Array.from({ length: 6 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                {errors.guests && <p role="alert" className="mt-1 text-xs text-red-600">{errors.guests}</p>}
              </div>

              <div>
                <label htmlFor={messageId} className={labelClass}>
                  Special requests <span className="font-normal text-[#8b8d84]">(optional)</span>
                </label>
                <textarea
                  id={messageId}
                  rows={3}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Anything we should know?"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={submissionState.status === "submitting"}
                className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1B2E24] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-[#31483A] hover:shadow-xl focus:outline-none disabled:cursor-wait disabled:opacity-60"
              >
                {submissionState.status === "submitting" ? "Sending Request…" : "Request Availability & Quote"}
                <span aria-hidden="true">&rarr;</span>
              </button>
              <p className="text-center text-[11px] leading-relaxed text-[#6D7168]">
                This is an enquiry only. Your stay is not booked until the property confirms availability and price.
              </p>
            </form>
          </div>
        </div>
      </div>

      {submissionState.status !== "idle" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submission-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#17251c]/60 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#e8e2d7] bg-white p-6 shadow-2xl sm:p-8">
            {submissionState.actionType === "mailto" && (
              <>
                <h3 id="submission-modal-title" className="font-serif text-2xl font-semibold text-[#263d30]">Your enquiry is ready</h3>
                <p className="mt-2 text-sm leading-6 text-[#73776e]">Open your email app to review and send your stay request.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={launchExternalApp} className="flex-1 rounded-xl bg-[#263d30] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d3025]">Open email</button>
                  <button type="button" onClick={() => setSubmissionState({ status: "idle" })} className="rounded-xl border border-[#e5e0d5] px-4 py-3 text-sm font-semibold text-[#263d30] hover:bg-[#f7f6f1]">Close</button>
                </div>
              </>
            )}

            {submissionState.actionType === "whatsapp" && (
              <>
                <h3 id="submission-modal-title" className="font-serif text-2xl font-semibold text-[#263d30]">Continue on WhatsApp</h3>
                <p className="mt-2 text-sm leading-6 text-[#73776e]">Your stay details are ready. Open WhatsApp and send the message to the property.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={launchExternalApp} className="flex-1 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]">Open WhatsApp</button>
                  <button type="button" onClick={() => setSubmissionState({ status: "idle" })} className="rounded-xl border border-[#e5e0d5] px-4 py-3 text-sm font-semibold text-[#263d30] hover:bg-[#f7f6f1]">Close</button>
                </div>
              </>
            )}

            {submissionState.actionType === "endpoint" && submissionState.status === "ready-to-send" && (
              <>
                <h3 id="submission-modal-title" className="font-serif text-2xl font-semibold text-[#263d30]">Request sent</h3>
                <p className="mt-2 text-sm leading-6 text-[#73776e]">Your enquiry has been submitted. The property team can follow up with availability and pricing.</p>
                <button type="button" onClick={() => setSubmissionState({ status: "idle" })} className="mt-6 w-full rounded-xl bg-[#263d30] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d3025]">Done</button>
              </>
            )}

            {submissionState.actionType === "demo" && (
              <>
                <h3 id="submission-modal-title" className="font-serif text-2xl font-semibold text-[#263d30]">Form validated</h3>
                <p className="mt-2 text-sm leading-6 text-[#73776e]">Your details are ready, but this form is not connected to a live booking service yet.</p>
                <button type="button" onClick={() => setSubmissionState({ status: "idle" })} className="mt-6 w-full rounded-xl bg-[#263d30] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d3025]">Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
