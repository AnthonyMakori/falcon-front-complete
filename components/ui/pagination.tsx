import React from "react";

interface PaginationProps {
  children: React.ReactNode;
}

export function Pagination({ children }: PaginationProps) {
  return <nav className="flex items-center space-x-1">{children}</nav>;
}

interface PaginationContentProps {
  children: React.ReactNode;
}

export function PaginationContent({ children }: PaginationContentProps) {
  return <div className="flex space-x-1">{children}</div>;
}

interface PaginationItemProps {
  children: React.ReactNode;
}

export function PaginationItem({ children }: PaginationItemProps) {
  return <div className="px-2 py-1 border rounded-md">{children}</div>;
}

interface PaginationLinkProps {
  href: string;
  children: React.ReactNode;
}

export function PaginationLink({ href, children }: PaginationLinkProps) {
  return (
    <a href={href} className="px-3 py-1 text-blue-500 hover:underline">
      {children}
    </a>
  );
}
