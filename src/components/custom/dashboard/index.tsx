"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const learnerData = {
  name: "Saniyaa B Shetty",
  role: "Computer Science Student",
  coursesCompleted: 12,
  studyHours: 220,
  skills: ["React", "Next.js", "Python", "Data Structures"],
  badges: ["Top Student", "Course Champion", "Homework Hero"],
  profilePic: "/profile.png",
};

const courses = [
  { title: "Advanced Web Development", status: "In Progress", deadline: "Feb 28, 2025" },
  { title: "Introduction to AI", status: "Completed", deadline: "Jan 15, 2025" },
  { title: "Database Management", status: "Enrolled", deadline: "Mar 10, 2025" },
  { title: "Full-Stack JavaScript", status: "Enrolled", deadline: "Apr 15, 2025" },
  { title: "Machine Learning Basics", status: "In Progress", deadline: "Feb 28, 2025" },
  { title: "DevOps and CI/CD", status: "Enrolled", deadline: "Mar 25, 2025" },
];

const assignments = [
  { title: "React Component Project", grade: "A", feedback: "Excellent UI design" },
  { title: "Python Data Analysis", grade: "A-", feedback: "Great visualization" },
  { title: "Algorithm Implementation", grade: "B+", feedback: "Efficient solution" },
];

const tasks = [
  { title: "Complete Chapter 5 exercises", dueDate: "Feb 20, 2025" },
  { title: "Submit term paper draft", dueDate: "Feb 22, 2025" },
];

const generateActivityData = (year: number, month: number, counts: number[]) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const activityData = [];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    activityData.push({ date, count: counts[day - 1] || 0 });
  }

  return { month: monthNames[month - 1], data: activityData };
};

const hoursSpent = 220;
const hoursSaved = Math.floor(hoursSpent * (25 / 60));

const timeManagementPieData = [
  { name: "Hours Spent", value: hoursSpent },
  { name: "Hours Saved", value: hoursSaved },
];

const COLORS = ["#0088FE", "#00C49F"];

export default function LearningDashboard() {
  const [progressValues, setProgressValues] = useState<number[]>([]);
  const [activityData, setActivityData] = useState<Array<any>>([]);

  useEffect(() => {
    // Predefined activity counts for consistent hydration
    const januaryCounts = [4,6,6,5,6,4,0,4,1,2,0,6,6,3,0,4,3,4,0,6,0,4,5,1,5,6,4,6,5,5,0];
    const februaryCounts = [4,2,3,2,0,4,0,2,3,5,5,5,5,1,1,5,3,6,4,6,6,0,5,0,3,2,4,6];
    const marchCounts = [2,3,5,0,4,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    const data = [
      generateActivityData(2025, 1, januaryCounts),
      generateActivityData(2025, 2, februaryCounts),
      generateActivityData(2025, 3, marchCounts)
    ];
    
    // Set blank days explicitly
    data[0].data[10].count = 0;
    data[0].data[20].count = 0;
    data[0].data[30].count = 0;

    setActivityData(data);
    setProgressValues(learnerData.skills.map(() => Math.random() * 100));
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col mt-3 p-4 sm:p-6">
      {/* Profile Section */}
      <Card className="w-full my-6 p-4 sm:p-6 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
            <img
              src="./SaniyaaBShetty.png"
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{learnerData.name}</h1>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Golden Performer</span>
              </span>
            </div>
            <p className="text-gray-600">{learnerData.role}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {learnerData.badges.map((badge, idx) => (
                <Badge key={idx}>{badge}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Tracker */}
      <Card className="w-full my-4 p-3 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <CardHeader className="p-2">
              <CardTitle className="text-lg">Activity Tracker</CardTitle>
              <CardDescription className="text-sm">Track your daily learning activity</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              {activityData.length > 0 && (
                <div className="flex space-x-1">
                  {activityData.map((monthData, monthIndex) => (
                    <div key={monthIndex} className="flex-1">
                      <h3 className="text-md font-semibold mb-1">{monthData.month}</h3>
                      <div className="grid grid-cols-7 gap-0.5">
                        {monthData.data.map((activity, index) => (
                          <div
                            key={index}
                            className={`h-5 w-5 rounded ${
                              activity.count === 0
                                ? "bg-gray-200"
                                : activity.count <= 3
                                  ? "bg-green-300"
                                  : "bg-green-500"
                            }`}
                            title={`${activity.date}: ${activity.count} activities`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <Badge className="text-xs">Current Streak: 3 days</Badge>
                <Badge className="ml-1 text-xs">Longest Streak: 8 days</Badge>
              </div>
            </CardContent>
          </div>

          <div className="flex-1">
            <CardHeader className="p-2">
              <CardTitle className="text-lg">Time Management</CardTitle>
              <CardDescription className="text-sm">Track your hours spent and saved</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-md font-semibold">Hours Spent</p>
                  <p className="text-xl">{hoursSpent}</p>
                </div>
                <div>
                  <p className="text-md font-semibold">Hours Saved</p>
                  <p className="text-xl">{hoursSaved}</p>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Time Distribution</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeManagementPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1000}
                          animationBegin={0}
                        >
                          {timeManagementPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                For every hour spent, you save 25 minutes.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4 sm:p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Current & Upcoming Courses</CardTitle>
            <CardDescription>Track your enrolled and in-progress courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          course.status === "In Progress"
                            ? "bg-yellow-500"
                            : course.status === "Completed"
                              ? "bg-green-500"
                              : "bg-blue-500"
                        }
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Learning Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Courses Completed: {learnerData.coursesCompleted}
            </p>
            <p className="text-sm text-gray-600">
              Total Study Hours: {learnerData.studyHours}
            </p>
            <h4 className="mt-4 font-semibold">Skills Proficiency</h4>
            {learnerData.skills.map((skill, idx) => (
              <div key={idx} className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill}</span>
                  <span>{Math.round(progressValues[idx] || 0)}%</span>
                </div>
                <Progress value={progressValues[idx] || 0} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 sm:p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {assignments.map((item, index) => (
              <div key={index} className="border-b py-3">
                <div className="flex justify-between">
                  <h4 className="text-md font-semibold">{item.title}</h4>
                  <Badge
                    className={
                      item.grade.startsWith("A")
                        ? "bg-green-500"
                        : item.grade.startsWith("B")
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }
                  >
                    {item.grade}
                  </Badge>
                </div>
                <p className="text-gray-600">Feedback: {item.feedback}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.map((task, index) => (
              <div key={index} className="border-b py-3 flex justify-between">
                <div>
                  <h4 className="text-md font-semibold">{task.title}</h4>
                  <p className="text-gray-600">Due: {task.dueDate}</p>
                </div>
                <Button variant="outline">Start</Button>
              </div>
            ))}
            <div className="mt-4">
              <Button className="w-full">View All Assignments</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}