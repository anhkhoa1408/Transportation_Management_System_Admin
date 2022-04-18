import { useEffect } from "react";

const useScroll = (
  id,
  invisibleShadow = "shadow-none",
  visibleShadow = "shadow",
) => {
  useEffect(() => {
    function scrollFunction() {
      let navbar = document.getElementById(id);
      if (navbar) {
        if (window.pageYOffset > 0) {
          navbar.classList.add(visibleShadow);
          navbar.classList.remove(invisibleShadow);
        } else {
          navbar.classList.remove(visibleShadow);
          navbar.classList.add(invisibleShadow);
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
