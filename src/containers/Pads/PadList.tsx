import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { getPadsByUidQuery, watchPads } from "../../services/pads"
import relativeTime from "dayjs/plugin/relativeTime"
import { usePadListStore } from "../../store/pad"
import { QueryDocumentSnapshot, Unsubscribe } from "firebase/firestore"
import ContextMenu from "../../components/ContextMenu"
import PadItem from "./PadItem"
import ScrollBar from "../../components/ScrollBar"

dayjs.extend(relativeTime)

function PadList() {
  const { user } = useAuth()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const { pads, query, updatePadList, appendPads } = usePadListStore()
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<unknown> | null>(
    null
  )
  const isFetching = useRef(false)
  const needToLoadMoreData = useRef(false)

  const loadMore = () => {
    if (!needToLoadMoreData.current) {
      return
    }

    if (!user || !user?.uid || !lastDoc || isFetching.current) return
    const clonedQuery = { ...query }

    clonedQuery.startAfter = lastDoc
    isFetching.current = true
    setLoading(true)

    getPadsByUidQuery(user.uid, clonedQuery)
      .then(({ lastDoc, data }) => {
        console.log(lastDoc, data)
        appendPads(data)
        setLastDoc(lastDoc)
      })
      .finally(() => {
        isFetching.current = false
        setLoading(false)
      })
  }

  useEffect(() => {
    let unsub: Unsubscribe | null
    if (user?.uid) {
      unsub = watchPads(query, (err, { last, data }) => {
        if (err) {
          return
        }

        if (last) {
          setLastDoc(last)
        }

        updatePadList(data)
      })
    }

    return () => {
      unsub && unsub()
    }

    // eslint-disable-next-line
  }, [user?.uid, query])

  return (
    <ScrollBar
      height="calc(100vh - 71px)"
      onScrollStop={loadMore}
      onScrollFrame={(values) => {
        needToLoadMoreData.current = values.top > 0.9
      }}
    >
      <div className="pad-list">
        {pads.map((pad) => {
          return (
            <ContextMenu key={pad.id}>
              <PadItem active={id === pad.id} pad={pad} />
            </ContextMenu>
          )
        })}
      </div>
      <div>{loading ? "Loading" : <></>}</div>
    </ScrollBar>
  )
}

export default PadList
