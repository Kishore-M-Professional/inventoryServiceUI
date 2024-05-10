import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFallBackData } from "../reduxStore/reduxSlice";
import "../styles/NavigationSlide.css";
import PopupModal from "./PopupModal";

function NavigationSlide() {
  const dispatch = useDispatch();
  const isFallbackData = useSelector((state) => state.inventory.isFallback);
  const [show,setShow] = useState(false);

  const fallBackURLData = () => {
    return (
      console.log("FallBack URL clicked - Invoking Fallback URL!!!"),
      dispatch(getFallBackData())
    );
  };

  return (
    <>
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
          <button onClick={() => setShow(true)} hidden={isFallbackData}>
            Delete All
          </button>
        </li>
        <li>
          <NavLink to={"fallbackdata"} onClick={fallBackURLData}>
            fallBack URL
          </NavLink>
        </li>
      </ul>
    </nav>
    <PopupModal show={show} closeModal={() => setShow(false)} buttonValue={"Delete All"} />
    </>
  );
}

export default NavigationSlide;
