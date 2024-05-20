import { View, Text, TextInput } from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: any;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 flex-col ${otherStyles}`}>
      <Text className="text-sm text-white-300 font-imedium">{title}</Text>
      <View className="w-full h-11 p-3 bg-black-700 rounded focus:border-secondary justify-center">
        <TextInput
          className="flex-1 w-full text-white-300 font-psemibold text-sm"
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
