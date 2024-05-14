import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { deleteAllApiCall } from "../reduxStore/reduxSlice";
import "../styles/PopupModal.css";

function PopupModal({ show, closeModal, buttonValue, clickAction, itemId }) {
  const dispatch = useDispatch();

  if (!show) return null;

  const displayContent = () => {
    switch (buttonValue) {
      case "Delete All":
        return <h1>Do you wanna delete all the records?</h1>;
      case "Update":
        return (
          <h1>
            Do you wanna update <b>{itemId}</b>
          </h1>
        );
      case "Add":
        return (
          <h1>
            Do you wanna add <b>{itemId}</b>
          </h1>
        );
      case "Delete":
        return (
          <h1>
            Do you wanna delete <b>{itemId}</b>
          </h1>
        );
      default:
        return <h1>are you sure?</h1>;
    }
  };

  const buttonAction = () => {
    console.log("button is clicked!!!");
    switch (buttonValue) {
      case "Delete All":
        return (dispatch(deleteAllApiCall()), closeModal());
      case "Update":
        clickAction();
        break;
      case "Add":
        clickAction();
        break;
      case "Delete":
        clickAction();
        break;
      default:
        break;
    }
  };

  return createPortal(
    <div className="modal">
      <div className="overlay" onClick={closeModal} />
      <div className="content">
        {displayContent()}
        <div className="button-container">
          <button className="btn btn-danger" onClick={buttonAction}>
            {buttonValue}
          </button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
}

export default PopupModal;
