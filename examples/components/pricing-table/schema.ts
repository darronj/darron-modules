export default {
  name: 'pricingTable',
  title: 'Pricing Table',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'interval',
              title: 'Billing Interval',
              type: 'string',
              options: {
                list: [
                  { title: 'Monthly', value: 'monthly' },
                  { title: 'Yearly', value: 'yearly' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Feature Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'included',
                      title: 'Is Included',
                      type: 'boolean',
                      initialValue: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'ctaLabel',
              title: 'CTA Button Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'ctaUrl',
              title: 'CTA Button URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highlighted',
              title: 'Highlight This Tier',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
