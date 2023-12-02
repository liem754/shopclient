import React from "react";
import { Breadcrumb } from "antd";
const Breadcrumbs = ({}) => (
  <Breadcrumb
    items={[
      {
        title: "Home",
      },
      {
        title: <a href="/category"></a>,
      },
      {
        title: <a href="">Application List</a>,
      },
      {
        title: "An Application",
      },
    ]}
  />
);
export default Breadcrumbs;
