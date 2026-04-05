"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";

const statusColorMap = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const roleColorMap = {
  admin: "bg-purple-100 text-purple-800",
  user: "bg-blue-100 text-blue-800",
  editor: "bg-indigo-100 text-indigo-800",
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastLogin: string;
}

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isSubmitting: boolean;
}

export function UserTableRow({ user, onEdit, onDelete, isSubmitting }: UserTableRowProps) {
  const router = useRouter();

  const handleNameClick = () => {
    router.goToUserDetail(user.id);
  };

  return (
    <TableRow key={user.id} className="hover:bg-gray-50">
      <TableCell className="font-medium">
        <button
          onClick={handleNameClick}
          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          {user.name}
        </button>
      </TableCell>
      <TableCell className="text-gray-600">{user.email}</TableCell>
      <TableCell>
        <Badge className={roleColorMap[user.role as keyof typeof roleColorMap]}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={statusColorMap[user.status as keyof typeof statusColorMap]}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-600">{user.joinDate}</TableCell>
      <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
      <TableCell className="space-x-2">
        <Button size="xs" variant="outline" onClick={() => onEdit(user)} disabled={isSubmitting}>
          Edit
        </Button>
        <Button size="xs" variant="destructive" onClick={() => onDelete(user.id)} disabled={isSubmitting}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}