import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      animalId,
      issueType,
      dateReported,
      symptoms,
      treatment,
      veterinarian,
      notes
    } = body;

    if (!animalId || !issueType || !dateReported || !symptoms) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const healthIssue = await prisma.healthIssue.create({
      data: {
        animalId,
        issueType,
        dateReported: new Date(dateReported),
        symptoms,
        treatment: treatment || null,
        veterinarian: veterinarian || null,
        notes: notes || null
      }
    });

    return NextResponse.json({ healthIssue }, { status: 201 });
  } catch (error) {
    console.error('Create health issue error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


