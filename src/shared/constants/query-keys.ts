const queryKeys = {
  customers: {
    all: (skip: number, take: number, name: string) => [
      'customers',
      skip,
      take,
      name,
    ],
    details: (userId: number) => ['users', userId],
  },
  users: {
    me: () => ['users', 'me'],
  },
  // Outras entidades/queries...
};

export { queryKeys };
