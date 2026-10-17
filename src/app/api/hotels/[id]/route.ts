import { NextResponse } from 'next/server';
import { getActiveHotel, updateHotel, deleteHotel } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const hotel = await getActiveHotel(id);
    if (!hotel) {
      return NextResponse.json({ success: false, error: 'Hotel not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, hotel });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateHotel(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Hotel not found or could not be updated' }, { status: 404 });
    }
    return NextResponse.json({ success: true, hotel: updated });
  } catch (error: any) {
    console.error('API Error updating hotel:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteHotel(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
