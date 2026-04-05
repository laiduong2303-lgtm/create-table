import { create } from "zustand";

export interface TableState {
  // Pagination
  pageIndex: number;
  pageSize: number;
  
  // Sorting
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  
  // Filtering
  searchTerm: string;
  roleFilter: string | null;
  statusFilter: string | null;
  
  // Actions
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  setSorting: (sortBy: string | null, order: "asc" | "desc") => void;
  setSearchTerm: (term: string) => void;
  setRoleFilter: (role: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  resetFilters: () => void;
}

export const useTableStore = create<TableState>((set) => ({
  pageIndex: 0,
  pageSize: 5,
  sortBy: null,
  sortOrder: "asc",
  searchTerm: "",
  roleFilter: null,
  statusFilter: null,
  
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setSearchTerm: (searchTerm) => set({ searchTerm, pageIndex: 0 }),
  setRoleFilter: (roleFilter) => set({ roleFilter, pageIndex: 0 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, pageIndex: 0 }),
  resetFilters: () =>
    set({
      searchTerm: "",
      roleFilter: null,
      statusFilter: null,
      sortBy: null,
      sortOrder: "asc",
      pageIndex: 0,
    }),
}));
