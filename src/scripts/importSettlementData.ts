import { prisma } from '../lib/prisma';
import { settlementData } from '../data/settlementData';

async function importData() {
  for (const data of settlementData) {
    await prisma.settlementData.create({
      data: {
        caseType: data.caseType,
        injuryType: data.injuryType,
        medicalBills: data.medicalBills,
        settlementAmount: data.settlementAmount,
        jurisdiction: data.jurisdiction || null,
        description: data.description || null
      }
    });
  }
  console.log('Data imported successfully');
}

importData()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect()); 