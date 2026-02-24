import { Link } from 'react-router';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { mockStudents, schoolAnalytics } from '../data/studentData';

export default function Dashboard() {
  const highRiskStudents = mockStudents.filter(s => s.riskLevel === 'high');
  const recentAlerts = mockStudents
    .flatMap(s => s.alerts.map(a => ({ ...a, student: s })))
    .filter(a => !a.read)
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Students',
      value: schoolAnalytics.totalStudents,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12 this month'
    },
    {
      label: 'At Risk',
      value: schoolAnalytics.atRiskStudents,
      icon: AlertTriangle,
      color: 'from-[#FF6A00] to-[#FF8C42]',
      change: '-8 from last week'
    },
    {
      label: 'Critical Alerts',
      value: schoolAnalytics.criticalAlerts,
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
      change: '5 new today'
    },
    {
      label: 'Active Plans',
      value: schoolAnalytics.activeInterventions,
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      change: '12 in progress'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-[#FF6A00]';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500/10 border-red-500/20';
      case 'medium': return 'bg-orange-500/10 border-orange-500/20';
      case 'low': return 'bg-green-500/10 border-green-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-400">ยินดีต้อนรับครูกัญญา นี่คือสิ่งที่เกิดขึ้นวันนี้</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-1">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-semibold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* High Risk Students */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">High Risk Students</h2>
                  <p className="text-xs sm:text-sm text-gray-400">ต้องการความสนใจเร่งด่วน</p>
                </div>
              </div>
              <Link
                to="/students"
                className="text-[#FF6A00] hover:text-[#FF8C42] text-xs sm:text-sm font-medium flex items-center gap-1"
              >
                <span className="hidden sm:inline">ดูทั้งหมด</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {highRiskStudents.map((student) => (
                <Link
                  key={student.id}
                  to={`/student/${student.id}`}
                  className="block p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF6A00]/30 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-red-500/20 flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white group-hover:text-[#FF6A00] transition-colors text-sm sm:text-base truncate">
                          {student.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
                        <span className="text-gray-400">{student.grade}</span>
                        <span className="text-gray-600 hidden sm:inline">•</span>
                        <span className="text-red-400">คะแนนความเสี่ยง: {student.riskScore}</span>
                      </div>
                    </div>
                    <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border ${getRiskBg(student.riskLevel)} flex-shrink-0`}>
                      <span className={`text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                        {student.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {student.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <p className="text-xs sm:text-sm text-gray-400">
                        <span className="text-red-400 font-medium">{student.alerts.length} การแจ้งเตือน:</span>{' '}
                        {student.alerts[0].message}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts & AI Insights */}
        <div className="space-y-4 sm:space-y-6">
          {/* AI Quick Insights */}
          <div className="rounded-2xl bg-gradient-to-br from-[#FF6A00]/10 to-[#FF8C42]/5 backdrop-blur-sm border border-[#FF6A00]/20 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#FF6A00]/20">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF8C42]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white">AI Insights</h3>
                <p className="text-xs text-gray-400">วิเคราะห์ด้วย ML</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">
                  การขาดเรียนวันจันทร์ <span className="text-[#FF6A00] font-medium">สูงกว่า 35%</span> เมื่อเทียบกับวันอังคาร
                </p>
                <Link
                  to="/ai-analysis"
                  className="text-xs text-[#FF6A00] hover:text-[#FF8C42] font-medium"
                >
                  ดูการวิเคราะห์แบบเต็ม →
                </Link>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">
                  <span className="text-[#FF6A00] font-medium">3 คน</span> มีความตั้งใจเรียนดีขึ้นหลังจากได้รับการช่วยเหลือจากเพื่อน
                </p>
                <Link
                  to="/ai-analysis"
                  className="text-xs text-[#FF6A00] hover:text-[#FF8C42] font-medium"
                >
                  ดูคำแนะนำ →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-white">แจ้งเตือนล่าสุด</h3>
              <Link
                to="/alerts"
                className="text-[#FF6A00] text-xs sm:text-sm hover:text-[#FF8C42]"
              >
                ดูทั้งหมด
              </Link>
            </div>
            
            <div className="space-y-2">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      alert.severity === 'high' ? 'bg-red-400' : 
                      alert.severity === 'medium' ? 'bg-[#FF6A00]' : 'bg-green-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-white font-medium mb-1 truncate">
                        {alert.student.name}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-2">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}