import { FormFieldProps } from "@/types";
import { View, Text, TextInput } from "react-native";

const FormField = ({
  textarea,
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 flex-col ${otherStyles}`}>
      {title && (
        <Text className="text-sm text-white-300 font-imedium">{title}</Text>
      )}
      <View
        className={`w-full ${textarea ? "min-h-[96px] px-3 py-1" : "h-11 justify-center p-3"}   bg-black-700 rounded focus:border-secondary`}
      >
        <TextInput
          multiline={textarea}
          className="w-full text-white-300 font-psemibold text-sm"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#ADB3CC"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password"}
        />
      </View>
    </View>
  );
};

export default FormField;
