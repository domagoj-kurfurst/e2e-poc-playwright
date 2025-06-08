"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Download, Star, Shield, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

interface ApplicationDetail {
  id: string
  name: string
  description: string
  longDescription: string
  category: string
  rating: number
  downloads: string
  icon: string
  featured: boolean
  tags: string[]
  version: string
  size: string
  developer: string
  releaseDate: string
  screenshots: string[]
  features: string[]
  requirements: string[]
  reviews: {
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }[]
}

const mockApplicationDetails: { [key: string]: ApplicationDetail } = {
  "1": {
    id: "1",
    name: "PhotoEditor Pro",
    description: "Professional photo editing with advanced filters and tools",
    longDescription:
      "PhotoEditor Pro is the ultimate photo editing application for professionals and enthusiasts alike. With over 100 advanced filters, AI-powered enhancement tools, and professional-grade editing capabilities, you can transform your photos into stunning masterpieces. Whether you're a social media influencer, professional photographer, or just someone who loves taking great photos, PhotoEditor Pro has everything you need.",
    category: "Photography",
    rating: 4.8,
    downloads: "2.5M",
    icon: "/icons/photo-editor.png",
    featured: true,
    tags: ["Photo", "Editor", "Professional", "AI", "Filters"],
    version: "3.2.1",
    size: "45.2 MB",
    developer: "Creative Studios Inc.",
    releaseDate: "2024-01-15",
    screenshots: [
      "/screenshots/photo-editor-1.png",
      "/screenshots/photo-editor-2.png",
      "/screenshots/photo-editor-3.png",
    ],
    features: [
      "100+ Professional Filters",
      "AI-Powered Auto Enhancement",
      "RAW Image Support",
      "Batch Processing",
      "Cloud Sync",
      "Advanced Color Correction",
      "Layer Support",
      "Export in Multiple Formats",
    ],
    requirements: ["iOS 14.0 or later", "Android 8.0 or later", "2GB RAM minimum", "500MB free storage"],
    reviews: [
      {
        id: "1",
        user: "Sarah Johnson",
        rating: 5,
        comment: "Amazing app! The AI enhancement feature is incredible and saves me so much time.",
        date: "2024-01-20",
      },
      {
        id: "2",
        user: "Mike Chen",
        rating: 4,
        comment: "Great features but could use better organization of filters. Overall very satisfied.",
        date: "2024-01-18",
      },
    ],
  },
  "2": {
    id: "2",
    name: "TaskMaster",
    description: "Ultimate productivity app for managing tasks and projects",
    longDescription:
      "TaskMaster revolutionizes the way you manage your tasks and projects. With intelligent scheduling, team collaboration features, and powerful analytics, you can boost your productivity like never before. Perfect for individuals, teams, and organizations of all sizes.",
    category: "Productivity",
    rating: 4.6,
    downloads: "1.8M",
    icon: "/icons/task-master.png",
    featured: false,
    tags: ["Tasks", "Productivity", "Organization", "Teams", "Planning"],
    version: "2.8.0",
    size: "32.1 MB",
    developer: "Productivity Labs",
    releaseDate: "2024-01-10",
    screenshots: ["/screenshots/task-master-1.png", "/screenshots/task-master-2.png", "/screenshots/task-master-3.png"],
    features: [
      "Smart Task Scheduling",
      "Team Collaboration",
      "Project Templates",
      "Time Tracking",
      "Progress Analytics",
      "Calendar Integration",
      "Offline Mode",
      "Custom Workflows",
    ],
    requirements: ["iOS 13.0 or later", "Android 7.0 or later", "1GB RAM minimum", "200MB free storage"],
    reviews: [
      {
        id: "1",
        user: "David Wilson",
        rating: 5,
        comment: "Best productivity app I've ever used. The team features are fantastic!",
        date: "2024-01-22",
      },
      {
        id: "2",
        user: "Emma Davis",
        rating: 4,
        comment: "Love the interface and features. Would like to see more customization options.",
        date: "2024-01-19",
      },
    ],
  },
}

export default function ApplicationDetail() {
  const params = useParams()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [darkMode, setDarkMode] = useState(false)

  const appId = params.id as string
  const app = mockApplicationDetails[appId]

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    const savedDarkMode = localStorage.getItem("darkMode")

    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
      if (JSON.parse(savedDarkMode)) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const toggleFavorite = (appId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(appId)) {
      newFavorites.delete(appId)
    } else {
      newFavorites.add(appId)
    }
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(Array.from(newFavorites)))
  }

  if (!app) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.has(app.id)

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
        </div>

        {/* App Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={app.icon || "/placeholder.svg"}
                alt={app.name}
                width={128}
                height={128}
                className="rounded-2xl"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{app.name}</h1>
                    <p className="text-muted-foreground mb-3">{app.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{app.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{app.downloads} downloads</span>
                      </div>
                      <Badge variant="secondary">{app.category}</Badge>
                      {app.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {app.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toggleFavorite(app.id)} data-testid="favorite-button">
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} data-testid="heart-icon"/>
                      {isFavorite ? "Favorited" : "Add to Favorites"}
                    </Button>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Install
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Screenshots */}
            <Card>
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.screenshots.map((screenshot, index) => (
                    <Image
                      key={index}
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      width={600}
                      height={400}
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this app</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{app.longDescription}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {app.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* App Info */}
            <Card>
              <CardHeader>
                <CardTitle>App Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <span className="text-sm font-medium">{app.version}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Size</span>
                  <span className="text-sm font-medium">{app.size}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Developer</span>
                  <span className="text-sm font-medium">{app.developer}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Released</span>
                  <span className="text-sm font-medium">{app.releaseDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {app.requirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Safety & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>No ads or tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Data encrypted in transit</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Regular security updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
