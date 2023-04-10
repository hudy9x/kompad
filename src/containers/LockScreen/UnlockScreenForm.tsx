import { useEffect, useRef, useState } from "react"
import { message } from "../../components/message"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { signIn } from "../../services/sign"

export default function UnlockScreenForm({
  visible,
  unlock,
}: {
  visible: boolean
  unlock: () => void
}) {
  const { info } = useCurrentUser()
  const ref = useRef<HTMLInputElement>(null)
  const [loading, setloading] = useState(false)

  const unlockScreen = (pwd: string) => {
    if (!info) return
    setloading(true)
    signIn(info.email, pwd)
      .then((res) => {
        ref.current && (ref.current.value = "")
        unlock()
      })
      .catch((err) => {
        message.error("Your password is incorrect !")

        setTimeout(() => {
          const input = ref.current
          input && input.select()
        }, 250)
        console.log(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  const unlockWithPassword = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    const value = (ev.target as HTMLInputElement).value

    if (key.toLowerCase() !== "enter" || !value || !info) {
      return
    }

    unlockScreen(value)
  }

  // const unlockByPressing = () => {
  //   if (!ref.current) {
  //     return
  //   }
  //
  //   unlockScreen(ref.current.value)
  // }

  useEffect(() => {
    visible && ref.current && ref.current.focus()
  }, [visible])

  return (
    <div
      className={`w-[300px] transition-all text-center space-y-3 ${
        visible ? "" : "fixed opacity-0 pointer-events-none"
      }`}
    >
      <img
        alt="user avatar"
        src={info?.photoURL}
        className="h-16 w-16 rounded-full inline-block"
      />
      <h2 className="text-2xl font-medium text-color-base">{info?.email}</h2>
      <svg
        className={`animate-spin -ml-1 inline-flex mx-auto h-5 w-5 text-white ${
          loading ? "" : "hidden"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div className={`form-control relative ${loading ? "hidden" : ""}`}>
        <input
          ref={ref}
          onKeyDown={unlockWithPassword}
          type="password"
          placeholder="Password here"
          className="text-center text-color-base"
        />
        {/*
        <button 
          onClick={unlockByPressing}
          className="btn btn-sm btn-primary btn-xl absolute top-[7px] right-[7px]" >
          <HiOutlineLockOpen />
        </button>
*/}
      </div>
    </div>
  )
}
