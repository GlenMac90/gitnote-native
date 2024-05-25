import { ImageSourcePropType } from "react-native";

export type postType = "workflow" | "knowledge" | "component";

export interface NavLinkProps {
  link: {
    id: number;
    title: string;
    image?: ImageSourcePropType | undefined;
    type?: postType;
    path: string;
  };
  setIsOpen: (isOpen: boolean) => void;
}

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export interface ScreenOneProps {
  avatar: null | any;
  name: string;
  portfolio: string;
  id: string;
}

export interface OnboardingScreenProps {
  setOnboardedLevel: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
}

export type ResourceType = {
  label: string;
  link: string;
};

export type CreateFormType = {
  steps: string[];
  title: string;
  type: "component" | "knowledge" | "workflow";
  tags: string[];
  description: string;
  content: string;
  resources: ResourceType[];
};

export interface UserDataType {
  availability?: boolean;
  email?: string;
  avatar?: string;
  name?: string;
  goals?: string[];
  tags?: string[];
  knowledge?: string[];
  onboarded?: boolean;
  onboardedLevel?: number;
  portfolio?: string;
  startDate?: Date;
  endDate?: Date;
}

type ResourceTypeExtended = ResourceType & {
  id: string;
};

export type PostType = {
  id: string;
  createdAt: number;
  content: string;
  description: string;
  steps?: string[];
  tags?: string[];
  title: string;
  type: string;
  resources: ResourceTypeExtended[];
};

export type UserType = {
  avatar: string;
  email: string;
  name: string;
  id: string;
  onboarded: boolean;
};

export interface GlobalContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserType | null;
  setUser: (value: any) => void;
  isLoading: boolean;
}

export const defaultContext: GlobalContextProps = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
};
