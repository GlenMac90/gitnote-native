import { useState } from "react";
import { View, Text, Image, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import pics from "@/constants/pics";
import NavBarModalContent from "./NavBarModalContent";

const NavBarModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <Image
          source={icons.burger}
          resizeMode="cover"
          className="w-[30px] h-[30px]"
        />
      </Pressable>
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={() => setIsOpen(!isOpen)}
      >
        <SafeAreaView className="h-full w-full">
          <Pressable
            className="h-full w-full items-end"
            onPress={() => setIsOpen(!isOpen)}
          >
            {/* Modal Content */}
            <Pressable className="bg-black-800 h-full w-3/4 right-0 flex-col px-5 py-8 mt-3">
              <View className="flex-col w-full">
                <View className="w-full flex-row justify-between">
                  <View className="gap-1.5 flex-row">
                    <Image
                      source={pics.dummyImage}
                      resizeMode="cover"
                      className="w-9 h-9"
                    />
                    <View className="flex-col">
                      <Text className="text-white-100 font-imedium text-sm">
                        Glen McCallum
                      </Text>
                      <Text className="text-white-300 font-iregular text-xs">
                        glen.mccallum@live.co.uk
                      </Text>
                    </View>
                  </View>
                  <Pressable onPress={() => setIsOpen(!isOpen)}>
                    <Image
                      source={icons.close}
                      resizeMode="cover"
                      className="w-6 h-6"
                    />
                  </Pressable>
                </View>

                <NavBarModalContent setIsOpen={setIsOpen} />
              </View>

              {/* End of Modal Content */}
            </Pressable>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default NavBarModal;
