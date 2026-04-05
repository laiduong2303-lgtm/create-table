"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function SortIcon({ field, currentSortBy, currentSortOrder }: {
  field: string;
  currentSortBy: string | null;
  currentSortOrder: "asc" | "desc";
}) {
  if (currentSortBy !== field)
    return <ChevronUp className="inline w-4 h-4 opacity-30" />;
  return currentSortOrder === "asc" ? (
    <ChevronUp className="inline w-4 h-4" />
  ) : (
    <ChevronDown className="inline w-4 h-4" />
  );
}

interface UserTableHeaderProps {
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export function UserTableHeader({ sortBy, sortOrder, onSort }: UserTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("name")}>
          Name <SortIcon field="name" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("email")}>
          Email <SortIcon field="email" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("role")}>
          Role <SortIcon field="role" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("status")}>
          Status <SortIcon field="status" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("joinDate")}>
          Join Date <SortIcon field="joinDate" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => onSort("lastLogin")}>
          Last Login <SortIcon field="lastLogin" currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}