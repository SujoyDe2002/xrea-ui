import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = (Component) => {
  return (
    function (props) {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, []);

      return (
        <Component />
      )
    }
  )
};

export default ScrollToTop