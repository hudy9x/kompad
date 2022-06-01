/* This example requires Tailwind CSS v2.0+ */
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const enabled = theme === "dark" ? true : false;

  return (
    <>
      <div className="flex items-center">
        {enabled ? (
          <MdOutlineNightlight
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
            aria-hidden="true"
          />
        ) : (
          <MdOutlineLightMode
            className="mr-3 h-5 w-5 text-yellow-500 group-hover:text-yellow-500 dark:group-hover:text-gray-300"
            aria-hidden="true"
          />
        )}

        <span>Dark theme</span>
      </div>
      <Switch
        checked={enabled}
        onChange={(status) => {
          setTheme(status ? "dark" : "light");
        }}
        className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer"
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bg-transparent w-full h-full rounded-md"
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled
              ? "bg-yellow-600 dark:bg-yellow-400"
              : "bg-gray-200 dark:bg-gray-900",
            "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
          )}
        />
      </Switch>
    </>
  );
}
