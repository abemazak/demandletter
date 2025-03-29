// Temporarily re-export the original letterTemplates from the parent directory
// This will be replaced with individual imports once all template files are created
import { letterTemplates as originalTemplates } from '../letterTemplates';

// For now, just re-export the original templates
export const letterTemplates = originalTemplates;

// In the future, this file will import all individual templates and combine them
// Example:
// import { personalInjuryTemplate } from './personalInjury';
// import { productLiabilityTemplate } from './productLiability';

// Export the templates we've already created
export { personalInjuryTemplate } from './personalInjury';
export { productLiabilityTemplate } from './productLiability';

export default letterTemplates; 