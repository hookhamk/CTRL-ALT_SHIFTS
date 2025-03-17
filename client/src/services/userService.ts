import { GET_CURRENT_USER } from "./queries";
import { useQuery } from "@apollo/client";

export interface User {
  id: string;
  name: string;
  email: string;
  access: boolean;  
}

const getUserFromLocalStorage = (): User => {
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
    isAdmin: user.access = true,
    loading,
    error,
  };
};
