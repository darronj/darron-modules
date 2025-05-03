import { ArrowLeft, Calendar, Github, Package, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { components } from '../components/manifest';

export default function ComponentDetail() {
  const { componentId } = useParams<{ componentId: string }>();
  const component = componentId ? components[componentId] : null;

  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">Component not found</h1>
        </div>
      </div>
    );
  }

  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const componentGithubUrl = `${githubUrl}/tree/main/examples/components/${component.name}`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Components
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
          <p className="mt-2 text-gray-600">{component.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Preview</h2>
            <img
              src={component.thumbnail}
              alt={`${component.name} preview`}
              className="mb-4 h-64 w-full rounded-md object-cover"
            />
            <div className="mt-auto border-t border-gray-100 pt-4">
              <h3 className="mb-3 text-sm font-medium text-gray-900">Credits</h3>
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
                  className="text-primary-600 hover:text-primary-700 mt-2 flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Installation</h2>
              <p className="mb-4 text-gray-600">Add this component to your project using the Alloy CLI:</p>
              <div className="rounded-md bg-gray-900 p-4">
                <code className="font-mono text-sm text-gray-100">alloy add {component.name}</code>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Dependencies</h2>
              <div className="space-y-4">
                {Object.entries(component.dependencies).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">NPM Packages</h3>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(component.dependencies).map(([name, version]) => (
                        <li key={name} className="font-mono text-sm text-gray-600">
                          {name}@{version}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Available Variants</h2>
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
