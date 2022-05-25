import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../libs/firebase";
import { getCacheArray, setCacheJSON } from "../libs/localCache";

// Create a reference under which you want to list
const listRef = ref(storage, "avatars/public");

export const getAllPublicAvatars = () => {
  const key = "PUBLIC_AVATAR";
  return new Promise<string[]>((resolve, reject) => {
    const cachedPublicAvatars = getCacheArray(key);
    if (cachedPublicAvatars) {
      resolve(cachedPublicAvatars);
      return;
    }

    // Find all the prefixes and items.
    listAll(listRef)
      .then(async (res) => {
        const promise: Promise<string>[] = [];

        res.items.forEach((itemRef) => {
          promise.push(getDownloadURL(itemRef));
        });

        const urls = await Promise.all(promise);

        setCacheJSON(key, urls);
        resolve(urls);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
