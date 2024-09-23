import React from "react";
import { Blogs } from "utils/contants";

const Blog = () => {
  return (
    <div className="flex py-6 px-4">
      <div className="flex flex-col w-3/4 gap-6">
        {Blogs.map((el) => (
          <div
            key={el.id}
            className="flex border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={el.image}
              alt="blog"
              className="w-[378px] h-[252px] object-cover"
            />
            <div className="flex flex-col p-4">
              <a href={el.link} target="_blank" rel="noopener noreferrer">
                <span className="text-xl font-semibold hover:text-main cursor-pointer">
                  {el.title}
                </span>
              </a>
              <span className="text-sm text-gray-500 py-2">
                {el.byUser} - {el.createAt}
              </span>
              <span className="text-gray-700">{el.content}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/4 ml-6">
        <h3 className="bg-main p-4 text-white text-lg text-center rounded-lg shadow-md">
          Related Articles
        </h3>
        {Blogs.map((el) => (
          <div
            key={el.id}
            className="flex flex-col p-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-200"
          >
            <a href={el.link} target="_blank" rel="noopener noreferrer">
              <span className="text-sm font-semibold hover:text-main cursor-pointer">
                {el.title}
              </span>
            </a>
            <span className="text-gray-400 text-xs">{el.createAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
