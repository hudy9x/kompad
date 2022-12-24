import { IPad } from "../services/pads";

export const textSplicing = (linkWord: string, pad: IPad) => {
  const check = pad.title.includes(linkWord);
  if (check) {
    return ({
      ...pad,
      title: `${pad.title}`
    })
  }
  return ({
    ...pad,
    title: `${pad.title} - ${linkWord}`
  })
}

export const subtractUndefined = (object: IPad) => {
  Object.keys(object).forEach(key => object[key as keyof IPad] === undefined ? object[key as keyof null] === null : object[key as keyof IPad]);
  return object;
}
