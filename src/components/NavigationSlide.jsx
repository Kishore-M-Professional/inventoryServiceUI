import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getFallBackData } from "../reduxStore/reduxSlice";
import "../styles/NavigationSlide.css";

function NavigationSlide() {

  const dispatch = useDispatch();

  const fallBackURLData = () => {
    return (
    console.log("FallBack URL clicked - Invoking Fallback URL!!!"),
    dispatch(getFallBackData())
    )
  }

  return (
    <nav>
      <Link to={"/"} className="title">Inventory</Link>
        <ul>
          <li>
            <NavLink to={"additem"}>Add Item</NavLink>
          </li>
          <li>
            <NavLink to={"getitem"}>Get Item</NavLink>
          </li>
          <li>
            <NavLink to={"fallbackdata"} onClick={fallBackURLData}>fallBack URL</NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default NavigationSlide;
