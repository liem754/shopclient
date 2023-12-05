import { Icons } from "./icon";

const {
  IoHomeSharp,
  PiShirtFoldedFill,
  MdContacts,
  MdFiberNew,
  MdPayments,
  FaChevronDown,
  MdOutlinePreview,
} = Icons;
export const voteOption = [
  {
    id: 1,
    title: "Terrible",
  },
  {
    id: 2,
    title: "Bad",
  },

  {
    id: 3,
    title: "Neutral",
  },

  {
    id: 4,
    title: "Good",
  },
  {
    id: 5,
    title: "Perfect",
  },
];
export const navi = [
  {
    icon: <MdOutlinePreview />,
    value: "Giới thiệu",
    link: "/introduce",
  },
  {
    icon: <MdContacts />,
    value: "Liên hệ",
    link: "/contact",
  },
  {
    icon: <MdFiberNew />,
    value: "Tin tức",
    link: "/blog",
  },
];
