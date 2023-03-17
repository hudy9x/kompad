import { HiOutlineChevronLeft } from "react-icons/hi"
import useMobileNavigator from "./useMobileNavigator"

export default function MobileDocListNavButton() {
  const { setSecondSidebarVisible } = useMobileNavigator()
  const showSecondSidebar = () => {
    setSecondSidebarVisible()
  }
  return (
    <div
      className="btn btn-primary absolute top-4 left-8 w-9 h-9 sm:hidden rounded-md flex items-center justify-center bg-white/60 z-10 hover:bg-white/90 cursor-pointer shadow-lg active:bg-white/80"
      onClick={showSecondSidebar}
    >
      <HiOutlineChevronLeft className="text-black" />
    </div>
  )
}
