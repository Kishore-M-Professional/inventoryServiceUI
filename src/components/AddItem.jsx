import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemApiCall } from "../reduxStore/reduxSlice";
import "../styles/AddItem.css";
import Header from "./Header";
import PopupModal from "./PopupModal";

function AddItem() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const form = formRef.current;

  const invokeAddItemApi = () => {
    console.log("invoked the AddItem API call");
    const postRequest = {
      itemId: form["itemId"].value,
      itemName: form["itemName"].value,
      itemPrice: form["itemPrice"].value,
      quantity: form["quantity"].value,
    };
    dispatch(addItemApiCall(postRequest));
    navigate("/");
  };

  return (
    <>
      <Header value={"addItem"} />
      <form className="flex mt-3" ref={formRef}>
        <div className="row mb-3">
          <label htmlFor="itemId" className="col-sm-2 col-form-label">
            Item ID
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="itemId"
              id="itemId"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="itemName" className="col-sm-2 col-form-label">
            Item Name
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="itemName"
              id="itemName"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="itemPrice" className="col-sm-2 col-form-label">
            Item Price
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="itemPrice"
              id="itemPrice"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="quantity" className="col-sm-2 col-form-label">
            Quantity
          </label>
          <div className="col-sm-3">
            <input
              type="number"
              className="form-control"
              name="quantity"
              id="quantity"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add
        </button>
      </form>
      {show && (
        <PopupModal
          itemId={form["itemId"].value}
          buttonValue={"Add"}
          clickAction={invokeAddItemApi}
          show={show}
          closeModal={() => setShow(false)}
        />
      )}
    </>
  );
}

export default AddItem;
