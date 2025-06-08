"use client"

import { useState, useEffect } from "react"
import { ApplicationHeader } from "@/components/dashboard/application-header"
import { SearchAndFilters } from "@/components/dashboard/search-and-filters"
import { ApplicationGrid } from "@/components/dashboard/application-grid"
import { ApplicationList } from "@/components/dashboard/application-list"
import { TagGroupedView } from "@/components/dashboard/tag-grouped-view"
import { EmptyState } from "@/components/dashboard/empty-state"
import { useApplications } from "@/hooks/use-applications"
import { useDashboardPreferences } from "@/hooks/use-dashboard-preferences"

export default function ApplicationDashboard() {
  const { applications } = useApplications()
  const {
    favorites,
    viewMode,
    darkMode,
    showFavoritesOnly,
    groupByTags,
    toggleFavorite,
    setViewMode,
    setDarkMode,
    setShowFavoritesOnly,
    setGroupByTags,
  } = useDashboardPreferences()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const categories = ["All", ...Array.from(new Set(applications.map((app) => app.category)))]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory
    const matchesFavorites = !showFavoritesOnly || favorites.has(app.id)
    return matchesSearch && matchesCategory && matchesFavorites
  })

  const renderApplications = () => {
    if (groupByTags) {
      return (
        <TagGroupedView
          applications={filteredApplications}
          viewMode={viewMode}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )
    }

    if (viewMode === "list") {
      return (
        <ApplicationList applications={filteredApplications} favorites={favorites} onToggleFavorite={toggleFavorite} />
      )
    }

    return (
      <ApplicationGrid applications={filteredApplications} favorites={favorites} onToggleFavorite={toggleFavorite} />
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-6">
        <ApplicationHeader
          showFavoritesOnly={showFavoritesOnly}
          groupByTags={groupByTags}
          viewMode={viewMode}
          darkMode={darkMode}
          onToggleFavorites={setShowFavoritesOnly}
          onToggleGroupByTags={setGroupByTags}
          onToggleViewMode={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <SearchAndFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        {filteredApplications.length === 0 ? (
          <EmptyState showFavoritesOnly={showFavoritesOnly} />
        ) : (
          renderApplications()
        )}
      </div>
    </div>
  )
}
