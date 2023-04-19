import { Switch } from "@headlessui/react"
import { useEffect, useState } from "react"
import {
  COMMAND_PALLETES_STATUS,
  getCache,
  setCache,
} from "../../libs/localCache"
import { classNames } from "../../libs/utils"

export default function CommandPalletesSetting() {
  const [enabled, setEnabled] = useState(
    getCache(COMMAND_PALLETES_STATUS) === "1" ? true : false
  )

  useEffect(() => {
    setCache(COMMAND_PALLETES_STATUS, enabled ? "1" : "0")
  }, [enabled])
  return (
    <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
      <div className="advanced-setting-card px-0">
        <div className="px-6 space-y-3">
          <div>
            <h3 className="title">Command Palletes</h3>
            <p className="paragraph">
              A quick tool that helps you to do some operations like creating,
              updating, sorting without touching the mouse
            </p>
          </div>
        </div>

        <div className="px-6">
          <div className="form-control col-span-3">
            <label htmlFor="timer" className="mb-4" >
              Turn in on by switching the toggler to right and vice versa
              <br />
              Using <kbd className="kbd-btn">Esc</kbd> to trigger command pallete 👈
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? "bg-primary" : "bg-light",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
