"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserRole = "student" | "teacher" | "parent"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  level: number
  xp: number
  streak?: number
  rank?: number
  subjects?: {
    [key: string]: {
      progress: number
    }
  }
  achievements?: Array<{
    id: number
    name: string
    icon: string
    date: string
  }>
  // Teacher-specific fields
  teacherInfo?: {
    grade: string
    subject: string
    studentsCount: number
  }
  // Parent-specific fields
  parentInfo?: {
    children: Array<{
      id: string
      name: string
      username: string
      age: number
    }>
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, name?: string, role?: UserRole) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const mockUsers = [
  {
    id: "1",
    email: "student@gramquest.com",
    password: "password123",
    name: "Arjun Kumar",
    role: "student" as UserRole,
    level: 5,
    xp: 1250,
    streak: 12,
    rank: 3,
    subjects: {
      Mathematics: { progress: 78 },
      Science: { progress: 65 },
      English: { progress: 82 },
      Coding: { progress: 45 },
    },
    achievements: [
      { id: 1, name: "Math Master", icon: "🧮", date: "2 days ago" },
      { id: 2, name: "Code Warrior", icon: "💻", date: "1 week ago" },
      { id: 3, name: "Science Explorer", icon: "🔬", date: "2 weeks ago" },
    ],
  },
  {
    id: "2",
    email: "demo@gramquest.com",
    password: "demo123",
    name: "Priya Sharma",
    role: "student" as UserRole,
    level: 3,
    xp: 750,
    streak: 7,
    rank: 8,
    subjects: {
      Mathematics: { progress: 45 },
      Science: { progress: 38 },
      English: { progress: 67 },
      Coding: { progress: 23 },
    },
    achievements: [
      { id: 1, name: "First Steps", icon: "👶", date: "1 week ago" },
      { id: 2, name: "Quick Learner", icon: "⚡", date: "3 days ago" },
    ],
  },
  {
    id: "3",
    email: "teacher@gramquest.com",
    password: "teacher123",
    name: "Ms. Sunita Teacher",
    role: "teacher" as UserRole,
    level: 10,
    xp: 5000,
    teacherInfo: {
      grade: "Grade 5",
      subject: "Mathematics & Science",
      studentsCount: 67,
    },
  },
  {
    id: "4",
    email: "parent@gramquest.com",
    password: "parent123",
    name: "Sarah Wilson",
    role: "parent" as UserRole,
    level: 1,
    xp: 0,
    parentInfo: {
      children: [
        { id: "child1", name: "Emma Wilson", username: "emma_w", age: 10 },
        { id: "child2", name: "Liam Wilson", username: "liam_w", age: 8 },
      ],
    },
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string, name?: string, role: UserRole = "student") => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user exists (login) or create new user (signup)
        const user = mockUsers.find((u) => u.email === email)

        if (user && user.password === password) {
          // Existing user login
          const { password: _, ...userWithoutPassword } = user
          set({
            user: { ...userWithoutPassword, avatar: "👤" },
            isAuthenticated: true,
          })
          return true
        } else if (name) {
          // New user signup
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role,
            level: 1,
            xp: 0,
            streak: 0,
            rank: 10,
            avatar: "👤",
            subjects:
              role === "student"
                ? {
                    Mathematics: { progress: 0 },
                    Science: { progress: 0 },
                    English: { progress: 0 },
                    Coding: { progress: 0 },
                  }
                : undefined,
            achievements: role === "student" ? [] : undefined,
            teacherInfo:
              role === "teacher"
                ? {
                    grade: "Grade 1",
                    subject: "General",
                    studentsCount: 0,
                  }
                : undefined,
            parentInfo:
              role === "parent"
                ? {
                    children: [],
                  }
                : undefined,
          }
          set({ user: newUser, isAuthenticated: true })
          return true
        }

        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: "gramquest-auth",
    },
  ),
)

export const getRoleBasedDashboard = (role: UserRole) => {
  switch (role) {
    case "teacher":
      return "/teacher"
    case "parent":
      return "/parent"
    case "student":
    default:
      return "/dashboard"
  }
}
