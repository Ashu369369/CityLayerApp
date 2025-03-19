const programs = [
  {
    programid: 1,
    name: "Yoga Class",
    description: "Weekly yoga session for beginners.",
    startDate: "2025-01-01",
    duration: 90, // in days
    endDate: null,
    isRepeat: true,
    repeatAfter: { type: "weekly", value: 1 },
    createdBy: 1,
    createdAt: "2025-01-01T08:00:00Z",
    departmentId: 1, // Added departmentId
  },
  {
    programid: 2,
    name: "Tax Seminar",
    description: "Annual tax planning seminar.",
    startDate: "2025-04-15",
    duration: 1, // in days
    endDate: "2025-04-15",
    isRepeat: true,
    repeatAfter: { type: "yearly", date: "2025-04-15" },
    createdBy: 2,
    createdAt: "2025-03-01T10:30:00Z",
    departmentId: 2, // Added departmentId
  },
  {
    programid: 3,
    name: "Software Updates",
    description: "Monthly security updates for software.",
    startDate: "2025-02-01",
    duration: 30, // in days
    endDate: null,
    isRepeat: true,
    repeatAfter: { type: "monthly", day: 10 }, // Happens on the 10th of every month
    createdBy: 3,
    createdAt: "2025-01-25T14:15:00Z",
    departmentId: 103, // Added departmentId
  },
  {
    programid: 4,
    name: "AI Bootcamp",
    description: "Intensive AI and ML training program.",
    startDate: "2025-06-10",
    duration: 180, // in days
    endDate: "2025-12-10",
    isRepeat: false,
    repeatAfter: null,
    createdBy: 4,
    createdAt: "2025-05-01T09:00:00Z",
    departmentId: 3, // Added departmentId
  },
];

export default programs;
