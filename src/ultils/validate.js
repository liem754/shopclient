export const validate = (payload, setInvalid) => {
  let invalid = 0;
  let feild = Object.entries(payload);
  feild.forEach((item) => {
    if (item[1] === "") {
      setInvalid((pre) => [
        ...pre,
        {
          name: item[0],
          messeger: "Bạn không được bỏ trống trường này",
        },
      ]);
      invalid++;
    }
  });
  feild.forEach((item) => {
    if (!item[1].includes("@gmail.com") && item[0] === "email") {
      setInvalid((pre) => [
        ...pre,
        {
          name: item[0],
          messeger: "Email không hợp lệ !",
        },
      ]);
      invalid++;
    }
  });
  return invalid;
};
