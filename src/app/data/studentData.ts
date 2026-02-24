export interface Student {
  id: string;
  name: string;
  nameThai: string;
  grade: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  avatar: string;
  attendance: number;
  academicScore: number;
  behaviorScore: number;
  engagementScore: number;
  lastUpdate: string;
  alerts: Alert[];
  interventions: Intervention[];
}

export interface Alert {
  id: string;
  type: 'attendance' | 'academic' | 'behavior' | 'engagement';
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: string;
  read: boolean;
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed';
  startDate: string;
  assignedTo: string;
  progress: number;
}

export interface AIInsight {
  id: string;
  studentId: string;
  category: string;
  insight: string;
  recommendation: string;
  confidence: number;
  date: string;
}

export const mockStudents: Student[] = [
  {
    id: 'S001',
    name: 'Somchai Rattanakosin',
    nameThai: 'สมชาย รัตนโกสินทร์',
    grade: 'Grade 10',
    riskScore: 85,
    riskLevel: 'high',
    avatar: 'SC',
    attendance: 65,
    academicScore: 58,
    behaviorScore: 72,
    engagementScore: 45,
    lastUpdate: '2026-02-24',
    alerts: [
      {
        id: 'A001',
        type: 'attendance',
        severity: 'high',
        message: 'Absent 7 days in the last 2 weeks',
        date: '2026-02-23',
        read: false
      },
      {
        id: 'A002',
        type: 'academic',
        severity: 'high',
        message: 'Failing 3 subjects - Math, Science, English',
        date: '2026-02-20',
        read: false
      }
    ],
    interventions: [
      {
        id: 'I001',
        title: 'One-on-one Academic Support',
        description: 'การติวรายสัปดาห์สำหรับวิชาคณิตศาสตร์และวิทยาศาสตร์',
        status: 'active',
        startDate: '2026-02-15',
        assignedTo: 'ครูปราณี',
        progress: 40
      }
    ]
  },
  {
    id: 'S002',
    name: 'Apinya Sukhumvit',
    nameThai: 'อภิญญา สุขุมวิท',
    grade: 'Grade 9',
    riskScore: 45,
    riskLevel: 'medium',
    avatar: 'AS',
    attendance: 88,
    academicScore: 75,
    behaviorScore: 68,
    engagementScore: 70,
    lastUpdate: '2026-02-24',
    alerts: [
      {
        id: 'A003',
        type: 'behavior',
        severity: 'medium',
        message: 'Recent social withdrawal observed',
        date: '2026-02-22',
        read: false
      }
    ],
    interventions: []
  },
  {
    id: 'S003',
    name: 'Nattapong Chaiyaphum',
    nameThai: 'ณัฐพงษ์ ชัยภูมิ',
    grade: 'Grade 11',
    riskScore: 15,
    riskLevel: 'low',
    avatar: 'NC',
    attendance: 96,
    academicScore: 92,
    behaviorScore: 95,
    engagementScore: 90,
    lastUpdate: '2026-02-24',
    alerts: [],
    interventions: []
  },
  {
    id: 'S004',
    name: 'Pimchanok Nakhon',
    nameThai: 'พิมพ์ชนก นคร',
    grade: 'Grade 10',
    riskScore: 72,
    riskLevel: 'high',
    avatar: 'PN',
    attendance: 70,
    academicScore: 62,
    behaviorScore: 60,
    engagementScore: 55,
    lastUpdate: '2026-02-24',
    alerts: [
      {
        id: 'A004',
        type: 'engagement',
        severity: 'high',
        message: 'No homework submissions for 2 weeks',
        date: '2026-02-21',
        read: false
      }
    ],
    interventions: []
  },
  {
    id: 'S005',
    name: 'Kittisak Phetchabun',
    nameThai: 'กิตติศักดิ์ เพชรบูรณ์',
    grade: 'Grade 9',
    riskScore: 38,
    riskLevel: 'medium',
    avatar: 'KP',
    attendance: 82,
    academicScore: 78,
    behaviorScore: 85,
    engagementScore: 75,
    lastUpdate: '2026-02-24',
    alerts: [],
    interventions: []
  },
  {
    id: 'S006',
    name: 'Siriporn Udon',
    nameThai: 'ศิริพร อุดร',
    grade: 'Grade 11',
    riskScore: 12,
    riskLevel: 'low',
    avatar: 'SU',
    attendance: 98,
    academicScore: 88,
    behaviorScore: 92,
    engagementScore: 94,
    lastUpdate: '2026-02-24',
    alerts: [],
    interventions: []
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'AI001',
    studentId: 'S001',
    category: 'Attendance Pattern',
    insight: 'Somchai shows consistent Monday absences over the past month, suggesting a weekend-related pattern that may indicate family responsibilities or social challenges.',
    recommendation: 'Schedule a private conversation to understand Monday challenges. Consider flexible assignment deadlines and family support resources.',
    confidence: 89,
    date: '2026-02-24'
  },
  {
    id: 'AI002',
    studentId: 'S001',
    category: 'Academic Decline',
    insight: 'Math and Science scores dropped 30% after semester break. This sudden decline correlates with increased absenteeism.',
    recommendation: 'Provide catch-up materials and peer tutoring. Consider splitting complex topics into manageable chunks.',
    confidence: 92,
    date: '2026-02-23'
  },
  {
    id: 'AI003',
    studentId: 'S002',
    category: 'Social Engagement',
    insight: 'Apinya participated less in group activities (down 40%) while maintaining academic performance. May indicate emerging social anxiety.',
    recommendation: 'Assign collaborative projects with trusted peers. Monitor for signs of bullying or social stress.',
    confidence: 76,
    date: '2026-02-22'
  }
];

export const schoolAnalytics = {
  totalStudents: 847,
  atRiskStudents: 127,
  criticalAlerts: 23,
  activeInterventions: 45,
  riskDistribution: [
    { name: 'Low Risk', value: 720, color: '#10B981' },
    { name: 'Medium Risk', value: 104, color: '#FF6A00' },
    { name: 'High Risk', value: 23, color: '#EF4444' }
  ],
  monthlyTrends: [
    { month: 'Aug', atRisk: 98, interventions: 32 },
    { month: 'Sep', atRisk: 105, interventions: 38 },
    { month: 'Oct', atRisk: 118, interventions: 42 },
    { month: 'Nov', atRisk: 132, interventions: 48 },
    { month: 'Dec', atRisk: 125, interventions: 45 },
    { month: 'Jan', atRisk: 115, interventions: 40 },
    { month: 'Feb', atRisk: 127, interventions: 45 }
  ],
  riskFactors: [
    { factor: 'Attendance', percentage: 68 },
    { factor: 'Academic', percentage: 52 },
    { factor: 'Behavior', percentage: 34 },
    { factor: 'Engagement', percentage: 45 }
  ]
};
