import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (state) => {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setToggle(false)
    }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, { capture: true });
      return () => {
          document.removeEventListener('click', handleClickOutside, { capture: true });
      };
  });

  return { ref, toggle, setToggle };
}