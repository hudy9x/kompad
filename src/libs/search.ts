import algoliasearch, { SearchIndex } from "algoliasearch"
import { IUserSearch } from "../containers/PadActions/PadShareModal/types"

const client = algoliasearch("VPARLWAPW5", "3b8f99f90ace69032e40466dc58bd049")
const index = client.initIndex("kompad-notes")
const emailIndex = client.initIndex("kompad-emails")

type TSearchIndexName = "main" | "email"

index.setSettings({
  attributesForFaceting: ["filterOnly(uid)"],
})

export interface IPadFromSearch {
  title: string
  id: string
}

export interface IUserFromSearch {
  uid: string
  email: string
  fullname: string
  photoURL: string
}

export const searchByUser = (
  term: string,
  uid: string
): Promise<IPadFromSearch[]> => {
  return new Promise((resolve) => {
    index
      .search(term, {
        filters: `uid:${uid}`,
        // facetFilters: conds,
      })
      .then(({ hits }) => {
        const results: IPadFromSearch[] = []
        hits.forEach((hit) => {
          const dt = hit as unknown as { title: string; padId: string }
          results.push({
            title: dt.title,
            id: dt.padId,
          })
        })

        resolve(results)
      })
      .catch((err) => {
        console.error("error from fulltext search", err)
      })
  })
}

export const searchEmail = (term: string): Promise<IUserSearch[]> => {
  return new Promise((resolve) => {
    emailIndex.search(term).then(({ hits }) => {
      const results: IUserFromSearch[] = []

      hits.forEach((hit) => {
        const dt = hit as unknown as IUserFromSearch
        results.push({
          uid: dt.uid,
          email: dt.email,
          fullname: dt.fullname,
          photoURL: dt.photoURL,
        })
      })

      resolve(results)
    })
  })
}

export const getSearchIndex = (name?: string) => {
  let searchIndex: SearchIndex

  switch (name) {
    case "email":
      searchIndex = emailIndex
      break

    default:
      searchIndex = index
      break
  }

  return searchIndex
}

export const seAddNewEmailObject = (data: any) => {
  return seAddNewObject(data, "email")
}

export const seAddNewObject = (data: any, indexName?: TSearchIndexName) => {
  const searchIndex = getSearchIndex(indexName)
  //https://www.algolia.com/doc/api-reference/api-methods/save-objects/
  return searchIndex.saveObject(data, {
    autoGenerateObjectIDIfNotExist: true,
  })
}

export const seUpdateObject = (data: any, indexName?: TSearchIndexName) => {
  const searchIndex = getSearchIndex(indexName)
  // https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/
  return searchIndex.partialUpdateObject(data)
}

export const seDeleteObject = (id: string, indexName?: TSearchIndexName) => {
  const searchIndex = getSearchIndex(indexName)
  return searchIndex.deleteObject(id)
}
