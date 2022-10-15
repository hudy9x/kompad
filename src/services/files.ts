import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { auth, storage } from "../libs/firebase";
import { getCacheArray, setCacheJSON } from "../libs/localCache";

type TUploadFileFunc = (filePath: string, file: File) => Promise<string>

const _uploadFile: TUploadFileFunc = (filePath, file) => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, filePath);
    uploadBytes(fileRef, file).then(() => {
      resolve(filePath)
    }).catch((error) => {
      console.log('_uploadFile', error)
      reject('ERROR')
    })
  })

};

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


export const uploadFileToPad = (filePath: string, file: File): ReturnType<TUploadFileFunc> => {
  const user = auth.currentUser
  if (!user || !user.uid) return Promise.resolve('ERROR');

  const { uid } = user;
  const path = `pads/${uid}/${filePath}`;

  return _uploadFile(path, file)
}

export const getFileUrl = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDownloadURL(ref(storage, filePath)).then((url) => {
      resolve(url)
    }).catch(err => {
      console.log('getFileUrl', err)
      reject('Error')
    })
  })
}

export const deleteFile = (filePath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, filePath)
    deleteObject(fileRef).then(() => {
      resolve(true)
    }).catch(err => {
      if (err.code === 'storage/object-not-found') {
        return resolve(true)
      }
      reject(false)
    })
  })
}

