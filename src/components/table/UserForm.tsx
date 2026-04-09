"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserFormData, validateUserForm } from "@/lib/validation/userValidation";

const emptyUserForm = {
  name: "",
  email: "",
  role: "user" as "admin" | "user" | "editor",
  status: "active" as "active" | "inactive" | "pending",
  joinDate: new Date().toISOString().slice(0, 10),
  lastLogin: new Date().toISOString().slice(0, 10),
};

interface UserFormProps {
  onSubmit: (form: UserFormData) => void;
  isSubmitting: boolean;
  editingId: string | null;
  editingUser: UserFormData | null;
  onCancel: () => void;
}

export function UserForm({ onSubmit, isSubmitting, editingId, editingUser, onCancel }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>(emptyUserForm);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      setForm(emptyUserForm);
    }
    setErrors({});
  }, [editingUser]);

  const handleChange = (key: keyof UserFormData, value: string | null) => {
    if (value === null) return;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateUserForm(form);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    onSubmit(form);
    setForm(emptyUserForm);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div>
        <Input placeholder="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>
      <div>
        <Input placeholder="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>
      <Select value={form.role} onValueChange={(val) => handleChange("role", val)}>
        <SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Role" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
        </SelectContent>
      </Select>
      <Select value={form.status} onValueChange={(val) => handleChange("status", val)}>
        <SelectTrigger className="w-full"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <div>
        <Input type="date" value={form.joinDate} onChange={(e) => handleChange("joinDate", e.target.value)} aria-label="Join date" max={today} />
        {errors.joinDate && <p className="mt-1 text-xs text-destructive">{errors.joinDate}</p>}
      </div>
      <div>
        <Input type="date" value={form.lastLogin} onChange={(e) => handleChange("lastLogin", e.target.value)} aria-label="Last login" min={form.joinDate} max={today} />
        {errors.lastLogin && <p className="mt-1 text-xs text-destructive">{errors.lastLogin}</p>}
      </div>
      <div className="sm:col-span-2 lg:col-span-1 flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting}>{editingId ? "Update User" : "Add User"}</Button>
        {editingId && <Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}