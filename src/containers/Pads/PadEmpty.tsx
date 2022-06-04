import FolderPng from "../../assets/folders.png";

export default function PadEmpty() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 25px)" }}
    >
      <div className="text-center">
        <img alt="" src={FolderPng} className="w-52 m-auto" />

        <h3 className="mt-2 text-2xl font-medium text-gray-900 dark:text-gray-300">
          No pad selected
        </h3>
        <p className="mt-1 text-base text-gray-500">
          Click the "New Pad" button to create one
        </p>
      </div>
    </main>
  );
}
