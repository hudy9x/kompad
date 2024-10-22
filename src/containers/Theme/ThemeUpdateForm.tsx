import { emit } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import ScrollBar from "../../components/ScrollBar"
import { ICSSVariable } from "../../types"
import { HiOutlineColorSwatch } from "react-icons/hi"
import {
  customThemeById,
  installTheme,
  selectTheme,
} from "../../services/user-settings"
import { useAuth } from "../../hooks/useAuth"
import { guidGenerator } from "../../libs/utils"
import { message } from "../../components/message"
import { varLanguages } from "./cssVarLanguages"
// import { addTheme } from "../../services/themes"

let timeout = 0
let cachedTheme = ""

interface IThemeUpdateFormProps {
  cssVariables: ICSSVariable[]
  themeTitle?: string
  themeId?: string
}

export default function ThemeUpdateForm({
  cssVariables,
  themeTitle,
  themeId,
}: IThemeUpdateFormProps) {
  const [title, setTitle] = useState(themeTitle || "")
  const [variables, setVariables] = useState<ICSSVariable[]>([])
  const [updateCounter, setUpdateCounter] = useState(0)
  const { user } = useAuth()

  const updateTheme = (cssVar: string) => {
    emit("theme-preview", { cssVar })
  }

  // NOTE: remember that, `updateUserTheme` function
  // only update theme's config inside `user-settings` collection.
  // It NOT ALLOWED to update the theme's config
  // inside `theme` collection
  const updateUserTheme = (themeId: string) => {
    const mergedVariable = `{${variables
      .map((v) => `"${v.name}":"${v.value}"`)
      .join(",")}}`

    console.log("update theme by id")
    customThemeById(themeId, title, mergedVariable)
      .then(() => {
        console.log("select theme")
        return selectTheme(themeId)
      })
      .then(() => {
        console.log("trigger update")
        emit("theme-update")
      })
  }

  const createNewTheme = async (uid: string) => {
    const themeId = guidGenerator()
    const themeSettingId = guidGenerator()
    const mergedVariable = `{${variables
      .map((v) => `"${v.name}":"${v.value}"`)
      .join(",")}}`

    console.log("create new theme")

    // await addTheme({
    //   name: title,
    //   author: 'authorName',
    //   desc: '',
    //   version: '0.1.0',
    //   themes: [
    //     {
    //       id: themeSettingId,
    //       name: title,
    //       config: mergedVariable,
    //     },
    //   ]
    // })

    installTheme({
      id: themeId,
      name: title,
      author: uid,
      themes: [
        {
          id: themeSettingId,
          name: title,
          config: mergedVariable,
        },
      ],
    })
      .then(() => {
        console.log("select theme")
        return selectTheme(themeSettingId)
      })
      .then(() => {
        console.log("trigger update theme")
        emit("theme-update")
      })
  }

  const saveTheme = () => {
    if (!user) return

    if (!title) {
      message.error("Theme's name is required")
      return
    }

    if (title.length > 15) {
      message.error("Theme's name must less than or equal 15 words")
      return
    }

    console.log("saving theme =====================")
    if (themeId) {
      updateUserTheme(themeId)
    } else {
      createNewTheme(user.uid)
    }
  }

  const resetTheme = () => {
    try {
      if (!cachedTheme) {
        return
      }
      setUpdateCounter(updateCounter + 1)
      setVariables(JSON.parse(cachedTheme))
    } catch (error) {
      console.log(error)
    }
  }

  // update new variable's value to state
  const onColorChange = (index: number, value: string) => {
    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      setUpdateCounter(updateCounter + 1)
      setVariables((variables) =>
        variables.map((v, i) => {
          if (i === index) {
            return {
              name: v.name,
              value: value,
            }
          }
          return v
        })
      )
    }, 200) as unknown as number
  }

  useEffect(() => {
    setTitle(themeTitle || "")
  }, [themeTitle])

  // update new variable's value to all windows
  useEffect(() => {
    if (updateCounter > 0) {
      const cssVar = []
      for (let i = 0; i < variables.length; i++) {
        const v = variables[i]
        cssVar.push(`${v.name}:${v.value}`)
      }
      updateTheme(`:root{ ${cssVar.join(";")} }`)
    }
  }, [variables, updateCounter])

  // get current theme setting and save it to variables state
  useEffect(() => {
    cachedTheme = JSON.stringify(cssVariables)
    setVariables(cssVariables)
  }, [cssVariables])

  return (
    <div className="theme-custom mx-auto w-[450px] pt-3 space-y-4">
      <div className="input-group">
        <div className="form-control">
          <div className="relative mt-1">
            <div className="form-icon">
              <HiOutlineColorSwatch className="h-5 w-5 " aria-hidden="true" />
            </div>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className=""
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Your theme's name"
            />
          </div>
        </div>
      </div>
      <p className="paragraph leading-6">
        💡 NOTE:
        <br />- Feel free to change colors 🎨. Preview mode affects to all
        sreens
        <br />- You can <b className="underline">move to another screens</b> to
        see the difference
        <br />- Clear selected colors by pressing{" "}
        <span className="text-color-primary">[Reset]</span> button
      </p>
      <div className="px-3 py-2 bg-dark border border-color-base rounded-md">
        <ScrollBar height="400px" autoHide={false}>
          <div className="pr-5 space-y-2">
            {variables.map(({ name, value }, index) => {
              const title = varLanguages[name] ? varLanguages[name] : name
              return (
                <div
                  key={name}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm">{title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="group-hover:opacity-100 opacity-80">
                      {value}
                    </span>
                    <div className="relative w-5 h-5">
                      <div
                        style={{ backgroundColor: value }}
                        className="absolute w-5 h-5 rounded-full top-0 right-0 cursor-pointer border border-color-base"
                      ></div>
                      <input
                        type="color"
                        defaultValue={value}
                        onChange={(ev) => {
                          onColorChange(index, ev.target.value)
                        }}
                        className="cursor-pointer border-none p-0 bg-transparent absolute w-5 h-5 opacity-0 top-0 right-0"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollBar>
      </div>

      <div className="text-right space-x-3">
        <Button secondary onClick={resetTheme}>
          Reset
        </Button>
        <Button onClick={saveTheme}>Save</Button>
      </div>
    </div>
  )
}
