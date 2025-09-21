"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Search, Heart, BookOpen, Trophy, Calendar, TrendingUp, Clock, Star, Target } from "lucide-react"

// Mock data for parent dashboard
const childrenData = [
  {
    id: 1,
    name: "Emma Wilson",
    username: "emma_w",
    age: 10,
    grade: "A",
    progress: 88,
    gamesCompleted: 14,
    certificatesEarned: 4,
    lastActive: "1 hour ago",
    avatar: "/child-emma.jpg",
    weeklyProgress: [
      { day: "Mon", progress: 20 },
      { day: "Tue", progress: 35 },
      { day: "Wed", progress: 45 },
      { day: "Thu", progress: 60 },
      { day: "Fri", progress: 75 },
      { day: "Sat", progress: 85 },
      { day: "Sun", progress: 88 },
    ],
  },
  {
    id: 2,
    name: "Liam Wilson",
    username: "liam_w",
    age: 8,
    grade: "B+",
    progress: 76,
    gamesCompleted: 10,
    certificatesEarned: 2,
    lastActive: "3 hours ago",
    avatar: "/child-liam.jpg",
    weeklyProgress: [
      { day: "Mon", progress: 15 },
      { day: "Tue", progress: 28 },
      { day: "Wed", progress: 40 },
      { day: "Thu", progress: 52 },
      { day: "Fri", progress: 65 },
      { day: "Sat", progress: 72 },
      { day: "Sun", progress: 76 },
    ],
  },
]

const activityData = [
  { activity: "AI Quiz", emma: 8, liam: 6 },
  { activity: "Eco Coder", emma: 4, liam: 3 },
  { activity: "Recipe Coder", emma: 2, liam: 1 },
  { activity: "Certificates", emma: 4, liam: 2 },
]

export function ParentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChild, setSelectedChild] = useState<(typeof childrenData)[0] | null>(childrenData[0])

  const filteredChildren = childrenData.filter(
    (child) =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">Parent Dashboard</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              GramQuest Family
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/loving-parent.png" />
              <AvatarFallback>PW</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">Sarah Wilson</p>
              <p className="text-muted-foreground">Parent Account</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-6">
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              My Children
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
            <Button variant="ghost" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Goals & Rewards
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="children">My Children</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Family Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Children</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{childrenData.length}</div>
                    <p className="text-xs text-muted-foreground">Active learners</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(childrenData.reduce((acc, child) => acc + child.progress, 0) / childrenData.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Family average</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {childrenData.reduce((acc, child) => acc + child.certificatesEarned, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">Earned this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {childrenData.filter((child) => child.lastActive.includes("hour")).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Children online</p>
                  </CardContent>
                </Card>
              </div>

              {/* Children Overview */}
              <div className="grid gap-4 md:grid-cols-2">
                {childrenData.map((child) => (
                  <Card key={child.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={child.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {child.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{child.name}</CardTitle>
                          <CardDescription>
                            Age {child.age} • Grade {child.grade}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>{child.progress}%</span>
                        </div>
                        <Progress value={child.progress} className="h-2" />
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">{child.gamesCompleted}</div>
                          <p className="text-xs text-muted-foreground">Games</p>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent">{child.certificatesEarned}</div>
                          <p className="text-xs text-muted-foreground">Certificates</p>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-chart-3">{child.lastActive}</div>
                          <p className="text-xs text-muted-foreground">Last active</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Activity Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Children Activity Comparison</CardTitle>
                  <CardDescription>Compare your children's engagement across different activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="activity" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="emma" fill="#3b82f6" name="Emma" />
                      <Bar dataKey="liam" fill="#10b981" name="Liam" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="children" className="space-y-6">
              {/* Child Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Child Lookup</CardTitle>
                  <CardDescription>Search and select a child to view detailed information</CardDescription>
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

              {/* Children List */}
              <div className="grid gap-4">
                {filteredChildren.map((child) => (
                  <Card
                    key={child.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedChild(child)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={child.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {child.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{child.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              @{child.username} • Age {child.age}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{child.grade}</Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">{child.progress}% Complete</p>
                            <p className="text-xs text-muted-foreground">{child.lastActive}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={child.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              {selectedChild ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Report - {selectedChild.name}</CardTitle>
                      <CardDescription>Detailed learning analytics and achievements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{selectedChild.gamesCompleted}</div>
                          <p className="text-sm text-muted-foreground">Games Completed</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{selectedChild.certificatesEarned}</div>
                          <p className="text-sm text-muted-foreground">Certificates Earned</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-chart-3">{selectedChild.progress}%</div>
                          <p className="text-sm text-muted-foreground">Overall Progress</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-chart-4">A</div>
                          <p className="text-sm text-muted-foreground">Current Grade</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Progress Trend</CardTitle>
                      <CardDescription>Track your child's daily learning progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedChild.weeklyProgress}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                      <CardDescription>Latest accomplishments and milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-5 w-5 text-accent" />
                            <span className="text-sm">Completed AI Quiz Master Level</span>
                          </div>
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            98%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="text-sm">Earned Eco Coder Certificate</span>
                          </div>
                          <Badge variant="secondary">
                            <Trophy className="w-3 h-3 mr-1" />
                            Certificate
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Target className="h-5 w-5 text-chart-3" />
                            <span className="text-sm">Reached 7-day learning streak</span>
                          </div>
                          <Badge variant="secondary">
                            <Calendar className="w-3 h-3 mr-1" />
                            Streak
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Child</h3>
                    <p className="text-muted-foreground">
                      Choose one of your children from the My Children tab to view their detailed progress report.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activities Summary</CardTitle>
                  <CardDescription>Overview of your children's daily learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { activity: "Morning Learning Session", time: "9:00 AM - 10:30 AM", participants: "Emma, Liam" },
                      { activity: "AI Quiz Challenge", time: "2:00 PM - 2:45 PM", participants: "Emma" },
                      { activity: "Eco Coder Project", time: "4:00 PM - 5:00 PM", participants: "Liam" },
                      { activity: "Certificate Review", time: "7:00 PM - 7:30 PM", participants: "Emma, Liam" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.activity}</h4>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.participants}</p>
                          <p className="text-xs text-muted-foreground">Participants</p>
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
