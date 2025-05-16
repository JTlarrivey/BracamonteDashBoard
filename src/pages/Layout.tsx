import React, { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-[#1E2841]">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1E2841] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
