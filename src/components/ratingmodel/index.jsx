import { memo, useCallback, useState } from "react";
// import logo from "../assets/images/logo3.png";
import { voteOption } from "ultils/contans";
import { Button, VoteBar } from "components";
import { Icons } from "ultils/icon";
import { formatStar } from "../../ultils/format";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ratings } from "api";
import moment from "moment/moment";
import { updateRating } from "store/product/productSlice";
const { AiFillStar } = Icons;
function ModalRating({ handle, totalratings, total, pid }) {
  const [choose, setChoose] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLogginned } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRatings = useCallback(async () => {
    if (!isLogginned) {
      Swal.fire(
        "Thông báo !",
        "Vui lòng đăng nhập trước khi đánh giá !",
        "info"
      );
    } else {
      if ((choose !== 0, comment !== "")) {
        setLoading(true);
        const rs = await ratings({
          comment: comment,
          star: choose,
          pid,
          updatedAt: Date.now(),
        });
        if (rs.data?.err === 0) {
          setLoading(false);
          Swal.fire("Thông báo !", rs.data.mes, "success").then(() => {
            dispatch(updateRating(true));
            setChoose(0);
            setComment("");
          });
        }
      } else {
        Swal.fire(
          "Thông báo !",
          "Vui Lòng nhập đầy đủ thông tin để đánh giá !",
          "info"
        );
      }
    }
  }, [comment, choose]);
  console.log(pid);
  return (
    <div className=" flex justify-center to items-center  bg-black bg-opacity-60">
      <div className="bg-white flex flex-col items-center gap-2 py-4 w-full">
        <div className="flex flex-col gap-5 w-full">
          <div className="border-4 py-6 px-2 flex sm:flex-col xs:flex-col items-center  justify-between">
            <div className="sm:w-[40%] w-full flex flex-col items-center gap-2 justify-center">
              <span className="text-lg font-medium">{`${totalratings}/5`}</span>
              <span className="flex gap-1">
                {formatStar(totalratings).map((el, index) => (
                  <span key={index}>
                    <span>{el}</span>
                  </span>
                ))}
              </span>
              <span className="lg:text-sm text-xs">{`${total?.length} reviewer`}</span>
            </div>
            <div className="sm:w-[60%] w-full flex flex-col gap-2">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el, index) => (
                  <VoteBar
                    key={index}
                    number={el + 1}
                    ratingCount={total?.filter((i) => i.star === el + 1).length}
                    ratingTotle={total?.length}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-3 justify-center items-center">
            <h2>Do you want rating?</h2>
          </div>
          <div className=" w-full flex flex-col items-center gap-5">
            <h2 className="text-lg font-medium my-3">Đánh giá sản phẩm</h2>
            <textarea
              placeholder="Để lại nhận xét ở đây"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-400 p-2 w-[80%]"
              name=""
              id=""
              rows="7"
            ></textarea>
            <h2>
              How do you like product ? ( Bạn đánh giá sản phẩm bao nhiêu sao ?
              )
            </h2>
            <div className="flex items-center justify-center gap-6 w-full">
              {voteOption?.map((item) => (
                <div
                  onClick={() => {
                    if (choose === null) setChoose(item.id);
                    else setChoose(null);
                  }}
                  key={item.id}
                  className="flex flex-col text-center w-[9%] py-4 justify-center items-center gap-1 bg-gray-100 cursor-pointer"
                >
                  {Number(choose) && choose >= item.id ? (
                    <AiFillStar color="orange" />
                  ) : (
                    <AiFillStar color="gray" />
                  )}
                  <span className="w-full">{item.title}</span>
                </div>
              ))}
            </div>
            {loading ? (
              <div
                role="status"
                className="w-full flex flex-col justify-center items-center"
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
                Click={handleRatings}
                text={"Submit"}
                bgColor={"bg-red-600"}
                textColor={"text-white"}
                pd={"py-2 px-36"}
                radius={"round-lg"}
              />
            )}
          </div>
          <div className="flex flex-col gap-6 pt-5">
            {total?.map((el, index) => (
              <div key={index} className="">
                {el?.postedBy && (
                  <div className="flex flex-col gap-2 p-1 border ">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                          className="w-[30px] rounded-[50%]"
                          alt=""
                        />

                        <h2 className="font-bold">{`${
                          el?.postedBy?.name?.charAt(0).toUpperCase() +
                          el?.postedBy?.name?.slice(1)
                        }`}</h2>
                      </div>
                      <span className="text-xs">
                        {moment(el?.updatedAt).fromNow()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 text-sm flex flex-col gap-1 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">vote:</span>
                        <span className="flex items-center gap-1">
                          {formatStar(el?.star).map((el, index) => (
                            <span key={index}>
                              <span>{el}</span>
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Comment:</span>

                        <h2 className=" text-ellipsis">
                          {`

                                               " ${el.comment} "`}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 mt-3 justify-center items-center"></div>
      </div>
    </div>
  );
}

export default memo(ModalRating);
