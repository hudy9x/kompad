import {
  HiOutlineChevronLeft,
  HiOutlineColorSwatch,
  HiOutlineDocumentText,
  HiOutlineKey,
  HiOutlineShieldCheck,
  HiOutlineTerminal,
  HiOutlineUserCircle,
} from "react-icons/hi"
import { Link, NavLink, Outlet } from "react-router-dom"
import Titlebar from "../Titlebar"

const navigation = [
  {
    name: "Profile",
    href: "/setting/profile",
    icon: HiOutlineUserCircle,
    current: true,
  },
  {
    name: "Password",
    href: "/setting/password",
    icon: HiOutlineKey,
    current: false,
  },
  {
    name: "Themes",
    href: "/setting/theme",
    icon: HiOutlineColorSwatch,
    current: false,
  },
  {
    name: "File Manager",
    href: "/setting/file-manager",
    icon: HiOutlineDocumentText,
    current: false,
  },
  {
    name: "Privacy",
    href: "/setting/privacy",
    icon: HiOutlineShieldCheck,
    current: false,
  },
  {
    name: "Command Palletes",
    href: "/setting/command-palletes",
    icon: HiOutlineTerminal,
    current: false,
  },

  // {
  //   name: "Plan & Billing",
  //   href: "/setting/plan",
  //   icon: HiOutlineCreditCard,
  //   current: false,
  // },
]

export default function LayoutSetting() {
  return (
    <div
      className="w-full advanced-setting-wrapper"
      style={{ height: "100vh" }}
    >
      <Titlebar />
      <div className="advanced-setting-container w-[1024px] m-auto">
        <h2 className="px-6 py-6 text-xl font-bold text-color-base hover:opacity-90 ">
          <Link to="/" className="flex gap-2 items-center">
            <HiOutlineChevronLeft className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </h2>
        <div className="flex items-start">
          <aside className="py-6 px-2 mx-4 sm:px-6 lg:py-0 lg:px-0 lg:col-span-1 w-60 shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `setting-menu-item group ${
                      isActive ? "active" : "inactive"
                    }`
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon className={"icon"} aria-hidden="true" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          <div className="col-span-3 grow-0 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
