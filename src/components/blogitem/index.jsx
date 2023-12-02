import { memo } from "react";

function BlogItem({ img, title, time, description }) {
  return (
    <div className="w-full flex items-center flex-col shadow-lg h-full">
      <img src={img} className="w-full h-[330px]" alt="" />
      <section className="p-3 ">
        <h2 className=" font-medium mb-1">{title}</h2>
        <span className="text-xs block text-gray-600 pb-2 border-b">
          {time.slice(0, 10)}
        </span>

        <p className=" line-clamp-5 w-full">{description}</p>
      </section>
    </div>
  );
}

export default memo(BlogItem);
