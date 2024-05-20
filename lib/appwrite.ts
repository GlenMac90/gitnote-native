import {
  Client,
  ID,
  Account,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.glenmccallum.gitnote",
  projectId: "664b32fc002d75869f26",
  databaseId: "664b34ac000044021877",
  userCollectionId: "664b351c000fb0dc9402",
  postCollectionId: "664b3552000ae0389db5",
  storageId: "664b38f10008503ab6f8",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  postCollectionId,
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

    const { avatar, name, email, $id } = currentUser.documents[0];

    return {
      avatar,
      name,
      email,
      id: $id,
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
