import { View } from "react-native";
import RenderHtml from "react-native-render-html";

const HTMLRenderer = ({ content }: { content: string }) => {
  return (
    <View className="w-full mt-6">
      <RenderHtml
        contentWidth={100}
        source={{
          html: `<div style="color: white;">${content}</div>`,
        }}
      />
    </View>
  );
};

export default HTMLRenderer;
