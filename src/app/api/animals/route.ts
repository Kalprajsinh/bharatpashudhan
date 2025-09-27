import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      breed,
      gender,
      dob,
      color,
      physicalMarks,
      photoUrl,
      ownerAadhaar,
      ownerName,
      detectedBreed,
      detectedImageBase64
    } = body;

    if (!breed || !gender || !dob || !color || !ownerAadhaar) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const animal = await prisma.animal.create({
      data: {
        breed,
        gender,
        dob: new Date(dob),
        color,
        physicalMarks: physicalMarks || null,
        photoUrl: photoUrl || null,
        ownerAadhaar,
        ownerName: ownerName || null,
        detectedBreed: detectedBreed || null,
        detectedImageBase64: detectedImageBase64 || null
      }
    });

    return NextResponse.json({ animal }, { status: 201 });
  } catch (error) {
    console.error('Create animal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


