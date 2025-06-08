import { Badge } from "@/components/ui/badge"
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

interface TagGroupedViewProps {
  applications: Application[]
  viewMode: "grid" | "list"
  favorites: Set<string>
  onToggleFavorite: (appId: string) => void
}

export function TagGroupedView({ applications, viewMode, favorites, onToggleFavorite }: TagGroupedViewProps) {
  const groupedByTags = () => {
    const tagGroups: { [key: string]: Application[] } = {}

    applications.forEach((app) => {
      app.tags.forEach((tag) => {
        if (!tagGroups[tag]) {
          tagGroups[tag] = []
        }
        if (!tagGroups[tag].find((existingApp) => existingApp.id === app.id)) {
          tagGroups[tag].push(app)
        }
      })
    })

    return tagGroups
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedByTags()).map(([tag, apps]) => (
        <div key={tag}>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default" className="text-sm px-3 py-1">
              {tag}
            </Badge>
            <span className="text-sm text-muted-foreground">({apps.length} apps)</span>
          </div>
          <div
            className={`${
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }`}
          >
            {apps.map((app) => (
              <ApplicationCard
                key={`${tag}-${app.id}`}
                app={app}
                isFavorite={favorites.has(app.id)}
                onToggleFavorite={onToggleFavorite}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
