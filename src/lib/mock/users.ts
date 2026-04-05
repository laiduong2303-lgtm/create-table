export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "editor";
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastLogin: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-04-01",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-20",
    lastLogin: "2024-03-30",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "editor",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-04-02",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2023-11-05",
    lastLogin: "2024-02-15",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "editor",
    status: "active",
    joinDate: "2024-03-12",
    lastLogin: "2024-04-02",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@example.com",
    role: "user",
    status: "pending",
    joinDate: "2024-04-01",
    lastLogin: "2024-04-01",
  },
  {
    id: "7",
    name: "Grace Wilson",
    email: "grace@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-05",
    lastLogin: "2024-04-02",
  },
  {
    id: "8",
    name: "Henry Moore",
    email: "henry@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-28",
    lastLogin: "2024-04-01",
  },
  {
    id: "9",
    name: "Ivy Taylor",
    email: "ivy@example.com",
    role: "editor",
    status: "inactive",
    joinDate: "2023-12-20",
    lastLogin: "2024-03-10",
  },
  {
    id: "10",
    name: "Jack Anderson",
    email: "jack@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-03-01",
    lastLogin: "2024-04-02",
  },
];
