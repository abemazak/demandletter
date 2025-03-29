// Import from original settlementData temporarily
import { settlementData as originalSettlementData } from '../settlementData';

// Export the original settlement data
export const settlementData = originalSettlementData;

// In the future, this will be replaced with individual imports:
// import { negotiationStrategies } from './negotiationStrategies';
// import { settlementRanges } from './settlementRanges';
// etc.

export default settlementData; 