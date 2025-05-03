import React from 'react';
import { Check } from 'lucide-react';

interface Feature {
  _key: string;
  name: string;
  included: boolean;
}

interface PricingTier {
  _key: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  description: string;
  features: Feature[];
  ctaLabel: string;
  ctaUrl: string;
  highlighted?: boolean;
}

export interface PricingTableProps {
  title?: string;
  description?: string;
  tiers: PricingTier[];
}

export default function PricingTable({
  title = 'Pricing Plans',
  description = 'Choose the perfect plan for your needs',
  tiers,
}: PricingTableProps) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier._key}
              className={`flex flex-col justify-between rounded-3xl px-8 py-10 ring-1 ring-gray-200 xl:p-10 ${
                tier.highlighted ? 'bg-gray-900 lg:z-10 lg:rounded-b-none' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={`text-lg font-semibold leading-8 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}
                  >
                    ${tier.price}
                  </span>
                  <span
                    className={`text-sm font-semibold leading-6 ${
                      tier.highlighted ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    /{tier.interval}
                  </span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature._key}
                      className={`flex gap-x-3 ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {feature.included && (
                        <Check className={`h-6 w-5 flex-none ${tier.highlighted ? 'text-white' : 'text-indigo-600'}`} />
                      )}
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.ctaUrl}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                }`}
              >
                {tier.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
