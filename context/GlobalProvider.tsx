import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router } from "expo-router";

import { getCurrentUser } from "@/lib/appwrite";

interface GlobalContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: any;
  setUser: (value: any) => void;
  isLoading: boolean;
}

const defaultContext: GlobalContextProps = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
};

const GlobalContext = createContext<GlobalContextProps>(defaultContext);

export const useGlobalContext = () => useContext(GlobalContext);

type UserType = {
  avatar: string;
  email: string;
  name: string;
  id: string;
  onboarded: boolean;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
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

  useEffect(() => {
    if (user && user.onboarded === false) {
      router.replace("/onboarding");
    } else if (user && user.onboarded === true) {
      router.replace("/home");
    }
  }, [user]);

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
