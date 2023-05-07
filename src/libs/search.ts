import algoliasearch from "algoliasearch"

const client = algoliasearch("VPARLWAPW5", "3b8f99f90ace69032e40466dc58bd049")
const index = client.initIndex("kompad-notes")

index.setSettings({
  attributesForFaceting: ["filterOnly(uid)"],
})

export interface IPadFromSearch {
  title: string
  id: string
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
          const dt = hit as unknown as IPadFromSearch
          results.push({
            title: dt.title,
            id: dt.id,
          })
        })

        resolve(results)
      })
      .catch((err) => {
        console.error("error from fulltext search", err)
      })
  })
}

export const seAddNewObject = (data: any) => {
  // https://www.algolia.com/doc/api-reference/api-methods/save-objects/
  return index.saveObject(data, {
    autoGenerateObjectIDIfNotExist: true,
  })
}

export const seUpdateObject = (data: any) => {
  // https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/
  return index.partialUpdateObject(data)
}

export const seDeleteObject = (id: string) => {
  return index.deleteObject(id)
}
