import { useParams, Link } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  TrendingDown,
  BookOpen,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockStudents, mockAIInsights } from '../data/studentData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function StudentProfile() {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id);
  const studentInsights = mockAIInsights.filter(i => i.studentId === id);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">ไม่พบข้อมูลนักเรียน</p>
      </div>
    );
  }

  const performanceData = [
    { month: 'ก.ย.', score: 75 },
    { month: 'ต.ค.', score: 72 },
    { month: 'พ.ย.', score: 68 },
    { month: 'ธ.ค.', score: 65 },
    { month: 'ม.ค.', score: 60 },
    { month: 'ก.พ.', score: 58 }
  ];

  const radarData = [
    { subject: 'เข้าเรียน', score: student.attendance },
    { subject: 'ผลการเรียน', score: student.academicScore },
    { subject: 'พฤติกรรม', score: student.behaviorScore },
    { subject: 'ความตั้งใจ', score: student.engagementScore }
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
    <div className="space-y-4 sm:space-y-6">
      {/* Back Button */}
      <Link
        to="/students"
        className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปหน้านักเรียน
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6 w-full md:w-auto">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl text-white font-semibold shadow-xl flex-shrink-0 ${
              student.riskLevel === 'high' ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/30' :
              student.riskLevel === 'medium' ? 'bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] shadow-orange-500/30' :
              'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/30'
            }`}>
              {student.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1 truncate">{student.name}</h1>
              <p className="text-sm sm:text-base text-gray-400 mb-2">{student.nameThai} • {student.grade}</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">อัพเดทล่าสุด: {student.lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <div className={`px-4 py-2 rounded-xl border ${getRiskBg(student.riskLevel)}`}>
              <span className={`text-sm sm:text-base font-semibold ${getRiskColor(student.riskLevel)}`}>
                ความเสี่ยง{student.riskLevel === 'high' ? 'สูง' : student.riskLevel === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
              </span>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs sm:text-sm text-gray-400">คะแนนความเสี่ยง</p>
              <p className={`text-xl sm:text-2xl font-semibold ${getRiskColor(student.riskLevel)}`}>
                {student.riskScore}/100
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Charts and Scores */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Performance Metrics */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">ตัวชี้วัดประสิทธิภาพ</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {[
                { label: 'เข้าเรียน', value: student.attendance, icon: Calendar, color: 'blue' },
                { label: 'ผลการเรียน', value: student.academicScore, icon: BookOpen, color: 'purple' },
                { label: 'พฤติกรรม', value: student.behaviorScore, icon: Users, color: 'green' },
                { label: 'ความตั้งใจ', value: student.engagementScore, icon: Activity, color: 'orange' }
              ].map((metric, index) => (
                <div key={index} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <p className="text-xs text-gray-400">{metric.label}</p>
                  </div>
                  <p className={`text-xl sm:text-2xl font-semibold ${
                    metric.value >= 80 ? 'text-green-400' :
                    metric.value >= 60 ? 'text-[#FF6A00]' : 'text-red-400'
                  }`}>
                    {metric.value}%
                  </p>
                </div>
              ))}
            </div>

            {/* Radar Chart */}
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <PolarRadiusAxis stroke="#9ca3af" />
                  <Radar
                    name="ประสิทธิภาพ"
                    dataKey="score"
                    stroke="#FF6A00"
                    fill="#FF6A00"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Academic Trend */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">แนวโน้มผลการเรียน</h2>
                <p className="text-xs sm:text-sm text-gray-400">6 เดือนที่ผ่านมา</p>
              </div>
            </div>
            
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#FF6A00"
                    strokeWidth={3}
                    dot={{ fill: '#FF6A00', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Alerts and Insights */}
        <div className="space-y-4 sm:space-y-6">
          {/* Active Alerts */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">การแจ้งเตือนที่ใช้งานอยู่</h2>
            </div>
            
            {student.alerts.length > 0 ? (
              <div className="space-y-3">
                {student.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        alert.severity === 'high' ? 'bg-red-400' :
                        alert.severity === 'medium' ? 'bg-[#FF6A00]' : 'bg-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-white capitalize">
                          {alert.type === 'attendance' ? 'การเข้าเรียน' :
                           alert.type === 'academic' ? 'ผลการเรียน' :
                           alert.type === 'behavior' ? 'พฤติกรรม' : 'ความตั้งใจ'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">ไม่มีการแจ้งเตือน</p>
            )}
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl bg-gradient-to-br from-[#FF6A00]/10 to-[#FF8C42]/5 backdrop-blur-sm border border-[#FF6A00]/20 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4">AI Insights</h2>
            
            {studentInsights.length > 0 ? (
              <div className="space-y-4">
                {studentInsights.map((insight) => (
                  <div key={insight.id} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm font-medium text-[#FF8C42]">{insight.category}</p>
                      <span className="text-xs text-gray-500">{insight.confidence}% ความแม่นยำ</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-3">{insight.insight}</p>
                    <div className="pt-3 border-t border-white/5">
                      <p className="text-xs text-gray-400 mb-1">คำแนะนำ:</p>
                      <p className="text-xs sm:text-sm text-white">{insight.recommendation}</p>
                    </div>
                  </div>
                ))}
                <Link
                  to="/ai-analysis"
                  className="block text-center text-xs sm:text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium"
                >
                  ดูการวิเคราะห์ AI แบบเต็ม →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-400">ยังไม่มีข้อมูลการวิเคราะห์ AI</p>
            )}
          </div>

          {/* Active Interventions */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">แผนการช่วยเหลือ</h2>
            </div>
            
            {student.interventions.length > 0 ? (
              <div className="space-y-3">
                {student.interventions.map((intervention) => (
                  <div
                    key={intervention.id}
                    className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs sm:text-sm font-medium text-white">{intervention.title}</p>
                      <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ml-2 ${
                        intervention.status === 'active' ? 'bg-green-500/10 text-green-400' :
                        intervention.status === 'planned' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-gray-500/10 text-gray-400'
                      }`}>
                        {intervention.status === 'active' ? 'กำลังดำเนินการ' :
                         intervention.status === 'planned' ? 'วางแผนแล้ว' : 'เสร็จสิ้น'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{intervention.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Clock className="w-3 h-3" />
                      <span>เริ่ม: {intervention.startDate}</span>
                      <span>•</span>
                      <span>{intervention.assignedTo}</span>
                    </div>
                    <div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${intervention.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{intervention.progress}% สำเร็จ</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-400 mb-3">ยังไม่มีแผนการช่วยเหลือ</p>
                <Link
                  to="/interventions"
                  className="block text-center py-2 px-4 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] hover:bg-[#FF6A00]/20 transition-colors text-xs sm:text-sm font-medium"
                >
                  สร้างแผนช่วยเหลือ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
