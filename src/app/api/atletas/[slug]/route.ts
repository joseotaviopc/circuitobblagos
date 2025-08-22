import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../db';
import { eq } from 'drizzle-orm';
import { atletas } from '../../../../../db/schema';

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await req.json();

    // Construct the update object, excluding 'id' as it should not be changed
    const updateData: Record<string, any> = {};
    for (const key in body) {
      if (key !== 'id') {
        updateData[key] = body[key];
      }
    }

    const updatedAthletes = await db.update(atletas)
      .set(updateData)
      .where(eq(atletas.id, slug))
      .returning();

    if (updatedAthletes.length === 0) {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAthletes[0]);
  } catch (error) {
    console.error('Error updating athlete:', error);
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 });
  }
}
