import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const letters = await prisma.handyLaw.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      letters 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve letters' 
    }, { status: 500 });
  }
} 