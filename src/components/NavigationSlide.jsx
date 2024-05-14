import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFallBackData, getItemsList } from "../reduxStore/reduxSlice";
import "../styles/NavigationSlide.css";
import PopupModal from "./PopupModal";

function NavigationSlide() {
  const dispatch = useDispatch();
  const isFallbackData = useSelector((state) => state.inventory.isFallback);
  const itemsList = useSelector((state) => state.inventory.itemsList);
  const [show, setShow] = useState(false);
  const [selectedOption,setSelectedOption] = useState("");
  const fallBackURLData = () => {
    return (
      console.log("FallBack URL clicked - Invoking Fallback URL!!!"),
      dispatch(getFallBackData())
    );
  };

  const handleSelectedOption = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {
    console.log("Invoking the itemslist endpoint");
    dispatch(getItemsList());
  }, [dispatch]);

  return (
    <>
      <nav>
        <a href="/" className="title">
          Inventory
        </a>
        <ul>
          <li>
            <input
              className="form-control"
              list="datalistOptions"
              placeholder="Type to search..."
              value={selectedOption}
              onChange={handleSelectedOption}
              hidden={isFallbackData}
            />
            <datalist id="datalistOptions">
              {itemsList.map((itemName) => {
                return <option key={itemName} value={itemName} />;
              })}
            </datalist>
          </li>
          <li>
            <NavLink to={`get/${selectedOption}`} hidden={isFallbackData}>
              Get Item
            </NavLink>
          </li>
          <li>
            <NavLink to={"additem"} hidden={isFallbackData}>
              Add Item
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
      <PopupModal
        show={show}
        closeModal={() => setShow(false)}
        buttonValue={"Delete All"}
      />
    </>
  );
}

export default NavigationSlide;
