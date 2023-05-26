import React from 'react';
import { HiExternalLink } from 'react-icons/hi';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  className,
  children,
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={`inline-flex items-center ${className}`}
  >
    {children}

    <HiExternalLink className='ml-1' />
  </a>
);

export default ExternalLink;
