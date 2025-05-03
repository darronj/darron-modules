import React from 'react';
import { HeroSection } from '../hero-section';
import { TextWithImage } from '../text-with-image';
import { TestimonialsList } from '../testimonials-list';
import { CtaSection } from '../cta-section';
import { FeaturesGrid } from '../features-grid';

const componentMap = {
  heroSection: HeroSection,
  textWithImage: TextWithImage,
  testimonialsList: TestimonialsList,
  ctaSection: CtaSection,
  featuresGrid: FeaturesGrid
};

export interface PageBuilderProps {
  content: Array<{
    _type: keyof typeof componentMap;
    [key: string]: any;
  }>;
}

export default function PageBuilder({ content }: PageBuilderProps) {
  return (
    <>
      {content.map((section, index) => {
        const Component = componentMap[section._type];
        
        if (!Component) {
          console.warn(`No component found for section type: ${section._type}`);
          return null;
        }
        
        return <Component key={section._key || index} {...section} />;
      })}
    </>
  );
}