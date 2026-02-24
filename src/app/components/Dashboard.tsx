
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { AlertTriangle, Users, TrendingUp, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { students, mockNotifications } from "../data/mockData";

const riskData = [
  { name: "Low Risk", value: 65, color: "#10B981" },
  { name: "Medium Risk", value: 25, color: "#F59E0B" },
  { name: "High Risk", value: 10, color: "#EF4444" },
];

const attendanceData = [
  { name: "M.1", present: 95, absent: 5 },
  { name: "M.2", present: 92, absent: 8 },
  { name: "M.3", present: 88, absent: 12 },
  { name: "M.4", present: 85, absent: 15 },
  { name: "M.5", present: 90, absent: 10 },
  { name: "M.6", present: 82, absent: 18 },
];

function StatCard({ title, value, change, icon: Icon, colorClass, delay = 0 }: any) {
  return (
    <div 
      className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#FF6A00]/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
        <Icon className="w-16 h-16" />
      </div>
      <div className="relative z-10">
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full bg-white/5 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass} w-0 group-hover:w-full transition-all duration-500`} />
    </div>
  );
}

export function Dashboard() {
  const highRiskCount = students.filter(s => s.riskLevel === 'High').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'Medium').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Welcome back, Kru Somsak. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg border border-white/10 hover:bg-[#252525] transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-[#FF6A00] text-white text-sm font-medium rounded-lg hover:bg-[#FF8C42] shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all">
            + New Assessment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="2,450" 
          change="+12%" 
          icon={Users} 
          colorClass="text-blue-500 from-blue-500 to-blue-400"
          delay={0}
        />
        <StatCard 
          title="High Risk Cases" 
          value={highRiskCount} 
          change="+5%" 
          icon={AlertTriangle} 
          colorClass="text-red-500 from-red-500 to-red-400"
          delay={100}
        />
        <StatCard 
          title="At Risk (Medium)" 
          value={mediumRiskCount} 
          change="-2%" 
          icon={TrendingUp} 
          colorClass="text-orange-500 from-orange-500 to-orange-400"
          delay={200}
        />
        <StatCard 
          title="Interventions" 
          value="142" 
          change="+8%" 
          icon={UserCheck} 
          colorClass="text-green-500 from-green-500 to-green-400"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Chart */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 lg:col-span-1 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#FF6A00]" />
            Risk Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trends */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 lg:col-span-2 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#FF6A00]" />
            Attendance Trends by Grade
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="present" name="Present" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" barSize={32} />
                <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="a" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF6A00]" />
              Recent Alerts
            </h3>
            <Link to="/notifications" className="text-xs text-[#FF6A00] hover:text-[#FF8C42] hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {mockNotifications.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  alert.type === 'alert' ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : 
                  alert.type === 'warning' ? 'bg-orange-500 shadow-[0_0_8px_#F59E0B]' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / At Risk Students Preview */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FF6A00]" />
              Students at Risk
            </h3>
            <Link to="/students" className="text-xs text-[#FF6A00] hover:text-[#FF8C42] hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {students.slice(0, 4).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-300 group-hover:bg-[#FF6A00] group-hover:text-white transition-colors">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#FF6A00] transition-colors">{student.name}</h4>
                    <p className="text-xs text-gray-500">{student.grade} • ID: {student.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    student.riskLevel === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                    student.riskLevel === 'Medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' :
                    'bg-green-500/20 text-green-400 border border-green-500/20'
                  }`}>
                    {student.riskScore}% Risk
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
