import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockUsers, type User } from "@/lib/mock/users";

const STORAGE_KEY = "app-users";

const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return mockUsers;

  const item = window.localStorage.getItem(STORAGE_KEY);
  if (!item) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
    return [...mockUsers];
  }

  try {
    const parsed = JSON.parse(item) as User[];
    if (!Array.isArray(parsed)) throw new Error("Invalid users data");
    return parsed;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
    return [...mockUsers];
  }
};

const setStoredUsers = (users: User[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};

export interface FetchUsersParams {
  searchTerm?: string;
  roleFilter?: string | null;
  statusFilter?: string | null;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
  pageIndex?: number;
  pageSize?: number;
}

interface FetchUsersResponse {
  data: User[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export const fetchUsers = async (
  params: FetchUsersParams
): Promise<FetchUsersResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const users = getStoredUsers();
  let filteredUsers = [...users];

  if (params.searchTerm) {
    const term = params.searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  if (params.roleFilter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.role === params.roleFilter
    );
  }

  if (params.statusFilter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.status === params.statusFilter
    );
  }

  if (params.sortBy) {
    filteredUsers.sort((a, b) => {
      const aVal = a[params.sortBy as keyof User];
      const bVal = b[params.sortBy as keyof User];

      if (aVal < bVal) return params.sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return params.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const pageIndex = params.pageIndex || 0;
  const pageSize = params.pageSize || 10;
  const start = pageIndex * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

  return {
    data: paginatedUsers,
    total: filteredUsers.length,
    pageIndex,
    pageSize,
  };
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const users = getStoredUsers();
  const id = crypto?.randomUUID?.() ?? `${Date.now()}`;
  const newUser: User = { id, ...user };
  const updated = [newUser, ...users];
  setStoredUsers(updated);
  return newUser;
};

export const updateUser = async (user: User): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const users = getStoredUsers();
  const updated = users.map((entry) => (entry.id === user.id ? user : entry));
  setStoredUsers(updated);
  return user;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const users = getStoredUsers();
  setStoredUsers(users.filter((user) => user.id !== userId));
};

export const useUsers = (params: FetchUsersParams) => {
  return useQuery<FetchUsersResponse, Error>({
    queryKey: [
      "users",
      params.searchTerm,
      params.roleFilter,
      params.statusFilter,
      params.sortBy,
      params.sortOrder,
      params.pageIndex,
      params.pageSize,
    ],
    queryFn: () => fetchUsers(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

