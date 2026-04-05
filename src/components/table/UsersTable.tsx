"use client";

import { useMemo, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "@/lib/api/users";
import { useTableStore } from "@/lib/stores/tableStore";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserForm } from "./UserForm";
import { UserTableHeader } from "./UserTableHeader";
import { UserTableRow } from "./UserTableRow";
import { PaginationControls } from "./PaginationControls";

const emptyUserForm = {
  name: "",
  email: "",
  role: "user" as "admin" | "user" | "editor",
  status: "active" as "active" | "inactive" | "pending",
  joinDate: new Date().toISOString().slice(0, 10),
  lastLogin: new Date().toISOString().slice(0, 10),
};

export function UsersTable() {
  const {
    pageIndex,
    pageSize,
    sortBy,
    sortOrder,
    searchTerm,
    roleFilter,
    statusFilter,
    setPageIndex,
    setSorting,
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    resetFilters,
  } = useTableStore();

  const { data, isLoading, error } = useUsers({
    pageIndex,
    pageSize,
    sortBy: sortBy || undefined,
    sortOrder,
    searchTerm,
    roleFilter,
    statusFilter,
  });

  const addUserMutation = useAddUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [editingId, setEditingId] = useState<string | null>(null);

  const isSubmitting =
    addUserMutation.isPending ||
    updateUserMutation.isPending ||
    deleteUserMutation.isPending;

  const queryData = data as unknown as {
    data: Array<{ id: string; name: string; email: string; role: string; status: string; joinDate: string; lastLogin: string; }>;
    total: number;
    pageIndex: number;
    pageSize: number;
  } | undefined;

  const totalPages = useMemo(() => {
    if (!queryData) return 0;
    return Math.max(1, Math.ceil(queryData.total / queryData.pageSize));
  }, [queryData]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSorting(field, sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSorting(field, "asc");
    }
  };

  const startEdit = (user: { id: string; name: string; email: string; role: string; status: string; joinDate: string; lastLogin: string; }) => {
    setEditingId(user.id);
  };

  const resetForm = () => {
    setEditingId(null);
  };

  const handleSubmit = (form: typeof emptyUserForm) => {
    if (editingId) {
      updateUserMutation.mutate({
        id: editingId,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
        joinDate: form.joinDate,
        lastLogin: form.lastLogin,
      });
    } else {
      addUserMutation.mutate({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
        joinDate: form.joinDate,
        lastLogin: form.lastLogin,
      });
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="w-full space-y-4">
      <UserForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        editingId={editingId}
        onCancel={resetForm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter || ""} onValueChange={(val) => setRoleFilter(val || null)}>
          <SelectTrigger><SelectValue placeholder="Filter by role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val || null)}>
          <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={resetFilters} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <UserTableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                </TableRow>
              ))
            ) : queryData?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No users found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              queryData?.data.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  isSubmitting={isSubmitting}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {error ? (
            <span className="text-red-600">Error loading users</span>
          ) : (
            <>
              Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, queryData?.total || 0)} of {queryData?.total || 0} results
            </>
          )}
        </div>
        <PaginationControls
          pageIndex={pageIndex}
          totalPages={totalPages}
          isLoading={isLoading}
          onPageChange={setPageIndex}
        />
      </div>
    </div>
  );
}
