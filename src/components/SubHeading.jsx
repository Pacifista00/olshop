export default function SubHeading({ children, className = "" }) {
  return (
    <h2 className={`text-md lg:text-xl font-bold mb-3 ${className}`}>
      {children}
    </h2>
  );
}
