export default {
  name: 'teamGrid',
  title: 'Team Grid',
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
      name: 'members',
      title: 'Team Members',
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
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 3,
            },
            {
              name: 'socialLinks',
              title: 'Social Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'platform',
                      title: 'Platform',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'GitHub', value: 'github' },
                          { title: 'LinkedIn', value: 'linkedin' },
                          { title: 'Twitter', value: 'twitter' },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'platform',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
