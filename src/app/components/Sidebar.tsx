
import { NavLink } from "react-router";
import { LayoutDashboard, Users, AlertTriangle, FileText, PieChart, Bell, Settings, LogOut } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: AlertTriangle, label: "Risk Analysis", path: "/risk-analysis" },
  { icon: FileText, label: "Interventions", path: "/interventions" },
  { icon: PieChart, label: "Analytics", path: "/analytics" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B0B0B] border-r border-white/5 flex flex-col z-50">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center shadow-[0_0_15px_rgba(255,106,0,0.3)]">
            <AlertTriangle className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">RWB Early Warning</h1>
            <p className="text-xs text-gray-400">Ratwinit Bangkaeo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "bg-[#FF6A00]/10 text-[#FF6A00] shadow-[0_0_20px_rgba(255,106,0,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={clsx(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-[#FF6A00]" : "text-gray-400 group-hover:text-white"
                  )}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF6A00] rounded-l-full shadow-[0_0_10px_#FF6A00]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Teacher+Admin&background=random" alt="User" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Kru Somsak</p>
              <p className="text-xs text-gray-400">Admin Teacher</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 mx-auto" />
            </button>
            <button className="flex-1 p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
