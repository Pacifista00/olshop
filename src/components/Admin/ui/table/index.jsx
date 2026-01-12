import React from "react";

/**
 * Table Component
 */
const Table = ({ children, className = "" }) => {
  return (
    <table className={`min-w-full border-collapse ${className}`}>
      {children}
    </table>
  );
};

/**
 * Table Header
 */
const TableHeader = ({ children, className = "" }) => {
  return <thead className={className}>{children}</thead>;
};

/**
 * Table Body
 */
const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

/**
 * Table Row
 */
const TableRow = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

/**
 * Table Cell (th / td)
 */
const TableCell = ({ children, isHeader = false, className = "" }) => {
  const CellTag = isHeader ? "th" : "td";

  return (
    <CellTag className={`px-4 py-2 text-left align-middle ${className}`}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
