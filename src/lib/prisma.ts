import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Check if Prisma is disabled by checking if the schema file has comments
let isPrismaDisabled = false;
try {
  // This is a simple way to check if Prisma is disabled
  // We'll just assume it's disabled for now since we manually commented out the schema
  isPrismaDisabled = true;
} catch (error) {
  console.warn('Error checking Prisma status:', error);
}

// Create a mock client if Prisma is disabled
const createMockPrismaClient = () => {
  return {
    handyLaw: {
      create: async (data: any) => {
        console.log('Mock Prisma: Creating HandyLaw entry', data);
        
        // Extract pre-existing condition fields
        const {
          preExistingConditions = '',
          preExistingType = '',
          preExistingDocumentation = '',
          hasUploadedDocuments = false,
          ...otherData
        } = data.data;
        
        return {
          id: Math.floor(Math.random() * 1000),
          ...otherData,
          preExistingConditions,
          preExistingType,
          preExistingDocumentation,
          hasUploadedDocuments,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      },
      findMany: async () => {
        console.log('Mock Prisma: Finding HandyLaw entries');
        return [];
      }
    },
    settlementData: {
      create: async (data: any) => {
        console.log('Mock Prisma: Creating SettlementData entry', data);
        return {
          id: Math.floor(Math.random() * 1000),
          ...data.data
        };
      },
      findMany: async () => {
        console.log('Mock Prisma: Finding SettlementData entries');
        return [];
      }
    },
    HistoricalLetter: {
      create: async (data: any) => {
        console.log('Mock Prisma: Creating HistoricalLetter entry', data);
        return {
          id: Math.floor(Math.random() * 1000).toString(),
          ...data.data,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      },
      findMany: async () => {
        console.log('Mock Prisma: Finding HistoricalLetter entries');
        return [];
      }
    },
    // Add a disconnect method to avoid errors
    $disconnect: async () => {
      console.log('Mock Prisma: Disconnecting');
    },
    // Add a function to cleanup uploads
    cleanup: async () => {
      console.log('Mock Prisma: Cleanup function called');
      return true;
    }
  } as unknown as PrismaClient;
};

export const prisma = isPrismaDisabled 
  ? (createMockPrismaClient() as unknown as PrismaClient)
  : (global.prisma || new PrismaClient());

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma as unknown as PrismaClient;
} 