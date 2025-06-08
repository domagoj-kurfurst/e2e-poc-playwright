"use client"

import { Button } from "@/components/ui/button"
import { Heart, Grid3X3, List, Moon, Sun, Tag } from "lucide-react"

interface ApplicationHeaderProps {
  showFavoritesOnly: boolean
  groupByTags: boolean
  viewMode: "grid" | "list"
  darkMode: boolean
  onToggleFavorites: (value: boolean) => void
  onToggleGroupByTags: (value: boolean) => void
  onToggleViewMode: () => void
  onToggleDarkMode: () => void
}

export function ApplicationHeader({
  showFavoritesOnly,
  groupByTags,
  viewMode,
  darkMode,
  onToggleFavorites,
  onToggleGroupByTags,
  onToggleViewMode,
  onToggleDarkMode,
}: ApplicationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Application Store</h1>
        <p className="text-muted-foreground">Discover and manage your favorite applications</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleFavorites(!showFavoritesOnly)}
        >
          <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
          Favorites
        </Button>
        <Button
          variant={groupByTags ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleGroupByTags(!groupByTags)}
          data-testid="group-by-tags-toggle"
        >
          <Tag className="h-4 w-4 mr-2" />
          Group by Tags
        </Button>
        <Button variant="outline" size="sm" onClick={onToggleViewMode}>
          {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="sm" onClick={onToggleDarkMode} data-testid="dark-mode-toggle">
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
