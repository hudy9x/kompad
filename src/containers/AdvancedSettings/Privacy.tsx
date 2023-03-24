import { ChangeEvent, useEffect, useRef, useState } from "react"
import { HiOutlineLockOpen } from "react-icons/hi"
import { timeNumberToStr } from "../../libs/utils"
import { useSettingStore } from "../../store/settings"

export default function Privacy() {
  const ref = useRef<HTMLInputElement>(null)
  const { screenLockTime, updateScreenLocktime } = useSettingStore()
  const [screenSaveTime, setscreenSaveTime] = useState(0)

  const onTimerChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target
    let value = target.value

    value = value.trim()
    const matched = value.match(/((?<time>\d+)(?<type>[smh]+))/i)

    if (!matched || !matched.groups) {
      return
    }

    const group = matched.groups
    const type =
      group.type === "h"
        ? 1000 * 60 * 60
        : group.type === "m"
        ? 1000 * 60
        : 1000
    const time = parseInt(group.time, 10) * type

    setscreenSaveTime(time)
  }

  const onSave = () => {
    // if (screenSaveTime < 3000) {
    //   message.warning("Screen lock time should be greater than or equal 3s !")
    // }

    updateScreenLocktime(screenSaveTime)
  }

  useEffect(() => {
    const inpRef = ref.current
    if (inpRef && screenLockTime) {
      inpRef.value = timeNumberToStr(screenLockTime)
    }
  }, [screenLockTime])

  return (
    <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
      <div className="advanced-setting-card px-0">
        <div className="px-6 space-y-3">
          <div>
            <h3 className="title">Privacy</h3>
            <p className="paragraph">
              These settings help you to protect your content from unsafe
              places, other people, ...etc
            </p>
          </div>
        </div>

        <div className="px-6">
          <div className="form-control col-span-3">
            <label htmlFor="timer">Screen lock after</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="form-icon">
                <HiOutlineLockOpen
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                ref={ref}
                type="text"
                name="timer"
                id="timer"
                placeholder="Ex: 5s, 30s, 10m, 2h, ..."
                onChange={onTimerChange}
              />
            </div>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary" onClick={onSave}>
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
