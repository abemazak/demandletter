interface TimelineEvent {
  date: string;
  event: string;
  details?: string;
}

interface InjurySeverityScale {
  level: number; // 1-10
  description: string;
  color: string;
}

/**
 * Generates HTML for a timeline visualization
 */
export function generateTimelineHtml(events: TimelineEvent[]): string {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let timelineHtml = `
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">CASE TIMELINE</h3>
      <div style="position: relative; padding-left: 30px;">
  `;
  
  sortedEvents.forEach((event, index) => {
    timelineHtml += `
      <div style="margin-bottom: 20px; position: relative;">
        <div style="position: absolute; left: -30px; width: 20px; height: 20px; background-color: #3498db; border-radius: 50%; top: 0;"></div>
        ${index < sortedEvents.length - 1 ? `<div style="position: absolute; left: -20px; top: 20px; bottom: 0; width: 2px; background-color: #3498db;"></div>` : ''}
        <div style="font-weight: bold;">${event.date}</div>
        <div style="font-weight: bold; margin: 5px 0;">${event.event}</div>
        ${event.details ? `<div style="font-size: 0.9em; color: #555;">${event.details}</div>` : ''}
      </div>
    `;
  });
  
  timelineHtml += `
      </div>
    </div>
  `;
  
  return timelineHtml;
}

/**
 * Generates HTML for an injury severity scale visualization
 */
export function generateInjurySeverityHtml(injuries: InjurySeverityScale[]): string {
  let severityHtml = `
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">INJURY SEVERITY ASSESSMENT</h3>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
  `;
  
  // Generate the scale
  for (let i = 1; i <= 10; i++) {
    const matchingInjury = injuries.find(injury => injury.level === i);
    const color = matchingInjury ? matchingInjury.color : '#e0e0e0';
    const highlight = matchingInjury ? `border: 2px solid #333;` : '';
    
    severityHtml += `
      <div style="flex: 1; text-align: center; position: relative;">
        <div style="height: 20px; background-color: ${color}; margin: 0 1px; ${highlight}"></div>
        <div style="position: absolute; top: 25px; left: 50%; transform: translateX(-50%); font-size: 12px;">${i}</div>
      </div>
    `;
  }
  
  severityHtml += `</div>`;
  
  // Add injury descriptions
  injuries.forEach(injury => {
    severityHtml += `
      <div style="margin-top: 10px; display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: ${injury.color}; margin-right: 10px;"></div>
        <div><strong>Level ${injury.level}:</strong> ${injury.description}</div>
      </div>
    `;
  });
  
  severityHtml += `</div>`;
  
  return severityHtml;
}

/**
 * Generates HTML for a damages breakdown chart
 */
export function generateDamagesChartHtml(medicalExpenses: number, lostWages: number, painSuffering: number): string {
  const total = medicalExpenses + lostWages + painSuffering;
  const medicalPercent = (medicalExpenses / total * 100).toFixed(1);
  const wagesPercent = (lostWages / total * 100).toFixed(1);
  const painPercent = (painSuffering / total * 100).toFixed(1);
  
  const chartHtml = `
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">DAMAGES BREAKDOWN</h3>
      <div style="display: flex; height: 30px; margin-bottom: 15px; overflow: hidden; border-radius: 4px;">
        <div style="background-color: #3498db; width: ${medicalPercent}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Medical</div>
        <div style="background-color: #2ecc71; width: ${wagesPercent}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Lost Wages</div>
        <div style="background-color: #e74c3c; width: ${painPercent}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Pain & Suffering</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Medical Expenses:</strong> $${medicalExpenses.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${medicalPercent}%</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Lost Wages:</strong> $${lostWages.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${wagesPercent}%</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Pain & Suffering:</strong> $${painSuffering.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${painPercent}%</div>
      </div>
      <div style="display: flex; margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px;">
        <div style="flex: 1;"><strong>TOTAL DAMAGES:</strong> $${total.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">100%</div>
      </div>
    </div>
  `;
  
  return chartHtml;
}

/**
 * Generates HTML for comparable settlements reference
 */
export function generateComparableSettlementsHtml(settlements: any[]): string {
  let comparablesHtml = `
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">COMPARABLE SETTLEMENTS</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Case Type</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Injury</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Medical Expenses</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Settlement</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Multiplier</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  settlements.forEach(settlement => {
    const multiplier = (settlement.totalSettlement / settlement.medicalExpenses).toFixed(2);
    
    comparablesHtml += `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${settlement.caseType.replace('_', ' ')}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${settlement.injuryType.replace('_', ' ')}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${settlement.medicalExpenses.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${settlement.totalSettlement.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${multiplier}x</td>
      </tr>
    `;
  });
  
  comparablesHtml += `
        </tbody>
      </table>
    </div>
  `;
  
  return comparablesHtml;
}

/**
 * Generates text for document list with descriptions
 */
export function generateDocumentList(documents: {title: string, description: string}[]): string {
  let docListText = `
SUPPORTING DOCUMENTATION

The following documents are enclosed with this demand letter to substantiate our claims:

`;
  
  documents.forEach((doc, index) => {
    docListText += `${index + 1}. ${doc.title} - ${doc.description}\n`;
  });
  
  return docListText;
}

/**
 * Formats a case quote for inclusion in demand letter
 */
export function formatCaseQuote(caseName: string, citation: string, quote: string): string {
  return `
"${quote}"
- ${caseName}, ${citation}
`;
} 