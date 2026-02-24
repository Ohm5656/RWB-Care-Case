import { useState } from 'react';
import { Link } from 'react-router';
import { Bell, AlertCircle, CheckCircle2, Filter } from 'lucide-react';
import { mockStudents } from '../data/studentData';

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  
  const allAlerts = mockStudents
    .flatMap(student => 
      student.alerts.map(alert => ({
        ...alert,
        student
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredAlerts = allAlerts.filter(alert => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'high') return alert.severity === 'high';
    return true;
  });

  const unreadCount = allAlerts.filter(a => !a.read).length;
  const highSeverityCount = allAlerts.filter(a => a.severity === 'high').length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-[#FF6A00] bg-orange-500/10 border-orange-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'attendance': return 'การเข้าเรียน';
      case 'academic': return 'ผลการเรียน';
      case 'behavior': return 'พฤติกรรม';
      case 'engagement': return 'ความตั้งใจ';
      default: return type;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Alerts & Notifications</h1>
        <p className="text-sm sm:text-base text-gray-400">ติดตามและตอบสนองต่อการแจ้งเตือนความเสี่ยง</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">การแจ้งเตือนทั้งหมด</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{allAlerts.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] shadow-lg shadow-orange-500/20">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">ยังไม่อ่าน</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">ความสำคัญสูง</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{highSeverityCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#FF6A00] text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all ${
              filter === 'unread'
                ? 'bg-[#FF6A00] text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            ยังไม่อ่าน ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all ${
              filter === 'high'
                ? 'bg-[#FF6A00] text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            สำคัญสูง ({highSeverityCount})
          </button>
        </div>
        
        <button className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-2 justify-center sm:justify-start text-sm sm:text-base">
          <CheckCircle2 className="w-4 h-4" />
          ทำเครื่องหมายอ่านทั้งหมด
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`rounded-2xl bg-white/5 backdrop-blur-sm border p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 ${
                !alert.read ? 'border-[#FF6A00]/30' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                {/* Unread Indicator */}
                {!alert.read && (
                  <div className="hidden sm:block w-2 h-2 rounded-full bg-[#FF6A00] mt-2 flex-shrink-0 shadow-lg shadow-orange-500/50" />
                )}

                {/* Student Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-white text-sm sm:text-base font-semibold shadow-lg shadow-orange-500/20 flex-shrink-0">
                  {alert.student.avatar}
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/student/${alert.student.id}`}
                        className="text-sm sm:text-base font-medium text-white hover:text-[#FF6A00] transition-colors block truncate"
                      >
                        {alert.student.name}
                      </Link>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {alert.student.nameThai} • {alert.student.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 sm:px-3 py-1 rounded-lg border text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity === 'high' ? 'สูง' : alert.severity === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                      </span>
                      <span className="px-2 sm:px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400">
                        {getTypeText(alert.type)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mb-3">{alert.message}</p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                      <span>{alert.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>คะแนนความเสี่ยง: <span className="text-red-400 font-medium">{alert.student.riskScore}</span></span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link
                        to={`/student/${alert.student.id}`}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] hover:bg-[#FF6A00]/20 transition-colors text-xs sm:text-sm font-medium text-center"
                      >
                        ดูโปรไฟล์
                      </Link>
                      <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium">
                        ปิด
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-12 text-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-4" />
            <p className="text-base sm:text-lg font-medium text-white mb-2">ทำงานเสร็จแล้ว!</p>
            <p className="text-sm sm:text-base text-gray-400">ไม่มีการแจ้งเตือนที่ตรงกับตัวกรอง</p>
          </div>
        )}
      </div>

      {/* Alert Types Legend */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">ประเภทการแจ้งเตือน</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { type: 'การเข้าเรียน', desc: 'ขาดเรียนหรือมาสายบ่อย' },
            { type: 'ผลการเรียน', desc: 'เกรดตกหรือสอบตก' },
            { type: 'พฤติกรรม', desc: 'ปัญหาพฤติกรรมหรือเหตุการณ์' },
            { type: 'ความตั้งใจ', desc: 'การมีส่วนร่วมหรือแรงจูงใจต่ำ' }
          ].map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
              <p className="text-xs sm:text-sm font-medium text-white mb-1">{item.type}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
