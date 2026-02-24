
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 z-40 bg-black/80 lg:hidden transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0B0B0B] transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:block border-r border-white/5",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search students..." 
                className="pl-10 pr-4 py-2 w-64 bg-[#1A1A1A] border border-white/5 rounded-full text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF6A00] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6A00] rounded-full shadow-[0_0_8px_#FF6A00]" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300 hidden sm:block">Ratwinit Bangkaeo School</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(255,106,0,0.3)]">
                RW
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0B0B0B] relative">
          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            <Outlet />
          </div>
          
          {/* Background Glow Effects */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6A00]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/5 rounded-full blur-[120px] pointer-events-none" />
        </main>
      </div>
    </div>
  );
}
