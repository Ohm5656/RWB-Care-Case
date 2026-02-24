import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, TrendingDown, AlertCircle } from 'lucide-react';
import { mockStudents } from '../data/studentData';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.nameThai.includes(searchTerm);
    const matchesFilter = filterRisk === 'all' || student.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-[#FF6A00]';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Student Risk Monitoring</h1>
        <p className="text-sm sm:text-base text-gray-400">ติดตามและประเมินนักเรียนที่มีความเสี่ยง</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อนักเรียน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 focus:border-[#FF6A00]/50 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 focus:border-[#FF6A00]/50 transition-all"
          >
            <option value="all">ทุกระดับ</option>
            <option value="high">ความเสี่ยงสูง</option>
            <option value="medium">ความเสี่ยงปานกลาง</option>
            <option value="low">ความเสี่ยงต่ำ</option>
          </select>
          
          <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm sm:text-base">ตัวกรองเพิ่มเติม</span>
          </button>
        </div>
      </div>

      {/* Student List - Mobile Cards */}
      <div className="block lg:hidden space-y-3">
        {filteredStudents.map((student) => (
          <Link
            key={student.id}
            to={`/student/${student.id}`}
            className="block rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0 ${
                student.riskLevel === 'high' ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/20' :
                student.riskLevel === 'medium' ? 'bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] shadow-orange-500/20' :
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/20'
              }`}>
                {student.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{student.name}</p>
                <p className="text-sm text-gray-400 truncate">{student.nameThai}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{student.grade}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskBg(student.riskLevel)} ${getRiskColor(student.riskLevel)}`}>
                    {student.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-xs text-gray-400">เข้าเรียน</p>
                <p className={`text-sm font-medium ${getScoreColor(student.attendance)}`}>
                  {student.attendance}%
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-xs text-gray-400">ผลการเรียน</p>
                <p className={`text-sm font-medium ${getScoreColor(student.academicScore)}`}>
                  {student.academicScore}%
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-xs text-gray-400">พฤติกรรม</p>
                <p className={`text-sm font-medium ${getScoreColor(student.behaviorScore)}`}>
                  {student.behaviorScore}%
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <p className="text-xs text-gray-400">ความตั้งใจ</p>
                <p className={`text-sm font-medium ${getScoreColor(student.engagementScore)}`}>
                  {student.engagementScore}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className={`w-full h-2 rounded-full overflow-hidden bg-white/5`} style={{ width: '80px' }}>
                  <div
                    className={`h-full ${
                      student.riskScore >= 70 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                      student.riskScore >= 40 ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]' :
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                    style={{ width: `${student.riskScore}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                  {student.riskScore}
                </span>
              </div>
              {student.alerts.length > 0 && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span className="text-red-400 text-xs font-medium">{student.alerts.length}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Student List - Desktop Table */}
      <div className="hidden lg:block rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">นักเรียน</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">ชั้น</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">คะแนนความเสี่ยง</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">เข้าเรียน</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">ผลการเรียน</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">ความตั้งใจ</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">การแจ้งเตือน</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/student/${student.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-lg ${
                        student.riskLevel === 'high' ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/20' :
                        student.riskLevel === 'medium' ? 'bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] shadow-orange-500/20' :
                        'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/20'
                      }`}>
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-[#FF6A00] transition-colors">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-400">{student.nameThai}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{student.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden" style={{ width: '80px' }}>
                        <div
                          className={`h-full ${
                            student.riskScore >= 70 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                            student.riskScore >= 40 ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]' :
                            'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}
                          style={{ width: `${student.riskScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getRiskColor(student.riskLevel)}`}>
                        {student.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getScoreColor(student.attendance)}`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getScoreColor(student.academicScore)}`}>
                      {student.academicScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getScoreColor(student.engagementScore)}`}>
                      {student.engagementScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {student.alerts.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">
                          {student.alerts.length}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">ไม่มี</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex px-3 py-1 rounded-lg border ${getRiskBg(student.riskLevel)}`}>
                      <span className={`text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                        {student.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="text-center text-xs sm:text-sm text-gray-400">
        แสดง {filteredStudents.length} จาก {mockStudents.length} คน
      </div>
    </div>
  );
}