import React, { useEffect, useRef } from 'react';

interface CodePenEmbedProps {
  user: string;
  slugHash: string;
  title: string;
  height?: string;
  themeId?: string;
  defaultTab?: string;
}

const CodePenEmbed: React.FC<CodePenEmbedProps> = ({
  user,
  slugHash,
  title,
  height = '482',
  themeId = 'dark',
  defaultTab = 'html,result',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
      ref.current?.appendChild(script);
    }
  }, []);

  return (
    <p
      ref={ref}
      className='codepen'
      data-height={height}
      data-theme-id={themeId}
      data-default-tab={defaultTab}
      data-user={user}
      data-slug-hash={slugHash}
    >
      See the Pen
      <a href={`https://codepen.io/${user}/pen/${slugHash}`}>{title}</a> by{' '}
      {user} (<a href={`https://codepen.io/${user}`}>@{user}</a>) on
      <a href='https://codepen.io'>CodePen</a>.
    </p>
  );
};

export default CodePenEmbed;
