import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { urlForImage } from '../../lib/sanity';

interface SocialLink {
  _key: string;
  platform: 'github' | 'linkedin' | 'twitter';
  url: string;
}

interface TeamMember {
  _key: string;
  name: string;
  role: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  bio?: string;
  socialLinks?: SocialLink[];
}

export interface TeamGridProps {
  title?: string;
  description?: string;
  members: TeamMember[];
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function TeamGrid({
  title = 'Our Team',
  description = 'Meet the amazing people behind our success',
  members,
}: TeamGridProps) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {members.map((member) => (
            <li key={member._key}>
              <img
                className="aspect-3/2 w-full rounded-2xl object-cover"
                src={urlForImage(member.image).width(800).url()}
                alt={member.name}
              />
              <h3 className="mt-6 text-lg leading-8 font-semibold text-gray-900">{member.name}</h3>
              <p className="text-base leading-7 text-gray-600">{member.role}</p>
              {member.bio && <p className="mt-4 text-sm leading-6 text-gray-600">{member.bio}</p>}
              {member.socialLinks && member.socialLinks.length > 0 && (
                <ul role="list" className="mt-6 flex gap-x-6">
                  {member.socialLinks.map((link) => {
                    const Icon = socialIcons[link.platform];
                    return (
                      <li key={link._key}>
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-gray-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
