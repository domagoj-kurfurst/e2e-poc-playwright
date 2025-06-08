import { ApplicationCard } from "./application-card"

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

interface ApplicationListProps {
  applications: Application[]
  favorites: Set<string>
  onToggleFavorite: (appId: string) => void
}

export function ApplicationList({ applications, favorites, onToggleFavorite }: ApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          isFavorite={favorites.has(app.id)}
          onToggleFavorite={onToggleFavorite}
          viewMode="list"
        />
      ))}
    </div>
  )
}
