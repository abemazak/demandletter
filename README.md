# Advanced Demand Letter Generator

A professional tool for creating persuasive and data-driven demand letters for personal injury and other legal claims.

## Features

- Generate comprehensive demand letters with strategic content
- Calculate suggested demand amounts based on case parameters
- Incorporate visual elements like timelines and damage breakdowns
- Leverage historical settlement data for accurate valuations
- Tailor content based on jurisdiction and insurance company
- Choose from different liability arguments and negotiation tones
- Address pre-existing conditions and counter-arguments proactively

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/demand-letter-generator.git
cd demand-letter-generator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Using the Generator

1. **Complete the Form**:
   - Fill in client and case information
   - Select case type and jurisdiction
   - Describe injuries and treatment
   - Enter damages information
   - Optionally enable visual elements

2. **Calculate Suggested Demand**:
   - After entering medical expenses, click "Calculate" to get a suggested demand amount
   - The calculation uses similar case data and appropriate multipliers
   - You can adjust the suggested amount if needed

3. **Generate the Letter**:
   - Click "Generate Demand Letter" to create your professional demand
   - Review the letter for accuracy
   - Copy, download, or print the finalized letter

## Customization

### Adding More Templates

You can add more letter templates by updating the `letterTemplates.ts` file:

```typescript
// src/data/letterTemplates.ts
export const letterTemplates = {
  // Add new templates here
};
```

### Adding Settlement Data

To expand the settlement database, update the `settlementData.ts` file:

```typescript
// src/data/settlementData.ts
export const settlementData = [
  // Add more settlement case data here
];
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Legal professionals who provided input on demand letter structure
- Contributors to sample settlement data
- Open source community for React and Next.js 