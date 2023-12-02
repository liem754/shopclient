import { Footer, Header, Navigation } from "components";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
function Default() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 550) {
        setShow(true);
      }
      if (window.scrollY < 140) {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  return (
    <div className="">
      <Header />
      <div
        className={`  ${
          show
            ? "animate-slide-bottom fixed top-0 left-0 right-0 z-30"
            : " animate-none hidden "
        } `}
      >
        <Navigation />
      </div>
      <Navigation />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Default;
