import React from "react";
import { BiPlus } from "react-icons/bi";
import { HiHashtag } from "react-icons/hi";
import TagAdd from "./TagAdd";
import TagList from "./TagList";

function Tags() {
  return (
    <section className="sec-container">
      <h2 className="sec-title group relative">
        <HiHashtag className="text-blue-500" />
        <span>Tags</span>
        <BiPlus className="hidden group-hover:block absolute top-3 right-2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-500" />
      </h2>
      <div className="sec-content">
        <TagList />
        <TagAdd />
      </div>
    </section>
  );
}

export default Tags;
