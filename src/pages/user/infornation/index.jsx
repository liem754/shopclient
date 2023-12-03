import { updateUser } from "api";
import { Button } from "components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
import Swal from "sweetalert2";

function Information() {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [payload, setPayLoad] = useState({
    name: data?.name || "",
    email: data?.email || "",
    mobile: data?.mobile || "",
    address: data?.address || "chưa có địa chỉ, vui lòng điền vào !",
    avatar: data?.avatar || "",
  });
  const [preview, setPreview] = useState(data?.avatar);
  const [loading, setLoading] = useState(false);

  const handle = useCallback(async () => {
    setLoading(true);
    const formData = new FormData();
    if (payload?.avatar?.length > 0) {
      formData.append("avatar", payload?.avatar[0]);
    } else {
      delete payload.avatar;
    }

    for (let i of Object.entries(payload)) formData.append(i[0], i[1]);
    const rs = await updateUser(formData);

    if (rs.data.err === 0) {
      setLoading(false);
      Swal.fire("Thông báo !", rs.data?.mes, "success").then(() => {
        dispatch(getCurrent());
      });
    }
  }, [payload]);
  return (
    <div className="flex flex-col gap-4 p-6 justify-center items-center">
      <h1 className="text-2xl text-center font-bold">Thông Tin Tài Khoản</h1>
      <div className="flex flex-col gap-10 w-[80%] mt-6 ">
        <section className="flex items-center gap-4 w-full justify-center">
          <h3 className="w-[15%] font-medium">Name:</h3>
          <input
            value={payload?.name}
            onChange={(e) =>
              setPayLoad((pre) => ({ ...pre, name: e.target.value }))
            }
            type="text"
            className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-[70%] p-2.5 checked:bg-emerald-500"
          />
        </section>
        <section className="flex items-center gap-4 w-full justify-center">
          <h3 className="w-[15%] font-medium">Email:</h3>
          <input
            value={payload?.email}
            onChange={(e) =>
              setPayLoad((pre) => ({ ...pre, email: e.target.value }))
            }
            type="text"
            className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-[70%] p-2.5 checked:bg-emerald-500"
          />
        </section>
        <section className="flex items-center gap-4 w-full justify-center">
          <h3 className="w-[15%] font-medium">Mobile:</h3>
          <input
            value={payload?.mobile}
            onChange={(e) =>
              setPayLoad((pre) => ({ ...pre, mobile: e.target.value }))
            }
            type="text"
            className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-[70%] p-2.5 checked:bg-emerald-500"
          />
        </section>
        <section className="flex items-center gap-4 w-full justify-center">
          <h3 className="w-[15%] font-medium">Address:</h3>
          <input
            value={payload?.address}
            onChange={(e) =>
              setPayLoad((pre) => ({ ...pre, address: e.target.value }))
            }
            type="text"
            className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-[70%] p-2.5 checked:bg-emerald-500"
          />
        </section>

        <section className="flex items-center gap-4 w-full justify-center">
          <h3 className="w-[15%] font-medium">Avatar:</h3>
          <div className="flex flex-col gap-2 w-[70%] items-center">
            <img
              src={preview}
              alt=""
              className="w-[100px] h-[100px] rounded-[50%]"
            />
            <label
              htmlFor="avatar"
              className=" py-1 px-3 border border-black hover:scale-105 rounded-md cursor-pointer"
            >
              Thay ảnh
            </label>
            <input
              hidden
              id="avatar"
              type="file"
              onChange={(e) => {
                setPayLoad((pre) => ({ ...pre, avatar: e.target.files }));

                const file = e.target.files[0];

                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>
        </section>
        {loading ? (
          <div
            role="status"
            className="w-full bg-blue-600 py-1 rounded-md flex flex-col justify-center items-center"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Button
            Click={handle}
            text={"Cập nhật thay đổi"}
            pd={"w-full py-2 mt-4"}
            bgColor={"bg-blue-600"}
            textColor={"text-white"}
            round={"rounded-md"}
          />
        )}
      </div>
    </div>
  );
}

export default Information;
