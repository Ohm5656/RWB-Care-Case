import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Brain,
  TrendingUp,
  Bell,
  Settings,
  Shield,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Students', nameThai: 'นักเรียน', href: '/students', icon: Users },
  { name: 'AI Analysis', nameThai: 'วิเคราะห์ AI', href: '/ai-analysis', icon: Brain },
  { name: 'Analytics', nameThai: 'สถิติ', href: '/analytics', icon: TrendingUp },
  { name: 'Alerts', nameThai: 'แจ้งเตือน', href: '/alerts', icon: Bell },
  { name: 'Interventions', nameThai: 'แผนช่วยเหลือ', href: '/interventions', icon: Shield },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-[#0B0B0B] border-r border-white/5 flex flex-col z-50
        transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm sm:text-base">RWB Care Class</h1>
              <p className="text-xs text-gray-400">Ratwinit Bangkaeo</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
          
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] text-white shadow-lg shadow-orange-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <div className="flex-1">
                  <span className="font-medium block">{item.name}</span>
                  {'nameThai' in item && (
                    <span className="text-xs opacity-75">{item.nameThai}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              KT
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">ครูกัญญา</p>
              <p className="text-xs text-gray-400">หัวหน้าระดับชั้น</p>
            </div>
            <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors flex-shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}