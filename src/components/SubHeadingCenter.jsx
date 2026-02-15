export default function SubHeadingCenter({ children, className = "" }) {
  return (
    <h2
      className={`text-md lg:text-xl font-bold text-center mb-3 ${className}`}
    >
      {children}
    </h2>
  );
}
