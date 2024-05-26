import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router } from "expo-router";

import { getCurrentUser } from "@/lib/appwrite";
import {
  GlobalContextProps,
  PostType,
  UserType,
  defaultContext,
} from "@/types";

const GlobalContext = createContext<GlobalContextProps>(defaultContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

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
        posts,
        setPosts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
