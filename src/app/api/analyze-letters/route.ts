import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use type assertion to work around the TypeScript error
    const successfulLetters = await (prisma as any).HistoricalLetter.findMany({
      where: {
        settlementAmount: {
          not: null
        }
      },
      orderBy: {
        settlementAmount: 'desc'
      },
      take: 10
    });

    // Analyze patterns in successful letters
    return NextResponse.json({ 
      success: true, 
      data: successfulLetters 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to analyze letters' 
    }, { status: 500 });
  }
} 