import React from "react";

export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <table className={`w-full border-collapse border border-gray-300 ${className}`}>{children}</table>;
};

export const Thead = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <thead className={`bg-gray-200 ${className}`}>{children}</thead>;
};

export const Tbody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const Tr = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <tr className={`border-b border-gray-300 ${className}`}>{children}</tr>;
};

export const Th = ({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) => {
  return <th className={`p-2 text-left ${className}`} colSpan={colSpan}>{children}</th>;
};

export const Td = ({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) => {
  return <td className={`p-2 border border-gray-300 ${className}`} colSpan={colSpan}>{children}</td>;
};
