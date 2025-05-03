# Hero Section Component

A modern, responsive hero section component for landing pages and marketing websites.

## Overview

This hero section component provides a visually appealing introduction to your website or product. It features a clean design with a prominent headline, supporting text, and a call-to-action button.

## Features

- Responsive design that works on all screen sizes
- Customizable background colors and gradients
- Support for both image and video backgrounds
- Multiple layout variants
- Built-in animation support
- Accessible design following WCAG guidelines

## Variants

- **Default**: Standard hero with centered content
- **Split**: Content split with image/video
- **Overlay**: Text overlay on full-width media
- **Minimal**: Simplified design with focus on typography

## Installation

```bash
alloy add hero-section
```

## Usage

```tsx
import { HeroSection } from '@alloy/components/hero-section';

export default function HomePage() {
  return (
    <HeroSection
      title="Welcome to Our Platform"
      description="Discover amazing features and start building today."
      ctaText="Get Started"
      ctaHref="/signup"
      variant="default"
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Main headline text |
| description | string | No | Supporting text below the headline |
| ctaText | string | No | Call-to-action button text |
| ctaHref | string | No | Call-to-action button link |
| variant | 'default' \| 'split' \| 'overlay' \| 'minimal' | No | Component variant |
| backgroundImage | string | No | URL for background image |
| backgroundVideo | string | No | URL for background video |
| overlayColor | string | No | Color for text overlay (hex or rgba) |
| className | string | No | Additional CSS classes |

## Dependencies

- @alloy/core
- react
- react-dom
- tailwindcss
- lucide-react

## Author

Sarah Johnson

## License

MIT 