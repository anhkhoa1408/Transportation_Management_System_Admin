import { useEffect } from "react";

const useScroll = (id) => {
  useEffect(() => {
    function scrollFunction() {
      let navbar = document.getElementById(id);
      if (navbar) {
        if (window.pageYOffset > 0) {
          navbar.classList.add("shadow");
          navbar.classList.remove("shadow-none");
        } else {
          navbar.classList.remove("shadow");
          navbar.classList.add("shadow-none");
        }
      }
    }

    window.addEventListener("scroll", scrollFunction, false);
    return function cleanup() {
      window.removeEventListener("scroll", scrollFunction, false);
    };
  }, []);
};

export default useScroll;
