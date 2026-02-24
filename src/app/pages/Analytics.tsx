import { TrendingUp, Users, AlertTriangle, Shield, Download } from 'lucide-react';
import { schoolAnalytics } from '../data/studentData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function Analytics() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">School Analytics</h1>
          <p className="text-sm sm:text-base text-gray-400">ภาพรวมแนวโน้มความเสี่ยงและประสิทธิภาพการช่วยเหลือ</p>
        </div>
        <button className="px-3 sm:px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C42] text-white rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20 text-sm sm:text-base">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">ส่งออกรายงาน</span>
          <span className="sm:hidden">ส่งออก</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Total Students',
            labelThai: 'นักเรียนทั้งหมด',
            value: schoolAnalytics.totalStudents,
            icon: Users,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            label: 'At Risk',
            labelThai: 'มีความเสี่ยง',
            value: schoolAnalytics.atRiskStudents,
            percentage: ((schoolAnalytics.atRiskStudents / schoolAnalytics.totalStudents) * 100).toFixed(1) + '%',
            icon: AlertTriangle,
            color: 'from-[#FF6A00] to-[#FF8C42]'
          },
          {
            label: 'Critical Alerts',
            labelThai: 'การแจ้งเตือนเร่งด่วน',
            value: schoolAnalytics.criticalAlerts,
            icon: TrendingUp,
            color: 'from-red-500 to-orange-500'
          },
          {
            label: 'Active Plans',
            labelThai: 'แผนที่ดำเนินการ',
            value: schoolAnalytics.activeInterventions,
            icon: Shield,
            color: 'from-green-500 to-emerald-500'
          }
        ].map((metric, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
              <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">{metric.labelThai}</p>
            <div className="flex items-end gap-2">
              <p className="text-xl sm:text-3xl font-semibold text-white">{metric.value}</p>
              {metric.percentage && (
                <p className="text-xs sm:text-sm text-gray-400 mb-1">{metric.percentage}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Risk Distribution */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">การกระจายตามระดับความเสี่ยง</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolAnalytics.riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ value }) => `${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {schoolAnalytics.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
            {schoolAnalytics.riskDistribution.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-xs sm:text-sm text-gray-400 truncate">{item.name === 'Low Risk' ? 'ต่ำ' : item.name === 'Medium Risk' ? 'ปานกลาง' : 'สูง'}</p>
                <p className="text-sm sm:text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">แนวโน้ม 7 เดือน</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schoolAnalytics.monthlyTrends}>
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
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="atRisk"
                  stroke="#FF6A00"
                  strokeWidth={2}
                  name="มีความเสี่ยง"
                  dot={{ fill: '#FF6A00', r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="interventions"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="แผนช่วยเหลือ"
                  dot={{ fill: '#10B981', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">ปัจจัยเสี่ยงหลัก</h2>
          <div className="h-64 sm:h-80 mb-4 sm:mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schoolAnalytics.riskFactors} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis dataKey="factor" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="percentage" fill="#FF6A00" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {schoolAnalytics.riskFactors.map((factor, index) => (
              <div key={index} className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">
                  {factor.factor === 'Attendance' ? 'การเข้าเรียน' :
                   factor.factor === 'Academic' ? 'ผลการเรียน' :
                   factor.factor === 'Behavior' ? 'พฤติกรรม' : 'ความตั้งใจ'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">{factor.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intervention Effectiveness */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">อัตราความสำเร็จของการช่วยเหลือ</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {[
              { name: 'การสอนเสริมแบบตัวต่อตัว', success: 85, total: 28 },
              { name: 'พี่เลี้ยง', success: 78, total: 15 },
              { name: 'ปรึกษาครอบครัว', success: 72, total: 12 },
              { name: 'ช่วยเหลือพฤติกรรม', success: 68, total: 18 }
            ].map((intervention, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{intervention.name}</p>
                    <p className="text-xs text-gray-400">{intervention.total} คน</p>
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-green-400 ml-2">{intervention.success}%</span>
                </div>
                <div className="h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    style={{ width: `${intervention.success}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-xs sm:text-sm text-gray-300">
              <span className="text-green-400 font-semibold">ความสำเร็จโดยรวม:</span> 76% ของนักเรียนมีพัฒนาการดีขึ้นหลังได้รับการช่วยเหลือ
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FF6A00]/10 to-[#FF8C42]/5 backdrop-blur-sm border border-[#FF6A00]/20 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">ข้อมูลสำคัญเดือนนี้</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              นักเรียนที่มีความเสี่ยง <span className="text-green-400 font-semibold">ลดลง 8 คน</span> เมื่อเทียบกับสัปดาห์ที่แล้ว
            </p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF8C42] mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              <span className="text-[#FF8C42] font-semibold">สร้าง 12 แผนช่วยเหลือใหม่</span> ในเดือนนี้
            </p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              <span className="text-red-400 font-semibold">การเข้าเรียน</span> ยังคงเป็นปัจจัยเสี่ยงอันดับหนึ่งที่ 68%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
