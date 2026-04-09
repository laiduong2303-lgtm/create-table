const roles = ["admin", "user", "editor"] as const;
const statuses = ["active", "inactive", "pending"] as const;

export type UserFormData = {
  name: string;
  email: string;
  role: (typeof roles)[number];
  status: (typeof statuses)[number];
  joinDate: string;
  lastLogin: string;
};

export type ValidationErrors = Partial<Record<keyof UserFormData, string>>;

function isValidDateString(value: string) {
  const date = new Date(value);
  return value.trim().length > 0 && !Number.isNaN(date.getTime());
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateUserForm(form: UserFormData) {
  const errors: ValidationErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = "Email must be valid.";
  }

  if (!isValidDateString(form.joinDate)) {
    errors.joinDate = "Join date is required and must be valid.";
  }

  if (!isValidDateString(form.lastLogin)) {
    errors.lastLogin = "Last login is required and must be valid.";
  }

  if (
    isValidDateString(form.joinDate) &&
    isValidDateString(form.lastLogin)
  ) {
    const join = new Date(form.joinDate);
    const last = new Date(form.lastLogin);

    if (last < join) {
      errors.lastLogin = "Last login cannot be before join date.";
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
