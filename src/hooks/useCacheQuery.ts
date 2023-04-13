import { Unsubscribe } from "firebase/auth"
import { useEffect, useState } from "react"
import {
  getQueryCache,
  IQueryCache,
  setQueryCache,
  updateQueryCounterFor,
  watchQuery,
} from "../services/query-cache"
import { useAuth } from "./useAuth"

/**
 * Kompad Caching Mechanism
 * 1/ get Data from cache
 * 2/ trigger watcher by calling `watchQuery`
 * 3/ check returned data by watcher
 * 3.1/ returned data is NULL
 *   - get data from db
 *   - call `updateQueryCounterFor` to nofity that there's a new change
 *   - save data to local cache
 *   - save counter to local cache (counter is returned from `updateQueryCounterFor`)
 * 3.2/ returned data is EXIST
 * 3.2.1/ returned data === local cache counter  => do nothign
 * 3.2.2/ returned data !== local cache => do 3.1/ again
 *
 * Pros:
 *   - save firestore cost by reducing calling times
 *   - enhance data rendering performace
 *
 * Cons:
 *   - fetching all data instead a specified one
 *     in some update operations
 *     Ex: getList => update all => OK
 *         addDoc => update all ?? => NG
 *         editDoc => update all ? => NG
 *         delDoc => update all ? => NG
 *   => Expectation: only update one document
 *   when addDoc, editDoc, delDoc operation occurs
 */

interface ICacheQueryProps<T> {
  queryName: string
  queryTimeName: string
  updateDatas: (data: T) => void
  getDatas: () => Promise<T>
  queryCounterField: string
}

export function useCacheQuery<T>({
  queryName,
  queryTimeName,
  updateDatas,
  getDatas,
  queryCounterField,
}: ICacheQueryProps<T>) {
  const { user } = useAuth()
  const [cacheWatcher, triggerCacheWatcher] = useState(false)

  // 1. get data from cache
  useEffect(() => {
    getQueryCache(queryName).then((result: any) => {
      if (result) {
        updateDatas(result)
      }

      triggerCacheWatcher(true)
    })
    // eslint-disable-next-line
  }, [])

  const updateDataNCacheTime = () => {
    getDatas().then((datas) => {
      updateDatas(datas)

      updateQueryCounterFor(queryCounterField, (counter) => {
        setQueryCache(queryTimeName, counter)
        setQueryCache(queryName, datas)
      })
    })
  }

  // 2. trigget watcher
  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (cacheWatcher && user) {
      unsubscribe = watchQuery((data) => {
        const cacheTime = data[queryCounterField as keyof IQueryCache]

        if (!cacheTime) {
          return updateDataNCacheTime()
        }

        getQueryCache(queryTimeName).then((localCacheTime) => {
          if (cacheTime === localCacheTime) {
            return
          }

          updateDataNCacheTime()
        })
      })
    }

    return () => {
      unsubscribe && unsubscribe()
    }
    // eslint-disable-next-line
  }, [cacheWatcher, user])
}
