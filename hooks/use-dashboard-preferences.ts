"use client"

import { useState, useEffect } from "react"

export function useDashboardPreferences() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [darkMode, setDarkMode] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [groupByTags, setGroupByTags] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    const savedViewMode = localStorage.getItem("viewMode")
    const savedDarkMode = localStorage.getItem("darkMode")

    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
    if (savedViewMode) {
      setViewMode(savedViewMode as "grid" | "list")
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode)
  }, [viewMode])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const toggleFavorite = (appId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(appId)) {
      newFavorites.delete(appId)
    } else {
      newFavorites.add(appId)
    }
    setFavorites(newFavorites)
  }

  return {
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
  }
}
