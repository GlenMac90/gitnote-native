import { CreateFormType } from "@/types";
import React, { useRef } from "react";
import { View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const RichTextEditor = ({
  content,
  setForm,
}: {
  content: string;
  setForm: React.Dispatch<React.SetStateAction<CreateFormType>>;
}) => {
  const richTextRef = useRef<RichEditor>(null);
  return (
    <>
      <View className="w-full flex-col mt-6">
        <RichToolbar
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.code,
          ]}
          getEditor={() => richTextRef.current}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "#2E3757",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
        />
        <RichEditor
          placeholder="Start typing here..."
          editorStyle={{
            backgroundColor: "#1D2032",
            color: "#adb3cc",
          }}
          ref={richTextRef}
          initialContentHTML={content}
          onChange={(text) => setForm((prev) => ({ ...prev, content: text }))}
        />
      </View>
    </>
  );
};

export default RichTextEditor;
