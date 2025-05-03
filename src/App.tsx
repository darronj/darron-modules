import { ArrowRight, Package, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sitemap from './Sitemap';
import { components } from './components/manifest';
import ComponentDetail from './pages/ComponentDetail';

function ComponentsTable() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert the components object into an array
  const componentList = Object.entries(components).map(([name, data]) => ({
    ...data,
    name,
  }));

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Error loading components</h1>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alloy Page Builder Modules</h1>
            <p className="mt-2 text-gray-600">Browse our collection of reusable modules and their dependencies</p>
          </div>
          <Link to="/sitemap" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
            View Sitemap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white shadow-xs ring-1 ring-gray-900/5 rounded-lg px-6 py-4 mb-8">
          <div className="flex items-start gap-4">
            <Terminal className="h-6 w-6 text-primary-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-base font-semibold text-gray-900">Getting Started</h2>
              <p className="mt-1 text-sm text-gray-500">Initialize Alloy in your project:</p>
              <div className="mt-2 bg-gray-900 rounded-md p-4">
                <code className="text-sm text-gray-100 font-mono">
                  npm install -g @intermark/alloy-cli && alloy init
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Component
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Preview
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description & Installation
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Dependencies
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Variants
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {componentList.map((component) => (
                      <tr key={component.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <Link
                            to={`/components/${component.name}`}
                            className="flex items-center gap-2 hover:text-primary-600"
                          >
                            <Package className="h-4 w-4 text-gray-400" />
                            {component.name}
                          </Link>
                        </td>
                        <td className="px-3 py-4">
                          <Link to={`/components/${component.name}`}>
                            <img
                              src={component.thumbnail}
                              alt={`${component.name} preview`}
                              className="h-20 w-32 object-cover rounded-md hover:opacity-90 transition-opacity"
                            />
                          </Link>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <p className="mb-2">{component.description}</p>
                          <p>
                            Add to your project:
                            <code className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-mono">
                              alloy add {component.name}
                            </code>
                          </p>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div className="space-y-2">
                            {Object.entries(component.dependencies).length > 0 && (
                              <div>
                                <p className="font-medium text-gray-900">NPM:</p>
                                <ul className="mt-1 space-y-1">
                                  {Object.entries(component.dependencies).map(([name, version]) => (
                                    <li key={name} className="font-mono text-xs">
                                      {name}@{version}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {component.variants.length > 0 ? (
                            <ul className="space-y-1">
                              {component.variants.map((variant) => (
                                <li key={variant} className="text-xs">
                                  {variant}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-xs text-gray-400">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentsTable />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/components/:componentId" element={<ComponentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
