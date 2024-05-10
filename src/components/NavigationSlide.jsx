import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFallBackData } from "../reduxStore/reduxSlice";
import "../styles/NavigationSlide.css";

function NavigationSlide() {
  const dispatch = useDispatch();
  const isFallbackData = useSelector((state) => state.inventory.isFallback);

  const fallBackURLData = () => {
    return (
      console.log("FallBack URL clicked - Invoking Fallback URL!!!"),
      dispatch(getFallBackData())
    );
  };

  return (
    <nav>
      <a href="/" className="title">
        Inventory
      </a>
      <ul>
        <li>
          <NavLink to={"additem"} hidden={isFallbackData}>
            Add Item
          </NavLink>
        </li>
        <li>
          <NavLink to={"getitem"} hidden={isFallbackData}>
            Get Item
          </NavLink>
        </li>
        <li>
          <NavLink to={"fallbackdata"} onClick={fallBackURLData}>
            fallBack URL
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationSlide;
