import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, Plus, Clock, CheckCircle2, User, Calendar } from 'lucide-react';
import { mockStudents } from '../data/studentData';

export default function Interventions() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'planned' | 'completed'>('all');

  const allInterventions = mockStudents.flatMap(student =>
    student.interventions.map(intervention => ({
      ...intervention,
      student
    }))
  );

  // Add some sample interventions for demo
  const sampleInterventions = [
    ...allInterventions,
    {
      id: 'I002',
      title: 'Peer Mentorship Program',
      description: 'จับคู่กับนักเรียนที่เรียนดีเป็นพี่เลี้ยง',
      status: 'planned' as const,
      startDate: '2026-03-01',
      assignedTo: 'ครูสมชาย',
      progress: 0,
      student: mockStudents.find(s => s.id === 'S002')!
    },
    {
      id: 'I003',
      title: 'Family Engagement Meetings',
      description: 'พบผู้ปกครองและนักเรียนรายสัปดาห์',
      status: 'completed' as const,
      startDate: '2026-01-15',
      assignedTo: 'ครูปราณี',
      progress: 100,
      student: mockStudents.find(s => s.id === 'S004')!
    }
  ];

  const filteredInterventions = sampleInterventions.filter(intervention => {
    if (activeTab === 'all') return true;
    return intervention.status === activeTab;
  });

  const statusCounts = {
    all: sampleInterventions.length,
    active: sampleInterventions.filter(i => i.status === 'active').length,
    planned: sampleInterventions.filter(i => i.status === 'planned').length,
    completed: sampleInterventions.filter(i => i.status === 'completed').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'planned': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'completed': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'กำลังดำเนินการ';
      case 'planned': return 'วางแผนแล้ว';
      case 'completed': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Intervention & Support Plans</h1>
          <p className="text-sm sm:text-base text-gray-400">จัดการโครงการช่วยเหลือนักเรียนและติดตามความคืบหน้า</p>
        </div>
        <button className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] text-white rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-orange-500/30 shadow-lg shadow-orange-500/20 text-sm sm:text-base">
          <Plus className="w-4 h-4" />
          สร้างแผนใหม่
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">แผนทั้งหมด</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{statusCounts.all}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">กำลังดำเนินการ</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{statusCounts.active}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">วางแผนแล้ว</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{statusCounts.planned}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">เสร็จสิ้น</p>
              <p className="text-xl sm:text-2xl font-semibold text-white">{statusCounts.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'active', 'planned', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#FF6A00] text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            {tab === 'all' ? 'ทั้งหมด' : tab === 'active' ? 'กำลังดำเนินการ' : tab === 'planned' ? 'วางแผนแล้ว' : 'เสร็จสิ้น'} ({statusCounts[tab]})
          </button>
        ))}
      </div>

      {/* Interventions List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredInterventions.length > 0 ? (
          filteredInterventions.map((intervention) => (
            <div
              key={intervention.id}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Left: Student Info */}
                <div className="flex items-start gap-3 sm:gap-4 lg:w-1/3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-white font-semibold shadow-lg shadow-orange-500/20 flex-shrink-0">
                    {intervention.student.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/student/${intervention.student.id}`}
                      className="text-sm sm:text-base font-medium text-white hover:text-[#FF6A00] transition-colors block truncate"
                    >
                      {intervention.student.name}
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{intervention.student.nameThai}</p>
                    <p className="text-xs text-gray-500 mt-1">{intervention.student.grade}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        intervention.student.riskLevel === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        intervention.student.riskLevel === 'medium' ? 'bg-orange-500/10 text-[#FF6A00] border border-orange-500/20' :
                        'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                        {intervention.student.riskLevel === 'high' ? 'สูง' : intervention.student.riskLevel === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Intervention Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-1">
                        {intervention.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{intervention.description}</p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-lg border text-xs font-medium flex-shrink-0 ${getStatusColor(intervention.status)}`}>
                      {getStatusText(intervention.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>เริ่ม: {intervention.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{intervention.assignedTo}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-400">ความคืบหน้า</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">{intervention.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          intervention.progress === 100 
                            ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                            : intervention.progress >= 60
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]'
                        }`}
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                  <button className="flex-1 lg:flex-none px-3 sm:px-4 py-2 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] hover:bg-[#FF6A00]/20 transition-colors text-xs sm:text-sm font-medium">
                    แก้ไข
                  </button>
                  <Link
                    to={`/student/${intervention.student.id}`}
                    className="flex-1 lg:flex-none px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium text-center"
                  >
                    ดูนักเรียน
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-12 text-center">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-base sm:text-lg font-medium text-white mb-2">ไม่พบแผนช่วยเหลือ</p>
            <p className="text-sm sm:text-base text-gray-400 mb-4">เริ่มสร้างแผนช่วยเหลือสำหรับนักเรียนที่มีความเสี่ยง</p>
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] text-white rounded-xl flex items-center gap-2 mx-auto transition-all hover:shadow-lg hover:shadow-orange-500/30 text-sm sm:text-base">
              <Plus className="w-4 h-4" />
              สร้างแผนแรก
            </button>
          </div>
        )}
      </div>

      {/* Intervention Types */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FF6A00]/10 to-[#FF8C42]/5 backdrop-blur-sm border border-[#FF6A00]/20 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">ประเภทแผนช่วยเหลือที่แนะนำ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: 'การสอนเสริม', desc: 'เรียนตัวต่อตัวหรือกลุ่มเล็ก' },
            { name: 'พี่เลี้ยง', desc: 'การสนับสนุนจากเพื่อน' },
            { name: 'พบผู้ปกครอง', desc: 'ประชุมและเยี่ยมบ้าน' },
            { name: 'ช่วยเหลือพฤติกรรม', desc: 'ให้คำปรึกษาและพัฒนาทักษะ' }
          ].map((type, index) => (
            <div key={index} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="text-xs sm:text-sm font-medium text-white mb-1">{type.name}</p>
              <p className="text-xs text-gray-400">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
