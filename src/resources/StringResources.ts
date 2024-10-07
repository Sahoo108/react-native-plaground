const StringValues: Record<string, string> = {
  MovieExplorer: 'Movie Explorer',
  Search: 'Search',
  PopularMovies: 'Popular Movies',
  SearchMovie: 'Search for a movie...',
  NoMovie: 'No result with search query',
};

export const StringResources = (key: string) => {
  return StringValues[key] || '';
};
