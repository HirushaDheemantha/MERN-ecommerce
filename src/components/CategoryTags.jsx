import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const CategoryTags = () => {
  const { navigate } = useAppContext();

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {categories.map((category, index) => (
        <div
          key={index}
          style={{ backgroundColor: category.bgColor }}
          className="cursor-pointer px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium flex items-center justify-center"
          onClick={() => {
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0, 0);
          }}
        >
          {category.text}
        </div>
      ))}
    </div>
  );
};

export default CategoryTags;
