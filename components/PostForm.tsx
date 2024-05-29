import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { createTypesData } from "@/constants";
import { CreateFormType, PostType, ResourceType } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createPost, updatePost, deletePost } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import FormField from "@/components/FormField";
import PageWrapper from "@/components/PageWrapper";
import RichTextEditor from "@/components/RichTextEditor";
import Goal from "@/components/onboarding-screens/Goal";

const PostForm = ({ post }: { post?: PostType }) => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<CreateFormType>({
    steps: post?.steps || [],
    title: post?.title || "",
    type: post?.type || "component",
    tags: post?.tags || [],
    description: post?.description || "",
    content: post?.content || "",
    resources: post?.resources || [],
  });
  const [step, setStep] = useState<string>("");
  const [resource, setResource] = useState<ResourceType>({
    label: "",
    link: "",
  });

  const handleSubmit = async () => {
    if (!user) return;
    try {
      let newPost;
      if (post) {
        const resourcesHaveChanged = form.resources !== post.resources;
        newPost = await updatePost({
          form,
          postId: post.id,
          resourcesHaveChanged,
        });
      } else {
        newPost = await createPost({ form, userId: user.id });
      }
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

  const handleDelete = async () => {
    if (!post) return;
    try {
      const deletedPost = await deletePost(post.id);
      if (deletedPost) {
        router.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, steps: [] }));
  }, [form.type]);

  return (
    <PageWrapper>
      <Text className="text-white-100 text-[32px] font-ibold">
        {post ? "Edit Post" : "Create a Post"}
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
      <CustomButton
        title="Create"
        handlePress={handleSubmit}
        containerStyles="mt-6"
      />
      {post && (
        <CustomButton
          title="Delete"
          handlePress={handleDelete}
          containerStyles="mt-3 bg-red-500"
        />
      )}
    </PageWrapper>
  );
};

export default PostForm;
