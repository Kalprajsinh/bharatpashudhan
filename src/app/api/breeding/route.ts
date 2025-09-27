import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      femaleAnimalId,
      maleAnimalId,
      breedingDate,
      veterinarian,
      notes,
      ownerAadhaar,
      breedingMethod,
      expectedDeliveryDate,
      aiDetails
    } = body;

    if (!femaleAnimalId || !breedingDate || !ownerAadhaar || !breedingMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const breeding = await prisma.breedingRecord.create({
      data: {
        femaleAnimalId,
        maleAnimalId: maleAnimalId || null,
        breedingDate: new Date(breedingDate),
        veterinarian: veterinarian || null,
        notes: notes || null,
        ownerAadhaar,
        breedingMethod,
        expectedDeliveryDate: expectedDeliveryDate ? new Date(expectedDeliveryDate) : null,
        aiDetails: aiDetails || null
      }
    });

    return NextResponse.json({ breeding }, { status: 201 });
  } catch (error) {
    console.error('Create breeding record error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


