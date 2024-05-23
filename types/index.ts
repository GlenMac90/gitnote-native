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

export type CreateFormType = {
  steps: string[];
  title: string;
  type: "component" | "knowledge" | "workflow";
  tags: string[];
  description: string;
  content: string;
};
