import {
  CreateFormType,
  PostType,
  ScreenOneProps,
  UserDataType,
} from "@/types";
import {
  Client,
  ID,
  Account,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";
import { faker } from "@faker-js/faker";

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.glenmccallum.gitnote",
  projectId: "664b32fc002d75869f26",
  databaseId: "664b34ac000044021877",
  userCollectionId: "664b351c000fb0dc9402",
  postCollectionId: "664b3552000ae0389db5",
  resourceCollectionId: "6651bc1b001a53301027",
  storageId: "664b38f10008503ab6f8",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  postCollectionId,
  resourceCollectionId,
  storageId,
} = config;

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

export const createClient = async ({
  form,
}: {
  form: {
    name: string;
    email: string;
    password: string;
  };
}) => {
  const { name, email, password } = form;
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
};
export const createPost = async ({
  form,
  userId,
}: {
  form: CreateFormType;
  userId: string;
}) => {
  try {
    const { resources, ...rest } = form;
    const newPost = await databases.createDocument(
      databaseId,
      postCollectionId,
      ID.unique(),
      {
        ...rest,
        creator: userId,
      }
    );

    const newResources = await Promise.all(
      resources.map(async (resource) => {
        const newResource = await databases.createDocument(
          databaseId,
          resourceCollectionId,
          ID.unique(),
          {
            ...resource,
            posts: newPost.$id,
          }
        );

        return newResource;
      })
    );

    return { newPost, newResources };
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error();
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    const { avatar, name, email, $id, onboarded, onboardedLevel } =
      currentUser.documents[0];

    return {
      avatar,
      name,
      email,
      id: $id,
      onboarded,
      onboardedLevel,
    };
  } catch (error) {
    throw new Error();
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error();
  }
};

export const getFilePreview = async (fileId: string) => {
  let fileUrl;

  try {
    fileUrl = await storage.getFilePreview(
      storageId,
      fileId,
      2000,
      2000,
      undefined,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async ({ file }: any) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id);

    return fileUrl;
  } catch (error) {
    console.error(error);
  }
};

