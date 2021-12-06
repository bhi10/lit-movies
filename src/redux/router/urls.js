export const URLs = {
  pages: [
    {
      module: 'Home',
      name: 'home',
      pathPattern: '/home',
    },
    {
      module: 'Home',
      name: 'root',
      pathPattern: '/',
    },
    {
      module: 'Movies',
      name: 'movies',
      pathPattern: '/movies',
    },
    {
      module: 'Shows',
      name: 'shows',
      pathPattern: '/shows',
    },
    {
      module: 'NotFound',
      name: 'not-found',
      pathPattern: '/not-found'
    },
    {
      module: 'Movie',
      name: 'movie',
      pathPattern: '/movie/:id'
    },
    {
      module: 'NotFound',
      name: 'not-found',
      pathPattern: '/([0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12})?(.*)'
    }
  ],
}