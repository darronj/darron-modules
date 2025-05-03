import { ArrowLeft, Calendar, Github, Package, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { components } from '../components/manifest';

export default function ComponentDetail() {
  const { componentId } = useParams<{ componentId: string }>();
  const component = componentId ? components[componentId] : null;

  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Component not found</h1>
        </div>
      </div>
    );
  }

  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const componentGithubUrl = `${githubUrl}/tree/main/examples/components/${component.name}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Components
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
          <p className="mt-2 text-gray-600">{component.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <img
              src={component.thumbnail}
              alt={`${component.name} preview`}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <div className="mt-auto pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Credits</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{component.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(component.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <a
                  href={componentGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mt-2"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Installation</h2>
              <p className="text-gray-600 mb-4">Add this component to your project using the Alloy CLI:</p>
              <div className="bg-gray-900 rounded-md p-4">
                <code className="text-sm text-gray-100 font-mono">alloy add {component.name}</code>
              </div>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dependencies</h2>
              <div className="space-y-4">
                {Object.entries(component.dependencies).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">NPM Packages</h3>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(component.dependencies).map(([name, version]) => (
                        <li key={name} className="text-sm text-gray-600 font-mono">
                          {name}@{version}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Variants</h2>
              <ul className="space-y-2">
                {component.variants.map((variant) => (
                  <li key={variant} className="flex items-center gap-2 text-gray-600">
                    <Package className="h-4 w-4 text-gray-400" />
                    {variant}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
