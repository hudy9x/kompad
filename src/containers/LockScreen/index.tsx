import { current } from "immer"
import { useCallback, useEffect, useRef, useState } from "react"
import { getCache, LOCKING_SCREEN_STATUS, LOCK_SCREEN_TIME, setCache } from "../../libs/localCache"
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
    console.log("resetTimer", screenLockTime)
    t && clearTimeout(t)

    if (locked || !screenLockTime) return

    t = setTimeout(() => {
      lockScreen(true)
      setCache(LOCKING_SCREEN_STATUS, "1");
    }, screenLockTime) as unknown as number
  }

  const unlock = () => {
    setLocked(false)
  }

  useEffect(() => {
    const isAppStillLocking = getCache(LOCKING_SCREEN_STATUS) || ""
    if (isAppStillLocking) {
      lockScreen(true)
    }
  }, [])

  useEffect(() => {
    console.log("hi", screenLockTime)
    resetTimer()
  }, [screenLockTime])

  useEffect(() => {
    if (locked === false) {
      resetTimer()
      setVisibleUnlockForm(false)
    }
  }, [locked])

  useEffect(() => {
    if (locked) {
      setTimeout(() => {
        ref.current && ref.current.focus()
      }, 500)
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

    const unlock = (ev: KeyboardEvent) => {
      if (locked) {
        return
      }
      const key = ev.key
      if (key.toLowerCase() === "l" && ev.ctrlKey) {
        lockScreen(true)

        // setTimeout(() => {
        //   setVisibleUnlockForm(false)
        // }, 800);
        resetTimer()
      }
    }

    !locked && resetTimer()

    events.forEach((ev) => {
      window.addEventListener(ev, resetTimer)
    })

    window.addEventListener("keydown", unlock)

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, resetTimer)
      })
      window.removeEventListener("keydown", unlock)
    }
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
