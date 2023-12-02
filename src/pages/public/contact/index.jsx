function Contact() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="lg:w-4/5 w-[90%] py-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.63139492351!2d106.59518557481888!3d10.839494758027708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b4a72e239c1%3A0xf54ab49439c72fb1!2sLouis&#39;%20Tower!5e0!3m2!1svi!2s!4v1692547372757!5m2!1svi!2s"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="container w-4/5 my-24 mx-auto md:px-6">
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
                    id="username"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  <label
                    for="username"
                    className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="email"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  <label
                    for="email"
                    className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="username"
                    type="text"
                    className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  />
                  <label
                    for="message"
                    className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                  >
                    Messages
                  </label>
                </div>

                <button
                  className=" w-full cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
