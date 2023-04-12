import { useCacheQuery } from "../../hooks/useCacheQuery"
import {
  QUERY_TAG,
  QUERY_TAG_FIELD,
  QUERY_TAG_TIME,
} from "../../services/query-cache"
import { getTags, ITag } from "../../services/tags"
import { useTagStore } from "../../store/tags"
import TagItem from "./TagItem"

function TagList() {
  const { tags, updateTags } = useTagStore()

  useCacheQuery<ITag[]>({
    queryName: QUERY_TAG,
    queryTimeName: QUERY_TAG_TIME,
    updateDatas: (data) => updateTags(data),
    getDatas: getTags,
    queryCounterField: QUERY_TAG_FIELD,
  })

  return (
    <>
      {tags.map((tag) => {
        return <TagItem key={tag.id} tag={tag} />
      })}
    </>
  )
}

export default TagList
