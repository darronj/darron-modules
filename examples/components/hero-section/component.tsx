import React from 'react';
import { urlForImage } from '../../lib/sanity';

interface Button {
  _key: string;
  label: string;
  url: string;
  isPrimary: boolean;
}

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  buttons?: Button[];
}

export default function HeroSection({ title, subtitle, backgroundImage, buttons = [] }: HeroSectionProps) {
  const backgroundImageUrl = backgroundImage ? urlForImage(backgroundImage).width(2000).url() : undefined;

  return (
    <section className="relative bg-gray-900 text-white">
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7,
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>

        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-xl">{subtitle}</p>}

        {buttons.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {buttons.map((button) => (
              <a
                key={button._key}
                href={button.url}
                className={`rounded-md px-6 py-3 text-base font-medium shadow ${
                  button.isPrimary
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
