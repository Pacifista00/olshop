export default function SubHeading2({ children, className = "" }) {
  return (
    <h2 className={`text-sm lg:text-lg font-semibold mb-1 ${className}`}>
      {children}
    </h2>
  );
}
