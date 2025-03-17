import { GET_CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Customer";
  permissions?: string[];  // Only for Admins
  purchaseHistory?: string[];  // Only for Customers
}

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const setUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const useUserService = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (!loading && data?.getCurrentUser) {
    setUserToLocalStorage(data.getCurrentUser);
  }

  const user = getUserFromLocalStorage();

  return {
    user,
    isAdmin: user?.role === "Admin",
    isCustomer: user?.role === "Customer",
    hasPermission: (permission: string) => user?.permissions?.includes(permission) ?? false,
    loading,
    error,
  };
};
