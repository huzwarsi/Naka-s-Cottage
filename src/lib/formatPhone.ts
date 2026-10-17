/**
 * Formats phone numbers cleanly for luxury display
 * e.g., "995597123880" -> "+995 597 12 38 80"
 * "+995 597 12 38 80" -> "+995 597 12 38 80"
 */
export function formatPhoneNumber(phone?: string): string {
  if (!phone) return "";
  const cleaned = phone.trim();
  const digits = cleaned.replace(/[^0-9]/g, "");

  // Georgia international: 995597123880 (12 digits)
  if (digits.startsWith("995") && digits.length === 12) {
    return `+995 ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }

  // Georgia without 995 (e.g. 597123880 - 9 digits)
  if (digits.length === 9 && digits.startsWith("5")) {
    return `+995 ${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
  }

  // Pakistan 11 digits (e.g. 03008246707 -> +92 300 8246707)
  if (digits.length === 11 && digits.startsWith("03")) {
    return `+92 ${digits.slice(1, 4)} ${digits.slice(4)}`;
  }

  // Pakistan 12 digits (e.g. 923008246707 -> +92 300 8246707)
  if (digits.length === 12 && digits.startsWith("923")) {
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  return cleaned;
}

/**
 * Returns raw digits with country code for wa.me links
 */
export function getWhatsAppRawDigits(phone?: string): string {
  if (!phone) return "995597123880";
  const digits = phone.replace(/[^0-9]/g, "");

  // Georgia: 995...
  if (digits.startsWith("995")) {
    return digits;
  }
  // Georgia local (9 digits starting with 5):
  if (digits.length === 9 && digits.startsWith("5")) {
    return "995" + digits;
  }
  // Pakistan:
  if (digits.startsWith("0")) {
    return "92" + digits.slice(1);
  }
  if (digits.startsWith("92")) {
    return digits;
  }

  return digits;
}
