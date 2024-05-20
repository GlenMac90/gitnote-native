import React, { createContext, useContext, useState, useEffect } from "react";

import { getCurrentUser } from "@/lib/appwrite";

interface GlobalContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: any;
  setUser: (value: any) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);

type UserType = {
  avatar: string;
  email: string;
  name: string;
  id: string;
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          console.log(currentUser);
          setIsLoggedIn(true);
          setUser(currentUser);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
