import FolderPng from "../../assets/folders.png";
import useMobileNavigator from "../../components/MobileNavigator/useMobileNavigator";

export default function PadEmpty() {
  const { setSecondSidebarVisible } = useMobileNavigator()
  const open = () => {
    setSecondSidebarVisible()
  }

  return (
    <main
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 25px)" }}
    >
      <div className="text-center">
        <img alt="" src={FolderPng} className="w-52 m-auto" />

        <h3 className="mt-2 text-2xl font-medium text-gray-500">
          No pad selected
        </h3>
        <p className="mt-1 text-base text-gray-500">
          Click the "New Pad" button to create one
        </p>
        <button className="btn btn-primary open-document-btn" onClick={open} >Open document</button>
      </div>
    </main>
  );
}
