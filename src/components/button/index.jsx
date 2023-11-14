import { memo } from "react";

function Button({
  Click,
  full,
  pd,
  round,
  textColor,
  bgColor,
  border,
  text,
  hover,
  textCenter,
}) {
  return (
    <button
      onClick={Click}
      className={`${
        full && "w-full"
      } ${pd} ${textColor} ${textCenter} ${bgColor} ${round} ${border} outline-none ${hover}`}
    >
      {text}
    </button>
  );
}

export default memo(Button);
