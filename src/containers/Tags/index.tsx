import { HiHashtag } from "react-icons/hi";
import TagAdd from "./TagAdd";
import TagList from "./TagList";

function Tags() {
  return (
    <section className="sec-container">
      <h2 className="sec-title group relative">
        <HiHashtag className="text-blue-500" />
        <span>Tags</span>
      </h2>
      <div className="sec-content">
        <TagList />
        <TagAdd />
      </div>
    </section>
  );
}

export default Tags;
