import React from "react";
import {
  Home,
  Building,
  LayoutDashboard,
  PlusCircle,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";
import { NavLink } from "../ui/NavLink";
import logo from "../../assets/logo.png";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#1E2841] border-r border-gray-700 h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Bracamonte Propiedades" className="h-8 w-auto" />
          <h1 className="text-xl font-bold text-gray-300">
            Bracamonte Propiedades
          </h1>
        </div>
      </div>

      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" icon={<LayoutDashboard size={18} />}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/properties" icon={<Home size={18} />}>
              Propiedades
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-property" icon={<PlusCircle size={18} />}>
              Agregar Propiedad
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" icon={<DollarSign size={18} />}>
              Analíticas
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto p-4 border-t border-gray-700">
        <ul className="space-y-1">
          <li>
            <NavLink to="/settings" icon={<Settings size={18} />}>
              Configuraciones
            </NavLink>
          </li>
          <li>
            <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <LogOut size={18} className="mr-2 text-gray-400" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
