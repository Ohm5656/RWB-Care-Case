
export interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  attendance: number; // percentage
  gpa: number;
  behaviorScore: number; // 0-100
  lastAssessment: string;
  image?: string;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Somchai Jaidee',
    studentId: '65001',
    grade: 'M.4/1',
    riskScore: 85,
    riskLevel: 'High',
    attendance: 65,
    gpa: 1.8,
    behaviorScore: 45,
    lastAssessment: '2026-02-20',
  },
  {
    id: '2',
    name: 'Nattaporn Srisuk',
    studentId: '65002',
    grade: 'M.4/2',
    riskScore: 45,
    riskLevel: 'Medium',
    attendance: 82,
    gpa: 2.5,
    behaviorScore: 70,
    lastAssessment: '2026-02-22',
  },
  {
    id: '3',
    name: 'Kittiphong Wongsa',
    studentId: '65003',
    grade: 'M.5/1',
    riskScore: 12,
    riskLevel: 'Low',
    attendance: 98,
    gpa: 3.8,
    behaviorScore: 95,
    lastAssessment: '2026-02-18',
  },
  {
    id: '4',
    name: 'Siriporn Metha',
    studentId: '65004',
    grade: 'M.6/3',
    riskScore: 92,
    riskLevel: 'High',
    attendance: 55,
    gpa: 1.5,
    behaviorScore: 40,
    lastAssessment: '2026-02-23',
  },
  {
    id: '5',
    name: 'Arthit Rattanaporn',
    studentId: '65005',
    grade: 'M.4/1',
    riskScore: 30,
    riskLevel: 'Low',
    attendance: 90,
    gpa: 3.2,
    behaviorScore: 88,
    lastAssessment: '2026-02-15',
  },
  {
    id: '6',
    name: 'Pimchanok Leela',
    studentId: '65006',
    grade: 'M.5/4',
    riskScore: 68,
    riskLevel: 'Medium',
    attendance: 78,
    gpa: 2.1,
    behaviorScore: 60,
    lastAssessment: '2026-02-21',
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: 'High Risk Alert',
    message: 'Somchai Jaidee missed 3 consecutive classes.',
    time: '2 hours ago',
    type: 'alert',
  },
  {
    id: 2,
    title: 'New Analysis Available',
    message: 'AI analysis for Grade M.5 is ready.',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'Intervention Required',
    message: 'Siriporn Metha needs an urgent counseling session.',
    time: '1 day ago',
    type: 'warning',
  },
];
