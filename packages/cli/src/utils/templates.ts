import Handlebars from 'handlebars';

export async function renderTemplate(template: string, context: Record<string, any>): Promise<string> {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(context);
}

// Register helpers
Handlebars.registerHelper('lowercase', (str) => {
  return str ? str.toLowerCase() : '';
});

Handlebars.registerHelper('uppercase', (str) => {
  return str ? str.toUpperCase() : '';
});

Handlebars.registerHelper('camelcase', (str) => {
  return str ? str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) : '';
});

Handlebars.registerHelper('pascalcase', (str) => {
  if (!str) return '';
  const camelCase = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
});

Handlebars.registerHelper('kebabcase', (str) => {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
});

Handlebars.registerHelper('join', (arr, separator) => {
  return Array.isArray(arr) ? arr.join(separator) : '';
});

Handlebars.registerHelper('if_eq', function (this: any, a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('if_not_eq', function (this: any, a, b, options) {
  return a !== b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('if_includes', function (this: any, arr, value, options) {
  return Array.isArray(arr) && arr.includes(value) ? options.fn(this) : options.inverse(this);
});
