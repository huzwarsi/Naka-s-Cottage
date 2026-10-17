import { NextResponse } from 'next/server';
import { getHotels, createHotel } from '@/lib/db';

export async function GET() {
  try {
    const hotels = await getHotels();
    return NextResponse.json({ success: true, hotels });
  } catch (error: any) {
    console.error('API Error fetching hotels:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.id || !body.name) {
      return NextResponse.json({ success: false, error: 'ID and Name are required' }, { status: 400 });
    }
    const created = await createHotel(body);
    return NextResponse.json({ success: true, hotel: created });
  } catch (error: any) {
    console.error('API Error creating hotel:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
