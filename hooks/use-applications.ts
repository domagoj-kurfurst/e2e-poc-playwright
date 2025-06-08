"use client"

import { useState } from "react"

interface Application {
  id: string
  name: string
  description: string
  category: string
  rating: number
  downloads: string
  icon: string
  featured: boolean
  tags: string[]
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "PhotoEditor Pro",
    description: "Professional photo editing with advanced filters and tools",
    category: "Photography",
    rating: 4.8,
    downloads: "2.5M",
    icon: "/icons/photo-editor.png",
    featured: true,
    tags: ["Photo", "Editor", "Professional"],
  },
  {
    id: "2",
    name: "TaskMaster",
    description: "Ultimate productivity app for managing tasks and projects",
    category: "Productivity",
    rating: 4.6,
    downloads: "1.8M",
    icon: "/icons/task-master.png",
    featured: false,
    tags: ["Tasks", "Productivity", "Organization"],
  },
  {
    id: "3",
    name: "MusicStream",
    description: "Stream millions of songs with high-quality audio",
    category: "Music",
    rating: 4.9,
    downloads: "5.2M",
    icon: "/icons/music-stream.png",
    featured: true,
    tags: ["Music", "Streaming", "Audio"],
  },
  {
    id: "4",
    name: "FitnessTracker",
    description: "Track your workouts, calories, and health metrics",
    category: "Health",
    rating: 4.5,
    downloads: "3.1M",
    icon: "/icons/fitness-tracker.png",
    featured: false,
    tags: ["Fitness", "Health", "Tracking"],
  },
  {
    id: "5",
    name: "CodeEditor",
    description: "Powerful code editor with syntax highlighting and debugging",
    category: "Development",
    rating: 4.7,
    downloads: "900K",
    icon: "/icons/code-editor.png",
    featured: true,
    tags: ["Code", "Development", "Programming"],
  },
  {
    id: "6",
    name: "WeatherApp",
    description: "Accurate weather forecasts and real-time updates",
    category: "Weather",
    rating: 4.4,
    downloads: "4.3M",
    icon: "/icons/weather-app.png",
    featured: false,
    tags: ["Weather", "Forecast", "Climate"],
  },
]

export function useApplications() {
  const [applications] = useState<Application[]>(mockApplications)

  return {
    applications,
  }
}
