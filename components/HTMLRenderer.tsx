import RenderHtml from "react-native-render-html";
import { View } from "react-native";

import { applyCodeStyles } from "@/utils";

const HTMLRenderer = ({ content }: { content: string }) => {
  return (
    <View className="w-full mt-6">
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
