import React from "react";
import { Link } from "react-router-dom";
import { URL,IF } from "../url";
import sampleImage from '../assets/sample.jpg';


const SuggestedPosts = ({ className, posts=[] }) => {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}
    >
      <h2 className="font-roboto font-medium text-[#0e2436] md:text-xl">
      Latest Article
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts.map((item) => (
          <div
            key={item._id}
            className="flex space-x-3 flex-nowrap items-center"
          >
             <img
              className="aspect-square object-cover rounded-lg w-1/5"
              src={
                item?.photo
                  ? IF + item?.photo : sampleImage
              }
              alt="image"
            /> 
            
            <div className="text-sm font-roboto text-dark-hard font-medium">
              <h3 className="text-sm font-roboto text-[#0e2436] font-medium md:text-base lg:text-lg">
                <Link to={`/blog/${item.slug}`}>{item.title}</Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
        Tags
      </h2> */}
      {/* {tags.length === 0 ? (
        <p className="text-slate-500 text-xs mt-2">
          There is not tags for this post
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
          {tags.map((item, index) => (
            <Link
              key={index}
              to="/"
              className="inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm"
            >
              {item}
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SuggestedPosts;