export const screenOneUpdateUser = async (form: ScreenOneProps) => {
  try {
    const avatar = await uploadFile({ file: form.avatar });

    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      form.id,
      {
        name: form.name,
        portfolio: form.portfolio,
        avatar,
        onboardedLevel: 1,
      }
    );

    if (updatedUser) {
      return {
        success: true,
        updatedUser,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: UserDataType;
}) => {
  try {
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      userId,
      data
    );

    if (updatedUser) {
      return {
        success: true,
        updatedUser,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const leanPostData = (post: any) => {
  return {
    id: post.$id,
    creatorId: post.creator.$id,
    createdAt: post.$createdAt,
    content: post.content,
    description: post.description,
    steps: post.steps,
    tags: post.tags,
    title: post.title,
    type: post.type,
    resources: post.resources,
  };
};

const getResourcesForPost = async (postId: string) => {
  try {
    const resources = await databases.listDocuments(
      databaseId,
      resourceCollectionId,
      [Query.equal("posts", postId)]
    );

    return resources.documents.map((resource: any) => {
      return {
        id: resource.$id,
        label: resource.label,
        link: resource.link,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export type GetPostsType = {
  posts: PostType[];
  moreDocuments: boolean;
};

export const getUsersPosts = async (
  userId: string,
  skip: number
): Promise<GetPostsType> => {
  if (!userId) return { posts: [], moreDocuments: false };
  try {
    const posts = await databases.listDocuments(databaseId, postCollectionId, [
      Query.equal("creator", userId),
    ]);

    const totalDocuments = posts.documents.length;

    const selectedPosts = posts.documents.slice(skip, 5);

    const isMoreDocuments = totalDocuments > skip;

    const postsWithResources = await Promise.all(
      selectedPosts.map(async (post) => {
        const resources = await getResourcesForPost(post.$id);

        return leanPostData({ ...post, resources });
      })
    );

    return {
      posts: postsWithResources,
      moreDocuments: isMoreDocuments,
    };
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const getRecentPosts = async (skip: number): Promise<GetPostsType> => {
  try {
    const posts = await databases.listDocuments(databaseId, postCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);

    const totalDocuments = posts.documents.length;

    const selectedPosts = posts.documents.slice(skip, skip + 5);

    const isMoreDocuments = totalDocuments > skip;

    const postsWithResources = await Promise.all(
      selectedPosts.map(async (post) => {
        const resources = await getResourcesForPost(post.$id);

        return leanPostData({ ...post, resources });
      })
    );

    return {
      posts: postsWithResources,
      moreDocuments: isMoreDocuments,
    };
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const getPostById = async (postId: string): Promise<PostType> => {
  try {
    const post = await databases.getDocument(
      databaseId,
      postCollectionId,
      postId
    );

    const resources = await getResourcesForPost(postId);

    return leanPostData({ ...post, resources });
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const seedData = async () => {
  try {
    const userPromises = Array.from({ length: 5 }).map(async () => {
      const goalsArray = Array.from({ length: 3 }).map(() => {
        return faker.lorem.sentence();
      });
      const knowledgeArray = Array.from({ length: 3 }).map(() => {
        return faker.lorem.sentence();
      });
      const tagsArray = Array.from({ length: 3 }).map(() => {
        return faker.word.noun();
      });
      const isAvailable = faker.datatype.boolean();
      const startDate = isAvailable ? faker.date.future() : null;
      const endDate = isAvailable ? faker.date.future() : null;
      const data = {
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        accountId: ID.unique(),
        name: faker.person.fullName(),
        goals: goalsArray,
        knowledge: knowledgeArray,
        availability: isAvailable,
        startDate,
        endDate,
        onboarded: true,
        onboardedLevel: 4,
        portfolio: faker.internet.url(),
        tags: tagsArray,
      };
      const newUser = await databases.createDocument(
        databaseId,
        userCollectionId,
        ID.unique(),
        data
      );
      return newUser;
    });
    const users = await Promise.all(userPromises);

    const postPromises = users.map((user) => {
      return Promise.all(
        Array.from({ length: 4 }).map(async () => {
          const randomIndex = Math.floor(Math.random() * 3);
          const typeArray = ["workflow", "knowledge", "component"];
          const tagsArray = Array.from({ length: 3 }).map(() =>
            faker.word.noun()
          );
          const stepsArray = Array.from({ length: 3 }).map(() =>
            faker.lorem.sentence()
          );
          const data = {
            title: faker.lorem.sentence(),
            type: typeArray[randomIndex],
            tags: tagsArray,
            description: faker.lorem.paragraph(),
            content: faker.lorem.paragraph(),
            creator: user.$id,
            steps: stepsArray,
          };
          const newPost = await databases.createDocument(
            databaseId,
            postCollectionId,
            ID.unique(),
            data
          );
          return newPost;
        })
      );
    });

    const posts = (await Promise.all(postPromises)).flat();

    const resourcePromises = posts.map((post) => {
      Array.from({ length: 3 }).map(async () => {
        const data = {
          label: faker.lorem.sentence(),
          link: faker.internet.url(),
          posts: post.$id,
        };
        const newResource = await databases.createDocument(
          databaseId,
          resourceCollectionId,
          ID.unique(),
          data
        );
        return newResource;
      });
    });

    const resources = await Promise.all(resourcePromises);
  } catch (error) {
    console.error(error);
  }
};

export const deletePosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, postCollectionId);
    posts.documents.map((post) =>
      databases.deleteDocument(databaseId, postCollectionId, post.$id)
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteResources = async () => {
  try {
    const resources = await databases.listDocuments(
      databaseId,
      resourceCollectionId
    );
    resources.documents.map((resource) =>
      databases.deleteDocument(databaseId, resourceCollectionId, resource.$id)
    );
  } catch (error) {
    console.error(error);
  }
};
