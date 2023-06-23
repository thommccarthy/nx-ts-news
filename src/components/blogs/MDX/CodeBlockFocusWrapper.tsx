interface Props {
  children: React.ReactNode;
}

const CodeBlockFocusWrapper: React.FC<Props> = ({ children }) => {
  return <div tabIndex={0}>{children}</div>;
};

export default CodeBlockFocusWrapper;
