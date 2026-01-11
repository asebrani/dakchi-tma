import { ReactNode, useState } from "react";
import AppSidebar from "./AppSidebar";
import TopHeader from "./TopHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <AppSidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileOpenChange={setMobileMenuOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
