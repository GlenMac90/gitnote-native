import { useState, useEffect } from "react";
import { View, TextInput, Image } from "react-native";

import icons from "@/constants/icons";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeText = (text: string) => {
    setSearchValue(text);
  };

  const handleSearch = () => {
    console.log("Search for:", searchValue);
  };

  useEffect(() => {
    if (searchValue.length === 0) return;
    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <View className="mt-4 w-full rounded bg-black-700 flex-row space-x-1 p-2.5 items-center focus:border-white-500 border border-black-700">
      <Image
        source={icons.search}
        resizeMode="contain"
        className="w-2.5 h-2.5"
      />
      <TextInput
        placeholder="Search..."
        className="w-full text-white-300 text-xs font-ibold"
        value={searchValue}
        placeholderTextColor={"#55597D"}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

export default SearchInput;
