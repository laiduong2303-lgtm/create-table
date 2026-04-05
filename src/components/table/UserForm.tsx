"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const emptyUserForm = {
  name: "",
  email: "",
  role: "user" as "admin" | "user" | "editor",
  status: "active" as "active" | "inactive" | "pending",
  joinDate: new Date().toISOString().slice(0, 10),
  lastLogin: new Date().toISOString().slice(0, 10),
};

interface UserFormProps {
  onSubmit: (form: typeof emptyUserForm) => void;
  isSubmitting: boolean;
  editingId: string | null;
  onCancel: () => void;
}

export function UserForm({ onSubmit, isSubmitting, editingId, onCancel }: UserFormProps) {
  const [form, setForm] = useState(emptyUserForm);

  const handleChange = (key: keyof typeof form, value: string | null) => {
    if (value === null) return;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSubmit(form);
    setForm(emptyUserForm);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <Input placeholder="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
      <Input placeholder="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
      <Select value={form.role} onValueChange={(val) => handleChange("role", val)}>
        <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
        </SelectContent>
      </Select>
      <Select value={form.status} onValueChange={(val) => handleChange("status", val)}>
        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Input type="date" value={form.joinDate} onChange={(e) => handleChange("joinDate", e.target.value)} aria-label="Join date" />
      <Input type="date" value={form.lastLogin} onChange={(e) => handleChange("lastLogin", e.target.value)} aria-label="Last login" />
      <div className="sm:col-span-2 lg:col-span-1 flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting}>{editingId ? "Update User" : "Add User"}</Button>
        {editingId && <Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}