import { useEffect, useRef } from "react";

export function useOutsideClick(closehandler) {
  //detecting a click outside modal window to close the modal window
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          closehandler();
        }
      }
      document.addEventListener("click", handleClick, true);
      return document.removeEventListener("click", handleClick);
    },
    [closehandler]
  );
  return ref;
}
