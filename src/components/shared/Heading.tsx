interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ children, className }: HeadingProps) {
  return <h1 className={`text-2xl my-10 ${className}`}>{children}</h1>;
}
