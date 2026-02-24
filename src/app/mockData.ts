import { AlertTriangle, TrendingDown, Clock, XCircle, Brain, Target, Users, AlertCircle } from 'lucide-react';

export const STUDENTS = [
  {
    id: "ST001",
    name: "Somchai Jaidee",
    grade: "M.5/1",
    riskScore: 85,
    riskLevel: "High",
    attendance: 65,
    lastSeen: "2 days ago",
    aiInsight: "Sudden drop in attendance over the past 2 weeks. Correlation with failing math grades detected.",
    avatar: "figma:asset/avatar1.png", // placeholder
    history: [
      { date: "2023-10-01", score: 45 },
      { date: "2023-10-15", score: 60 },
      { date: "2023-11-01", score: 85 },
    ]
  },
  {
    id: "ST002",
    name: "Natcha Wong",
    grade: "M.4/2",
    riskScore: 45,
    riskLevel: "Medium",
    attendance: 82,
    lastSeen: "Today",
    aiInsight: "Moderate risk due to incomplete assignments in Science.",
    avatar: "figma:asset/avatar2.png", // placeholder
    history: [
      { date: "2023-10-01", score: 30 },
      { date: "2023-10-15", score: 40 },
      { date: "2023-11-01", score: 45 },
    ]
  },
  {
    id: "ST003",
    name: "Arthit Sook",
    grade: "M.6/1",
    riskScore: 12,
    riskLevel: "Low",
    attendance: 98,
    lastSeen: "Today",
    aiInsight: "Performance is stable. Recommend for peer tutoring program.",
    avatar: "figma:asset/avatar3.png", // placeholder
    history: [
      { date: "2023-10-01", score: 10 },
      { date: "2023-10-15", score: 12 },
      { date: "2023-11-01", score: 12 },
    ]
  },
  {
    id: "ST004",
    name: "Kanda Bunma",
    grade: "M.5/3",
    riskScore: 92,
    riskLevel: "High",
    attendance: 55,
    lastSeen: "5 days ago",
    aiInsight: "Critical risk: Consecutive absences and behavioral reports logged.",
    avatar: "figma:asset/avatar4.png", // placeholder
    history: [
      { date: "2023-10-01", score: 70 },
      { date: "2023-10-15", score: 85 },
      { date: "2023-11-01", score: 92 },
    ]
  },
  {
    id: "ST005",
    name: "Teerapat P.",
    grade: "M.4/1",
    riskScore: 28,
    riskLevel: "Low",
    attendance: 95,
    lastSeen: "Yesterday",
    aiInsight: "Slight dip in grades, but attendance remains perfect.",
    avatar: "figma:asset/avatar5.png", // placeholder
    history: [
      { date: "2023-10-01", score: 20 },
      { date: "2023-10-15", score: 25 },
      { date: "2023-11-01", score: 28 },
    ]
  }
];

export const ALERTS = [
  {
    id: 1,
    studentId: "ST004",
    studentName: "Kanda Bunma",
    type: "Critical Absence",
    message: "Absent for 3 consecutive days without notice.",
    time: "2 hours ago",
    severity: "High",
    icon: AlertTriangle
  },
  {
    id: 2,
    studentId: "ST001",
    studentName: "Somchai Jaidee",
    type: "Grade Drop",
    message: "Math grade dropped below 50%.",
    time: "5 hours ago",
    severity: "Medium",
    icon: TrendingDown
  },
  {
    id: 3,
    studentId: "ST002",
    studentName: "Natcha Wong",
    type: "Assignment Missing",
    message: "Missing 3 assignments in Physics.",
    time: "Yesterday",
    severity: "Medium",
    icon: Clock
  }
];

export const SCHOOL_STATS = [
  { label: "Total Students", value: "2,450", change: "+12%", icon: Users, color: "text-blue-400" },
  { label: "At Risk (High)", value: "48", change: "-5%", icon: AlertCircle, color: "text-red-500" },
  { label: "At Risk (Medium)", value: "156", change: "+2%", icon: AlertTriangle, color: "text-orange-400" },
  { label: "AI Predictions", value: "98% Accuracy", change: "+1.2%", icon: Brain, color: "text-purple-400" },
];
