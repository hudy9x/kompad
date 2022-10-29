import {
  HiOutlineChevronLeft,
  HiOutlineColorSwatch,
  HiOutlineKey,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";
import Titlebar from "../Titlebar";

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

  // {
  //   name: "Plan & Billing",
  //   href: "/setting/plan",
  //   icon: HiOutlineCreditCard,
  //   current: false,
  // },
];


export default function LayoutSetting() {
  return (
    <div className="w-full advanced-setting-wrapper" style={{ height: "100vh" }}>
      <Titlebar />
      <h2 className="px-6 pt-6 text-xl font-bold text-color-base ">
        <Link to="/" className="flex gap-2 items-center">
          <HiOutlineChevronLeft className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </h2>
      <div className="grid grid-cols-4 mt-4">
        <aside className="py-6 px-2 mx-4 sm:px-6 lg:py-0 lg:px-0 lg:col-span-1">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `setting-menu-item group ${isActive
                    ? "active"
                    : "inactive"
                  }`
                }
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={'icon'}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="col-span-3 pr-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
