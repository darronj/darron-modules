# Pricing Table Component

A flexible and customizable pricing table component for showcasing product plans and pricing tiers.

## Overview

This pricing table component allows you to display multiple pricing tiers with features, pricing, and call-to-action buttons. It's designed to be highly customizable while maintaining a clean and professional appearance.

## Features

- Responsive grid layout
- Multiple pricing tiers
- Feature comparison
- Customizable styling
- Built-in currency formatting
- Support for different billing periods
- Highlight recommended plan
- Accessible design

## Variants

- **Default**: Standard pricing table with equal-width columns
- **Highlighted**: One plan highlighted as recommended
- **Simple**: Minimal design with focus on pricing
- **Detailed**: Expanded view with feature comparison

## Installation

```bash
alloy add pricing-table
```

## Usage

```tsx
import { PricingTable } from '@alloy/components/pricing-table';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      ctaText: 'Get Started',
      ctaHref: '/signup/basic'
    },
    {
      name: 'Pro',
      price: 19.99,
      period: 'month',
      features: ['All Basic features', 'Feature 4', 'Feature 5'],
      ctaText: 'Get Started',
      ctaHref: '/signup/pro',
      recommended: true
    }
  ];

  return <PricingTable plans={plans} variant="highlighted" />;
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| plans | PricingPlan[] | Yes | Array of pricing plans |
| variant | 'default' \| 'highlighted' \| 'simple' \| 'detailed' | No | Component variant |
| currency | string | No | Currency symbol (default: '$') |
| className | string | No | Additional CSS classes |

## PricingPlan Type

```typescript
interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  recommended?: boolean;
}
```

## Dependencies

- @alloy/core
- react
- react-dom
- tailwindcss
- lucide-react

## Author

Michael Chen

## License

MIT 