import { GetPostsType } from "@/lib/appwrite";
import { ImageSourcePropType } from "react-native";

export type postType = "workflow" | "knowledge" | "component";

export type QuickLinkType = {
  id: number;
  title: string;
  image: ImageSourcePropType;
  path?: string;
};

export interface NavLinkProps {
  link: QuickLinkType;
  setIsOpen: (isOpen: boolean) => void;
}

export interface NavPostProps {
  link: PostType;
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
  id?: string;
  label: string;
  link: string;
};

export type CreateFormType = {
  steps: string[];
  title: string;
  type: postType;
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
  creatorId: string;
  createdAt: number;
  content: string;
  description: string;
  steps?: string[];
  tags?: string[];
  title: string;
  type: postType;
  resources: ResourceTypeExtended[];
};

export type UserType = {
  avatar: string;
  email: string;
  name: string;
  id: string;
  onboarded: boolean;
  onboardedLevel: number;
};

export interface GlobalContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserType | null;
  setUser: (value: any) => void;
  isLoading: boolean;
  posts: PostType[];
  setPosts: (value: PostType[]) => void;
}

export const defaultContext: GlobalContextProps = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  posts: [],
  setPosts: () => {},
};

export interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

type DropdownDataType = {
  title: string;
  icon: ImageSourcePropType;
};

export interface DropdownProps {
  title: string;
  data: DropdownDataType[];
  containerStyles?: string;
  setForm: React.Dispatch<React.SetStateAction<CreateFormType>>;
}

export interface FormFieldProps {
  textarea?: boolean;
  title?: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: any;
}

export interface AvatarPickerProps {
  form: ScreenOneProps;
  setForm: React.Dispatch<React.SetStateAction<ScreenOneProps>>;
}

export interface GoalProps {
  learningGoal?: boolean;
  title: string;
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface PickerProps {
  title: string;
  date: Date;
  setDate: (date: Date) => void;
  minimumDate: Date;
  maximumDate: Date;
  containerStyles?: any;
}

export interface RichTextEditorProps {
  content: string;
  setForm: React.Dispatch<React.SetStateAction<CreateFormType>>;
}

export interface useAppwriteProps {
  fn: AppwriteFunction;
  userId?: string;
}

type AppwriteFunction =
  | ((skip: number) => Promise<GetPostsType>)
  | ((userId: string, skip: number) => Promise<GetPostsType>);
