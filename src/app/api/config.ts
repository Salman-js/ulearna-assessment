// Edge runtime configuration for API routes
export const edgeConfig = {
  runtime: 'edge' as const,
  dynamic: 'force-dynamic' as const,
  preferredRegion: 'auto' as const,
};
