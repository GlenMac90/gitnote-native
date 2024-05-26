import { ImageSourcePropType } from "react-native";
import icons from "./icons";

export const createTypesData: {
  title: "Component" | "Knowledge" | "Workflow";
  icon: ImageSourcePropType;
}[] = [
  {
    title: "Component",
    icon: icons.component,
  },
  {
    title: "Knowledge",
    icon: icons.knowledge,
  },
  {
    title: "Workflow",
    icon: icons.workflow,
  },
];
