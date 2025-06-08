interface EmptyStateProps {
  showFavoritesOnly: boolean
}

export function EmptyState({ showFavoritesOnly }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">
        {showFavoritesOnly
          ? "No favorite applications found matching your criteria."
          : "No applications found matching your criteria."}
      </p>
    </div>
  )
}
