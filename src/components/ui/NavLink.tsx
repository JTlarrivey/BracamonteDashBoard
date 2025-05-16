import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  icon,
  className = "",
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses =
    "flex items-center px-4 py-2 text-sm rounded-md transition-colors";
  const activeClasses = "bg-blue-900 text-white font-medium";
  const inactiveClasses = "text-gray-300 hover:bg-gray-800";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      } ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};
