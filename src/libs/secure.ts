const getMessageEncoding = (message: string) => {
  let enc = new TextEncoder();
  return enc.encode(message);
};

export const encryptMessage = async (message: string, key: CryptoKey, iv: Uint8Array) => {
  let encoded = getMessageEncoding(message);
  // The iv must never be reused with a given key.
  // const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoded
  );

  // let buffer = new Uint8Array(ciphertext, 0, 5);
  return ciphertext;
};

export const decryptMessage = async (cypherMessage: any, key: CryptoKey, iv: Uint8Array) => {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv
    },
    key, 
    cypherMessage
  )

  const dec = new TextDecoder()
  return dec.decode(decrypted)
};

export const generateRandomIV = () => window.crypto.getRandomValues(new Uint8Array(12))

export const generateKey = (): Promise<{key: CryptoKey, iv: Uint8Array }> => {
  return new Promise((resolve, reject) => {
    window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    ).then((key) => {
      const iv = generateRandomIV()
      resolve({key, iv})
    }).catch(err => {
      reject({key: null, iv: null})
    })
  })
}
