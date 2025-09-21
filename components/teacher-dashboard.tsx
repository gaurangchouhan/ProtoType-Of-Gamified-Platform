"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, Users, BookOpen, Trophy, Calendar, TrendingUp, Clock, Star } from "lucide-react"

// Mock data for demonstration
const studentsData = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    grade: "A",
    progress: 85,
    gamesCompleted: 12,
    certificatesEarned: 3,
    lastActive: "2 hours ago",
    avatar: "/student-alice.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob_s",
    grade: "B+",
    progress: 72,
    gamesCompleted: 8,
    certificatesEarned: 2,
    lastActive: "1 day ago",
    avatar: "/student-bob.jpg",
  },
  {
    id: 3,
    name: "Carol Davis",
    username: "carol_d",
    grade: "A-",
    progress: 91,
    gamesCompleted: 15,
    certificatesEarned: 4,
    lastActive: "30 minutes ago",
    avatar: "/student-carol.jpg",
  },
]

const performanceData = [
  { month: "Jan", students: 45, completion: 78 },
  { month: "Feb", students: 52, completion: 82 },
  { month: "Mar", students: 48, completion: 85 },
  { month: "Apr", students: 61, completion: 88 },
  { month: "May", students: 55, completion: 92 },
  { month: "Jun", students: 67, completion: 89 },
]

const activityData = [
  { name: "AI Quiz", value: 35, color: "#3b82f6" },
  { name: "Eco Coder", value: 28, color: "#10b981" },
  { name: "Recipe Coder", value: 22, color: "#f59e0b" },
  { name: "Other Activities", value: 15, color: "#8b5cf6" },
]

export function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof studentsData)[0] | null>(null)

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              GramQuest Education
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/diverse-classroom-teacher.png" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">Ms. Teacher</p>
              <p className="text-muted-foreground">Grade 5 Educator</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-6">
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Students Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Progress Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Daily Activities
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">67</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-xs text-muted-foreground">+3% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">+28 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">63% of total students</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Student engagement and completion rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completion" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Distribution</CardTitle>
                    <CardDescription>Popular games and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={activityData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              {/* Student Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Lookup</CardTitle>
                  <CardDescription>Search and view individual student progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Button>Search</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Student List */}
              <div className="grid gap-4">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">@{student.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{student.grade}</Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">{student.progress}% Complete</p>
                            <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={student.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              {selectedStudent ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Report - {selectedStudent.name}</CardTitle>
                    <CardDescription>Detailed performance analytics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{selectedStudent.gamesCompleted}</div>
                        <p className="text-sm text-muted-foreground">Games Completed</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{selectedStudent.certificatesEarned}</div>
                        <p className="text-sm text-muted-foreground">Certificates Earned</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-chart-3">{selectedStudent.progress}%</div>
                        <p className="text-sm text-muted-foreground">Overall Progress</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recent Activities</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">Completed AI Quiz Level 3</span>
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            95%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">Earned Eco Coder Certificate</span>
                          <Badge variant="secondary">
                            <Trophy className="w-3 h-3 mr-1" />
                            Achievement
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Student</h3>
                    <p className="text-muted-foreground">
                      Choose a student from the Students tab to view their detailed progress report.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activities Overview</CardTitle>
                  <CardDescription>Track student engagement across different activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "AI Quiz Sessions",
                      "Eco Coder Challenges",
                      "Recipe Coder Projects",
                      "Certificate Completions",
                    ].map((activity, index) => (
                      <div key={activity} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{activity}</h4>
                          <p className="text-sm text-muted-foreground">
                            Active students: {Math.floor(Math.random() * 30) + 10}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{Math.floor(Math.random() * 50) + 20}%</div>
                          <p className="text-xs text-muted-foreground">Completion rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
