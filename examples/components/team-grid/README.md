# Team Grid Component

A responsive grid component for displaying team members with their photos, roles, and social links.

## Overview

This team grid component provides an elegant way to showcase your team members. It supports various layouts and includes features for displaying team member information, social media links, and hover effects.

## Features

- Responsive grid layout
- Multiple grid size options
- Social media integration
- Hover effects and animations
- Customizable card design
- Support for team member roles and descriptions
- Accessible design

## Variants

- **Default**: Standard grid with equal-sized cards
- **Featured**: One team member highlighted in larger card
- **Compact**: Smaller cards with minimal information
- **Detailed**: Larger cards with more information and social links

## Installation

```bash
alloy add team-grid
```

## Usage

```tsx
import { TeamGrid } from '@alloy/components/team-grid';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO',
      image: '/images/team/john.jpg',
      description: 'Founder and visionary leader',
      social: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
      }
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: '/images/team/jane.jpg',
      description: 'Technical lead and architect',
      social: {
        twitter: 'https://twitter.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith'
      }
    }
  ];

  return <TeamGrid members={teamMembers} variant="default" />;
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| members | TeamMember[] | Yes | Array of team members |
| variant | 'default' \| 'featured' \| 'compact' \| 'detailed' | No | Component variant |
| columns | number | No | Number of columns in grid (default: 3) |
| className | string | No | Additional CSS classes |

## TeamMember Type

```typescript
interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    [key: string]: string | undefined;
  };
}
```

## Dependencies

- @alloy/core
- react
- react-dom
- tailwindcss
- lucide-react

## Author

Alex Rodriguez

## License

MIT 