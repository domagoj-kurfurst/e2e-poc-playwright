"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

interface ApplicationCardProps {
  app: Application
  isFavorite: boolean
  onToggleFavorite: (appId: string) => void
  viewMode?: "grid" | "list"
}

export function ApplicationCard({ app, isFavorite, onToggleFavorite, viewMode = "grid" }: ApplicationCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200" data-testid="app-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Image src={app.icon || "/placeholder.svg"} alt={app.name} width={48} height={48} className="rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <Link href={`/app/${app.id}`} className="hover:underline">
                  <h3 className="font-semibold text-lg truncate" data-testid="app-name">{app.name}</h3>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(app.id)} className="ml-2" data-testid="favorite-button">
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}  data-testid="heart-icon"/>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground truncate">{app.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary">{app.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{app.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{app.downloads} downloads</span>
                {app.featured && <Badge variant="default">Featured</Badge>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group" data-testid="app-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Image src={app.icon || "/placeholder.svg"} alt={app.name} width={64} height={64} className="rounded-lg" />
          <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(app.id)} data-testid="favorite-button">
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} data-testid="heart-icon" />
          </Button>
        </div>
        <div>
          <Link href={`/app/${app.id}`} className="hover:underline">
            <CardTitle className="text-lg group-hover:text-primary transition-colors" data-testid="app-name">{app.name}</CardTitle>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {app.category}
            </Badge>
            {app.featured && (
              <Badge variant="default" className="text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{app.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{app.rating}</span>
          </div>
          <span className="text-muted-foreground">{app.downloads}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {app.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
