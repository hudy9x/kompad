import { useSettingStore } from "../../store/settings"

export default function useMobileNavigator() {
  const { secondSidebarVisibility, toggleSecondSidebar } = useSettingStore()

  return {
    setSecondSidebarVisible: toggleSecondSidebar,
    secondSidebarVisibility: secondSidebarVisibility,
  }
}
