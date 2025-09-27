import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      animalId,
      vaccineName,
      dateAdministered,
      batchNumber,
      notes,
      ownerAadhaar,
      vaccineType,
      nextDueDate,
      veterinarian
    } = body;

    if (!animalId || !vaccineName || !dateAdministered || !ownerAadhaar || !vaccineType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const vaccination = await prisma.vaccination.create({
      data: {
        animalId,
        vaccineName,
        dateAdministered: new Date(dateAdministered),
        batchNumber: batchNumber || null,
        notes: notes || null,
        ownerAadhaar,
        vaccineType,
        nextDueDate: nextDueDate ? new Date(nextDueDate) : null,
        veterinarian: veterinarian || null
      }
    });

    return NextResponse.json({ vaccination }, { status: 201 });
  } catch (error) {
    console.error('Create vaccination error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


