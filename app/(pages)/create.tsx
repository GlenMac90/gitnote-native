import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import FormField from "@/components/FormField";
import Dropdown from "@/components/Dropdown";
import { createTypesData } from "@/constants";
import { CreateFormType, ResourceType } from "@/types";
import Goal from "@/components/onboarding-screens/Goal";
import RichTextEditor from "@/components/RichTextEditor";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createPost } from "@/lib/appwrite";
import PageWrapper from "@/components/PageWrapper";

const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<CreateFormType>({
    steps: [],
    title: "",
    type: "component",
    tags: [],
    description: "",
    content: "",
    resources: [],
  });
  const [step, setStep] = useState<string>("");
  const [resource, setResource] = useState<ResourceType>({
    label: "",
    link: "",
  });

  const handleSubmit = async () => {
    if (!user) return;
    try {
      const newPost = await createPost({ form, userId: user.id });

      if (newPost) {
        router.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddStep = () => {
    if (!step) return;
    if (form.steps.includes(step)) return;
    setForm((prev) => ({ ...prev, steps: [...prev.steps, step] }));
    setStep("");
  };

  const handleAddResource = () => {
    if (!resource.label || !resource.link) return;
    setForm((prev) => ({
      ...prev,
      resources: [...prev.resources, resource],
    }));
    setResource({ label: "", link: "" });
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, steps: [] }));
  }, [form.type]);

  return (
    <PageWrapper>
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
              form.type === "workflow" ? "Steps to follow" : "What you learned"
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
            onPress={handleAddStep}
          >
            <Text className="text-xs text-white-100 font-imedium">
              Add Checkmark
            </Text>
          </TouchableOpacity>
        </>
      )}
      <RichTextEditor content={form.content} setForm={setForm} />
      <Text className="text-white-500 text-sm font-imedium mt-6">
        RESOURCES & LINKS
      </Text>
      <FormField
        otherStyles="mt-6"
        value={resource.label}
        placeholder="Label"
        handleChangeText={(text) =>
          setResource((prev) => ({ ...prev, label: text }))
        }
      />
      <FormField
        otherStyles="mt-1"
        value={resource.link}
        placeholder="Resource Link"
        handleChangeText={(text) =>
          setResource((prev) => ({ ...prev, link: text }))
        }
      />
      <TouchableOpacity
        className="w-full rounded-[5px] bg-black-600 justify-center items-center py-2.5 mt-3"
        activeOpacity={0.8}
        onPress={handleAddResource}
      >
        <Text className="text-xs text-white-100 font-imedium">
          New Resource
        </Text>
      </TouchableOpacity>
      <View className={`${form.resources.length > 0 ? "mt-3.5" : "mt-0"}`}>
        {form.resources.map((resource: ResourceType) => (
          <Goal
            key={resource.label}
            title={resource.label}
            setGoals={() => {
              setForm((prev) => ({
                ...prev,
                resources: prev.resources.filter(
                  (step) => step.label !== resource.label
                ),
              }));
            }}
          />
        ))}
      </View>
      <CustomButton title="Create" handlePress={handleSubmit} />
    </PageWrapper>
  );
};

export default Create;
