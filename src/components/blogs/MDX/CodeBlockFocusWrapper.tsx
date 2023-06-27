import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface Props {
  children: string;
  language: string;
}

const CodeBlockFocusWrapper: React.FC<Props> = ({ children, language }) => {
  return (
    <Highlight theme={themes.dracula} code={children} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} tabIndex={0}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlockFocusWrapper;
