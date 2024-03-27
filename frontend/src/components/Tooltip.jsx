import React from "react";

const Tooltip = ({ name }) => {
  return (
    <span
      className="group-hover:opacity-100 transition-opacity bg-blue-500 px-1 font-bold text-sm text-white rounded-md absolute left-[60px] top-[-60px]
-translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto capitalize"
    >
      {name}
    </span>
  );
};

export default Tooltip;
