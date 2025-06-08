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

interface ApplicationGridProps {
  applications: Application[]
  favorites: Set<string>
  onToggleFavorite: (appId: string) => void
}

export function ApplicationGrid({ applications, favorites, onToggleFavorite }: ApplicationGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          isFavorite={favorites.has(app.id)}
          onToggleFavorite={onToggleFavorite}
          viewMode="grid"
        />
      ))}
    </div>
  )
}
