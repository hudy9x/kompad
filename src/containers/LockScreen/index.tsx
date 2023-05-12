import { useEffect, useRef, useState } from "react"
import {
  getCache,
  LOCKING_SCREEN_STATUS,
  setCache,
} from "../../libs/localCache"

import { useSettingStore } from "../../store/settings"
import LockScreenTimer from "./LockScreenTimer"
import UnlockScreenForm from "./UnlockScreenForm"

let t = 0
export default function LockScreen() {
  const { screenLockTime } = useSettingStore()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(false)
  const [visibleUnlockForm, setVisibleUnlockForm] = useState(false)

  const lockScreen = (status: boolean) => {
    setLocked(status)
  }

  const resetTimer = () => {
    // console.log("resetTimer", screenLockTime)
    t && clearTimeout(t)

    if (locked || !screenLockTime) return

    t = setTimeout(() => {
      lockScreen(true)
      // in case user closes the app or reload by F5 or Ctrl + R
      // so we need to save lock screen status
      // when user opens app again, lock screen must be displayed
      setCache(LOCKING_SCREEN_STATUS, "1")
    }, screenLockTime) as unknown as number
  }

  const unlock = () => {
    setLocked(false)
    setCache(LOCKING_SCREEN_STATUS, "")
  }

  const focusOnLockScreenAfter = (second: number) => {
    setTimeout(() => {
      ref.current && ref.current.focus()
    }, second)
  }

  useEffect(() => {
    // show lock screen when status is not empty
    const isAppStillLocking = getCache(LOCKING_SCREEN_STATUS) || ""
    console.log("isAppStillLocking", isAppStillLocking)
    if (isAppStillLocking) {
      lockScreen(true)
    }
  }, [])

  // when the lock screen timer has updated
  // reset the timer
  useEffect(() => {
    resetTimer()
    // eslint-disable-next-line
  }, [screenLockTime])

  // reset timer after unlocking
  // and try to close the unlock form after 800ms
  // why 800ms? cuz i don't want the form appears right after unlocking process success
  useEffect(() => {
    if (locked === false) {
      resetTimer()
      setTimeout(() => {
        setVisibleUnlockForm(false)
      }, 800)
    }
    // eslint-disable-next-line
  }, [locked])

  useEffect(() => {
    if (locked) {
      focusOnLockScreenAfter(500)
      // setVisibleUnlockForm(false)
    }
  }, [locked])

  useEffect(() => {
    const events = [
      "scroll",
      "keydown",
      "mousedown",
      "mousemove",
      "click",
      "touchmove",
      "touchstart",
      "load",
    ]

    const lockByShortcutKey = (ev: KeyboardEvent) => {
      if (locked) {
        return
      }
      const key = ev.key || ""
      if (key.toLowerCase() === "l" && ev.ctrlKey) {
        lockScreen(true)
        setCache(LOCKING_SCREEN_STATUS, "1")
        resetTimer()
      }
    }

    !locked && resetTimer()

    events.forEach((ev) => {
      window.addEventListener(ev, resetTimer)
    })

    window.addEventListener("keydown", lockByShortcutKey)

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, resetTimer)
      })
      window.removeEventListener("keydown", lockByShortcutKey)
    }

    // eslint-disable-next-line
  }, [screenLockTime])

  return (
    <div
      tabIndex={1}
      ref={ref}
      onClick={() => setVisibleUnlockForm(true)}
      onKeyUp={() => setVisibleUnlockForm(true)}
      className={`lock-screen fixed z-[90] top-0 left-0 w-full h-full overflow-hidden bg-black/30 backdrop-blur-2xl transition-all duration-700 flex items-center justify-center ${
        locked ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <UnlockScreenForm visible={visibleUnlockForm} unlock={unlock} />
      <LockScreenTimer visible={!visibleUnlockForm} />
    </div>
  )
}
