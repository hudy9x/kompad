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
import LoadingSpinner from "../../components/LoadingSpinner"

dayjs.extend(relativeTime)

function PadList() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { id } = useParams()
  const { pads, query, updatePadList, appendPads } = usePadListStore()
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<unknown> | null>(
    null
  )
  const [end, setEnd] = useState("NONE")
  const isFetching = useRef(false)
  const needToLoadMoreData = useRef(false)
  const enabledIfNotShared = !query.shared

  const loadMore = () => {
    if (!needToLoadMoreData.current) {
      return
    }

    if (!lastDoc) {
      setEnd("END")
      return
    }

    if (!user || !user?.uid || !lastDoc || isFetching.current) return
    const clonedQuery = { ...query }

    clonedQuery.startAfter = lastDoc
    isFetching.current = true
    setLoading(true)

    getPadsByUidQuery(user.uid, clonedQuery)
      .then(({ lastDoc, data }) => {
        appendPads(data)
        setLastDoc(lastDoc)
        !lastDoc && setEnd("END")
      })
      .finally(() => {
        isFetching.current = false
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
  }

  useEffect(() => {
    let unsub: Unsubscribe | null
    if (user?.uid) {
      setLoading(true)
      unsub = watchPads(query, (err, { last, data }) => {
        setLoading(false)
        if (err) {
          return
        }

        if (last) {
          setEnd("NONE")
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
    <div className="relative" >
      <div className={`absolute top-[40%] left-[45%] z-30 ${loading ? "" : "invisible pointer-events-none"}`}>
        <LoadingSpinner />
      </div>
      <ScrollBar
        height="calc(100vh - 80px)"
        onScrollStop={loadMore}
        onScrollFrame={(values) => {
          needToLoadMoreData.current = values.top > 0.9
        }}
      >
        <div className="pad-list">
          {pads.map((pad) => {
            return (
              <ContextMenu key={pad.id} enabled={enabledIfNotShared}>
                <PadItem active={id === pad.id} pad={pad} />
              </ContextMenu>
            )
          })}
        </div>
      </ScrollBar>
      <div className="text-2xs px-4 border-t border-color-dark flex items-center justify-between uppercase">
        <span>{end === "END" ? "Reached Limit" : ""}</span>
        <span>Total: {pads.length}</span>
      </div>
    </div>
  )
}

export default PadList
