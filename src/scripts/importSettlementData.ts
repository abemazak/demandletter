import { prisma } from '../lib/prisma';
import { settlementData } from '../data/settlementData';

async function importData() {
  for (const data of settlementData) {
    await prisma.settlementData.create({
      data: {
        caseType: data.caseType,
        injuryType: data.injuryType,
        medicalBills: data.medicalExpenses,
        settlementAmount: data.totalSettlement,
        jurisdiction: data.jurisdiction || null,
        description: data.keyFactors.join(', ') || null
      }
    });
  }
  console.log('Data imported successfully');
}

importData()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect()); 