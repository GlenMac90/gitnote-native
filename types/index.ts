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
}
