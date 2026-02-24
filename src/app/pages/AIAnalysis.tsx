import { Brain, Sparkles, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { mockStudents, mockAIInsights } from '../data/studentData';
import { Link } from 'react-router';

export default function AIAnalysis() {
  const patterns = [
    {
      title: 'Monday Absence Pattern',
      titleThai: 'รูปแบบการขาดเรียนวันจันทร์',
      description: 'AI ตรวจพบว่าการขาดเรียนวันจันทร์สูงกว่าวันอื่น 35%',
      affectedStudents: 12,
      confidence: 89,
      severity: 'high',
      insight: 'รูปแบบนี้บ่งชี้ว่าอาจมีภาระหน้าที่ครอบครัวช่วงสุดสัปดาห์ หรือปัญหาการเดินทางที่ทำให้นักเรียนไม่สามารถเข้าเรียนวันจันทร์ได้',
      recommendations: [
        'กำหนดการทดสอบสำคัญในวันอังคาร-พฤหัส',
        'จัดเซสชั่นเช็คอินเช้าวันจันทร์',
        'ประสานงานกับครอบครัวเกี่ยวกับความท้าทายวันจันทร์'
      ]
    },
    {
      title: 'Post-Semester Break Decline',
      titleThai: 'ผลการเรียนลดลงหลังปิดเทอม',
      description: 'ผลการเรียนลดลงเฉลี่ย 18% ใน 2 สัปดาห์แรกหลังปิดเทอม',
      affectedStudents: 34,
      confidence: 92,
      severity: 'medium',
      insight: 'นักเรียนมีปัญหาในการกลับมาสู่จังหวะการเรียนหลังจากปิดเทอมยาว โดยเฉพาะวิชาคณิตศาสตร์และวิทยาศาสตร์',
      recommendations: [
        'จัดเซสชั่นทบทวนก่อนเปิดเทอม',
        'มอบหมายการอ่านเบาๆ ระหว่างปิดเทอม',
        'ค่อยๆ เพิ่มความยากในสัปดาห์แรกกลับมา'
      ]
    },
    {
      title: 'Peer Support Success',
      titleThai: 'ความสำเร็จของการช่วยเหลือจากเพื่อน',
      description: 'นักเรียนที่มีพี่เลี้ยงมีคะแนนความตั้งใจดีขึ้น 45%',
      affectedStudents: 8,
      confidence: 87,
      severity: 'low',
      insight: 'ระบบการสนับสนุนจากเพื่อนมีประสิทธิภาพสูง โดยเฉพาะเมื่อจับคู่ตามความสนใจมากกว่าระดับชั้น',
      recommendations: [
        'ขยายโปรแกรมพี่เลี้ยงเพิ่มอีก 20 คน',
        'ฝึกอบรมนักเรียนที่เรียนดีให้เป็นพี่เลี้ยง',
        'จัดเวลาประชุมพี่เลี้ยงรายสัปดาห์'
      ]
    }
  ];

  const individualInsights = mockAIInsights.map(insight => {
    const student = mockStudents.find(s => s.id === insight.studentId);
    return { ...insight, student };
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FF6A00]/10 to-[#FF8C42]/5 backdrop-blur-sm border border-[#FF6A00]/20 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] shadow-lg shadow-orange-500/20">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-1">AI Analysis Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-400">ข้อมูลเชิงลึกและการตรวจจับรูปแบบด้วย Machine Learning</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF8C42]" />
              <p className="text-xs sm:text-sm text-gray-400">รูปแบบที่พบ</p>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-white">{patterns.length}</p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <p className="text-xs sm:text-sm text-gray-400">ความแม่นยำของโมเดล</p>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-white">89%</p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A00]" />
              <p className="text-xs sm:text-sm text-gray-400">นักเรียนที่วิเคราะห์แล้ว</p>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-white">{mockStudents.length}</p>
          </div>
        </div>
      </div>

      {/* Pattern Analysis */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">รูปแบบที่ตรวจพบ</h2>
        <div className="space-y-3 sm:space-y-4">
          {patterns.map((pattern, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{pattern.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      pattern.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                      pattern.severity === 'medium' ? 'bg-orange-500/10 text-[#FF6A00]' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {pattern.severity === 'high' ? 'สูง' : pattern.severity === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 mb-1">{pattern.titleThai}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{pattern.description}</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-400">ความแม่นยำ</p>
                  <p className="text-xl sm:text-2xl font-semibold text-[#FF8C42]">{pattern.confidence}%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF8C42]" />
                    <h4 className="text-sm sm:text-base font-medium text-white">AI Insight</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300">{pattern.insight}</p>
                  <div className="mt-3 p-3 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/20">
                    <p className="text-xs text-gray-400 mb-1">นักเรียนที่ได้รับผลกระทบ</p>
                    <p className="text-base sm:text-lg font-semibold text-[#FF8C42]">{pattern.affectedStudents} คน</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <h4 className="text-sm sm:text-base font-medium text-white">คำแนะนำ</h4>
                  </div>
                  <ul className="space-y-2">
                    {pattern.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 flex-shrink-0" />
                        <span className="text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Student Insights */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">ข้อมูลเชิงลึกรายบุคคล</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {individualInsights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-orange-500/20 flex-shrink-0">
                    {insight.student?.avatar}
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={`/student/${insight.studentId}`}
                      className="text-sm sm:text-base font-medium text-white hover:text-[#FF6A00] transition-colors block truncate"
                    >
                      {insight.student?.name}
                    </Link>
                    <p className="text-xs text-gray-400 truncate">{insight.student?.nameThai}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{insight.confidence}%</span>
              </div>

              <div className="mb-3 sm:mb-4">
                <p className="text-xs text-[#FF8C42] font-medium mb-2">{insight.category}</p>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">{insight.insight}</p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/5">
                <p className="text-xs text-gray-400 mb-2">คำแนะนำ:</p>
                <p className="text-xs sm:text-sm text-white">{insight.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How AI Works */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">AI ของเราทำงานอย่างไร</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
              <span className="text-base sm:text-lg font-semibold text-purple-400">1</span>
            </div>
            <h4 className="text-sm sm:text-base font-medium text-white mb-2">รวบรวมข้อมูล</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              ติดตามการเข้าเรียน เกรด พฤติกรรม และความตั้งใจอย่างต่อเนื่อง
            </p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
              <span className="text-base sm:text-lg font-semibold text-purple-400">2</span>
            </div>
            <h4 className="text-sm sm:text-base font-medium text-white mb-2">ตรวจจับรูปแบบ</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Machine Learning ระบุแนวโน้มและความสัมพันธ์ที่มนุษย์อาจมองข้าม
            </p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
              <span className="text-base sm:text-lg font-semibold text-purple-400">3</span>
            </div>
            <h4 className="text-sm sm:text-base font-medium text-white mb-2">ข้อมูลเชิงปฏิบัติ</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              สร้างคำแนะนำเฉพาะบุคคลสำหรับการช่วยเหลือเชิงรุก
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
