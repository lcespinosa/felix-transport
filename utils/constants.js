const CONSTANTS = {
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
  },
  USERS: [
    {
      email: 'admin@felix.ca',
      role: 'admin',
      route: '-',
    },
    {
      email: 'nestor@felix.ca',
      role: 'user',
      route: 'M1',
    },
    {
      email: 'm6@felix.ca',
      role: 'user',
      route: 'M6',
    },
    {
      email: 'salvador@felix.ca',
      role: 'user',
      route: 'S4',
    },
  ]
};

export default Object.freeze(CONSTANTS);