import React from "react";
import { Bell, Search, User } from "lucide-react";
import Button from "../ui/Button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-[#1E2841] border-b border-gray-700 py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-300">{subtitle}</p>}
      </div>

      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300">
            <User className="h-5 w-5" />
          </div>
          <span className="ml-2 text-sm font-medium text-gray-300 hidden md:block">
            Administrador
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
