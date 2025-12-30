export const roleGuard = (user: any, roles: string[]) => {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
};
