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
  radius,
}) {
  return (
    <button
      onClick={Click}
      className={`${
        full && "w-full"
      } ${pd} ${textColor} ${textCenter} ${bgColor} ${round} ${radius} ${border} outline-none ${hover}`}
    >
      {text}
    </button>
  );
}

export default memo(Button);
