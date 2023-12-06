import { contact } from "api";
import { useState } from "react";
import Swal from "sweetalert2";
import { validate } from "ultils/validate";

function Contact() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    messege: "",
  });
  const [validat, setValidat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    const valid = validate(payload, setValidat);
    if (valid === 0) {
      setLoading(true);
      const rs = await contact(payload);

      if (rs.data.err === 0) {
        Swal.fire(
          "Thông báo !",
          "Cảm ơn bạn đã gửi liên hệ, Chúng tôi sẽ phản hồi qua email trong thời gian sớm nhất !",
          "success"
        ).then(() => {
          setPayload({
            name: "",
            email: "",
            messege: "",
          });
          setLoading(false);
        });
      } else {
        Swal.fire("Thông báo !", "Có sự cố !", "info").then(() => {
          setPayload({
            name: "",
            email: "",
            messege: "",
          });
          setLoading(false);
        });
      }
    } else {
      setPayload({
        name: "",
        email: "",
        messege: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="lg:w-4/5 w-[90%] py-2 -z-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.63139492351!2d106.59518557481888!3d10.839494758027708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b4a72e239c1%3A0xf54ab49439c72fb1!2sLouis&#39;%20Tower!5e0!3m2!1svi!2s!4v1692547372757!5m2!1svi!2s"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="container w-4/5  my-24 mx-auto md:px-6">
        <section className="mb-32">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-7/12 md:px-3 lg:px-6">
              <h2 className="mb-8 text-3xl font-bold">
                Frequently asked questions
              </h2>
              <p className="mb-2 font-bold">
                Anim pariatur cliche reprehenderit?
              </p>
              <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                autem numquam dolore molestias aperiam culpa alias veritatis
                architecto eos, molestiae vitae ex eligendi libero eveniet
                dolorem, doloremque rem aliquid perferendis.
              </p>
              <p className="mb-2 font-bold">
                Non cupidatat skateboard dolor brunch?
              </p>
              <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                Distinctio corporis, iure facere ducimus quos consectetur ipsa
                ut magnam autem doloremque ex! Id, sequi. Voluptatum magnam sed
                fugit iusto minus et suscipit? Minima sunt at nulla tenetur,
                numquam unde quod modi magnam ab deserunt ipsam sint aliquid
                dolores libero repellendus cupiditate mollitia quidem dolorem
                odit
              </p>
              <p className="mb-2 font-bold">
                Praesentium voluptatibus temporibus consequatur non aspernatur?
              </p>
              <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                Minima sunt at nulla tenetur, numquam unde quod modi magnam ab
                deserunt ipsam sint aliquid dolores libero repellendus
                cupiditate mollitia quidem dolorem.
              </p>

              <p className="mb-2 font-bold">
                Voluptatum magnam sed fugit iusto minus et suscipit?
              </p>
              <p className="text-neutral-500 dark:text-neutral-300">
                Laudantium perferendis, est alias iure ut veniam suscipit
                dolorem fugit. Et ipsam corporis earum ea ut quae cum non iusto
                blanditiis ipsum dolor eius reiciendis, velit adipisci quas.
              </p>
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto md:w-5/12 md:px-3 lg:px-6">
              <p className="mb-8 font-bold">
                Didn't find your answer in the FAQ? Contact our sales
              </p>
              <div className=" flex flex-col gap-10 border rounded-none p-5 shadow-xl">
                <div className="relative">
                  <input
                    value={payload?.name}
                    onChange={(e) =>
                      setPayload((pre) => ({ ...pre, name: e.target.value }))
                    }
                    onFocus={() => setValidat([])}
                    id="username"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  {validat?.length > 0 &&
                    validat.some((i) => i.name === "name") && (
                      <small className="text-red-500 text-xs">
                        {validat.find((i) => i.name === "name")?.messeger}
                      </small>
                    )}

                  {payload?.name === "" && (
                    <label
                      for="username"
                      className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                    >
                      Name
                    </label>
                  )}
                </div>

                <div className="relative">
                  <input
                    onFocus={() => setValidat([])}
                    value={payload?.email}
                    onChange={(e) =>
                      setPayload((pre) => ({ ...pre, email: e.target.value }))
                    }
                    id="email"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  {validat?.length > 0 &&
                    validat.some((i) => i.name === "email") && (
                      <small className="text-red-500 text-xs">
                        {validat.find((i) => i.name === "email")?.messeger}
                      </small>
                    )}
                  {payload?.email === "" && (
                    <label
                      for="email"
                      className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                    >
                      Email address
                    </label>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    onFocus={() => setValidat([])}
                    value={payload?.messege}
                    onChange={(e) =>
                      setPayload((pre) => ({ ...pre, messege: e.target.value }))
                    }
                    id="message"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  {validat?.length > 0 &&
                    validat.some((i) => i.name === "messege") && (
                      <small className="text-red-500 text-xs">
                        {validat.find((i) => i.name === "messege")?.messeger}
                      </small>
                    )}
                  {payload?.messege === "" && (
                    <label
                      for="message"
                      className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                    >
                      Messages
                    </label>
                  )}
                </div>
                {loading ? (
                  <div
                    role="status"
                    className="w-full flex flex-col items-center justify-center"
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
                  <button
                    onClick={handle}
                    className=" w-full cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
