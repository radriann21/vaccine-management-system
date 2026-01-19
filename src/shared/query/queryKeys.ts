export const queryKeys = {
  session: {
    all: ["session"] as const,
    current: () => [...queryKeys.session.all, "current"] as const,
    user: () => [...queryKeys.session.all, "user"] as const,
  },
  ambulatories: {
    all: ["ambulatories"] as const,
    lists: () => [...queryKeys.ambulatories.all, "list"] as const,
    list: (filters?: unknown) => [...queryKeys.ambulatories.lists(), filters] as const,
    details: () => [...queryKeys.ambulatories.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.ambulatories.details(), id] as const,
  },
  lotes: {
    all: ["lotes"] as const,
    lists: () => [...queryKeys.lotes.all, "list"] as const,
    list: (filters?: unknown) => [...queryKeys.lotes.lists(), filters] as const,
    details: () => [...queryKeys.lotes.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.lotes.details(), id] as const,
  },
  vaccines: {
    all: ["vaccines"] as const,
    lists: () => [...queryKeys.vaccines.all, "list"] as const,
    list: (filters?: unknown) => [...queryKeys.vaccines.lists(), filters] as const,
    details: () => [...queryKeys.vaccines.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.vaccines.details(), id] as const,
  },
  transfers: {
    all: ["transfers"] as const,
    lists: () => [...queryKeys.transfers.all, "list"] as const,
    list: (filters?: unknown) => [...queryKeys.transfers.lists(), filters] as const,
    details: () => [...queryKeys.transfers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.transfers.details(), id] as const,
  },
} as const;
