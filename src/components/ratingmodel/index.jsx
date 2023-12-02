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
      const rs = await ratings({
        comment: comment,
        star: choose,
        pid,
        updatedAt: Date.now(),
      });
      if (rs.data?.err === 0) {
        Swal.fire("Thông báo !", rs.data.mes, "success").then(() => {
          dispatch(updateRating(true));
          setChoose(0);
          setComment("");
        });
      }
    }
  }, [comment, choose]);
  console.log(pid);
  return (
    <div className=" flex justify-center to items-center  bg-black bg-opacity-60">
      <div className="bg-white flex flex-col items-center gap-2 py-4 w-full">
        <div className="flex flex-col gap-5 w-full">
          <div className="border-4 py-6 px-2 flex sm:flex-row flex-col  justify-between">
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-400 p-2 w-[80%]"
              name=""
              id=""
              rows="7"
            ></textarea>
            <h2>How do you like product ?</h2>
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
            <Button
              Click={handleRatings}
              text={"Submit"}
              bgColor={"bg-red-600"}
              textColor={"text-white"}
              pd={"py-2 px-36"}
              radius={"round-lg"}
            />
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
