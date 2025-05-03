import React from 'react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  const routes = [
    {
      path: '/',
      label: 'Home',
      description: 'Landing page with hero section, pricing table, and team grid',
    },
    {
      path: '/components',
      label: 'Components',
      children: [
        {
          path: '/components/hero-section',
          label: 'Hero Section',
          apiRoute: '/api/components/hero-section',
          variants: ['simple', 'with-image', 'video-background'],
        },
        {
          path: '/components/pricing-table',
          label: 'Pricing Table',
          apiRoute: '/api/components/pricing-table',
          variants: ['simple', 'with-toggle', 'comparison'],
        },
        {
          path: '/components/team-grid',
          label: 'Team Grid',
          apiRoute: '/api/components/team-grid',
          variants: ['grid', 'list', 'carousel'],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          {routes.map((route) => (
            <div key={route.path} className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                <Link to={route.path} className="hover:text-primary-600">
                  {route.label}
                </Link>
              </h2>
              <p className="text-gray-600 mt-1">{route.description}</p>

              {route.children && (
                <div className="mt-4 space-y-4">
                  {route.children.map((child) => (
                    <div key={child.path} className="pl-4 border-l-2 border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link to={child.path} className="hover:text-primary-600">
                          {child.label}
                        </Link>
                      </h3>

                      {child.apiRoute && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 font-medium">API Endpoints:</p>
                          <div className="mt-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500">GET</span>
                              <code className="bg-gray-100 px-2 py-1 rounded-sm text-sm font-mono">
                                {child.apiRoute}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500">GET</span>
                              <code className="bg-gray-100 px-2 py-1 rounded-sm text-sm font-mono">
                                {child.apiRoute}/files
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      {child.variants && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-600">Variants:</p>
                          <ul className="mt-2 space-y-2">
                            {child.variants.map((variant) => (
                              <li key={variant} className="flex flex-col gap-1">
                                <span className="text-sm text-gray-600">{variant}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-gray-500">GET</span>
                                  <code className="bg-gray-100 px-2 py-1 rounded-sm text-sm font-mono">
                                    {child.apiRoute}/variants/{variant}
                                  </code>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
