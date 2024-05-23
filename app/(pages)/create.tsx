import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import RenderHtml from "react-native-render-html";

import FormField from "@/components/FormField";
import Dropdown from "@/components/Dropdown";
import { createTypesData } from "@/constants";
import { CreateFormType } from "@/types";
import Goal from "@/components/onboarding-screens/Goal";
import RichTextEditor from "@/components/RichTextEditor";

const Create = () => {
  const [form, setForm] = useState<CreateFormType>({
    steps: [],
    title: "",
    type: "component",
    tags: [],
    description: "",
    content: "",
  });
  const [steps, setSteps] = useState<string[]>([]);
  const [step, setStep] = useState<string>("");

  const handlePress = () => {
    if (!step) return;
    if (form.steps.includes(step)) return;
    setForm((prev) => ({ ...prev, steps: [...prev.steps, step] }));
    setStep("");
  };

  useEffect(() => {
    setSteps([]);
  }, [form.type]);

  return (
    <SafeAreaView className="bg-black-900 px-6 pb-6 h-full items-center">
      <ScrollView className="flex-col w-full">
        <Text className="text-white-100 text-[32px] font-ibold">
          Create a Post
        </Text>
        <Text className="text-white-500 text-sm mt-7 font-imedium">
          BASIC INFORMATION
        </Text>
        <FormField
          otherStyles="mt-6"
          title="Title"
          value={form.title}
          placeholder="Enter a cool title"
          handleChangeText={(text) =>
            setForm((prev) => ({ ...prev, title: text }))
          }
        />
        <Dropdown
          title="Create Type"
          containerStyles="mt-6"
          data={createTypesData}
          setForm={setForm}
        />
        <FormField
          otherStyles="mt-6"
          title="Tags"
          value={form.tags.join(", ")}
          placeholder="Search Tags"
          handleChangeText={(text) =>
            setForm((prev) => ({ ...prev, tags: text.split(", ") }))
          }
        />
        <FormField
          textarea
          otherStyles="mt-6"
          title="Description"
          value={form.description}
          placeholder="Enter a description"
          handleChangeText={(text) =>
            setForm((prev) => ({ ...prev, description: text }))
          }
        />
        {form.type !== "component" && (
          <>
            <FormField
              otherStyles="mt-6"
              title={
                form.type === "workflow"
                  ? "Steps to follow"
                  : "What you learned"
              }
              value={step}
              placeholder={
                form.type === "workflow"
                  ? "Enter a step to follow"
                  : "Enter what you learned"
              }
              handleChangeText={(text) => setStep(text)}
            />
            <View className={`${form.steps.length > 0 ? "mt-3.5" : "mt-0"}`}>
              {form.steps.map((goal: string) => (
                <Goal
                  key={goal}
                  title={goal}
                  setGoals={() => {
                    setForm((prev) => ({
                      ...prev,
                      steps: prev.steps.filter((step) => step !== goal),
                    }));
                  }}
                />
              ))}
            </View>
            <TouchableOpacity
              className={`w-full rounded-[5px] bg-black-600 justify-center items-center py-2.5 ${form.steps.length > 0 ? "mt-0" : "mt-3.5"}`}
              activeOpacity={0.8}
              onPress={handlePress}
            >
              <Text className="text-xs text-white-100 font-imedium">
                Add Checkmark
              </Text>
            </TouchableOpacity>
          </>
        )}
        <RichTextEditor content={form.content} setForm={setForm} />
        <View className="w-full mt-6">
          <RenderHtml
            contentWidth={100}
            source={{
              html: `<div style="color: white;">${form.content}</div>`,
            }}
          />
        </View>
        <Text className="text-white-500 text-sm font-imedium">RESOURCES</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
