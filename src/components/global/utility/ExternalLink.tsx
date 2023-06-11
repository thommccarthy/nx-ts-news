import React from 'react';
import { HiExternalLink } from 'react-icons/hi';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  className,
  children,
  ariaLabel,
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={`inline-flex items-center ${className}`}
    aria-label={ariaLabel ? ariaLabel : `External link to ${href}`}
  >
    {children}

    <HiExternalLink className='ml-1' aria-hidden='true' />
  </a>
);

export default ExternalLink;
