import { FcFolder } from "react-icons/fc";
import FolderAdd from "./FolderAdd";
import FolderList from "./FolderList";

function Folders() {
  return (
    <section className="sec-container">
      <h2 className="sec-title group relative">
        <FcFolder />
        <span>Folders</span>
      </h2>
      <div className="sec-content">
        <FolderList />
        <FolderAdd />
      </div>
    </section>
  );
}

export default Folders;
