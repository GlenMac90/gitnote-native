import RenderHtml from "react-native-render-html";
import { View } from "react-native";

import { applyCodeStyles } from "@/utils";

const HTMLRenderer = ({
  content,
  containerStyles,
}: {
  content: string;
  containerStyles?: string;
}) => {
  return (
    <View className={`${containerStyles} w-full`}>
      <RenderHtml
        contentWidth={100}
        source={{
          html: applyCodeStyles(`<div style="color: white;">${content}</div>`),
        }}
      />
    </View>
  );
};

export default HTMLRenderer;
