import React, { useEffect } from "react";
import { VscEdit } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getInventoryFetch } from "../reduxStore/reduxSlice";

function InventoryItems() {
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.inventoryItems);
  const error = useSelector((state) => state.inventory.error);
  const isFallback = useSelector((state) => state.inventory.isFallback);
  const isLoading = useSelector((state) => state.inventory.isLoading);

  useEffect(() => {
    dispatch(getInventoryFetch());
  }, [dispatch]);

  console.log("resp: ", inventoryItems);
  console.log("error: ", error.msg);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <table className="table table-responsive-sm table-bordered table-hover caption-top">
          {isFallback ? (
            <>
              <caption>
                <b>Data is from fallback URL</b>
              </caption>
              <thead className="table-dark">
                <tr>
                  <td>Name</td>
                  <td>User Name</td>
                  <td>Email ID</td>
                </tr>
              </thead>
            </>
          ) : (
            <thead className="table-dark">
              <tr key={0}>
                <td>Item ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Quantity</td>
                <td>Action</td>
              </tr>
            </thead>
          )}
          <tbody>
            {error.status === 200 && !isLoading ? (
              inventoryItems.map((item) => {
                if (item.itemId !== undefined) {
                  return (
                    <tr key={item.itemId}>
                      <td>{item.itemId}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemPrice}</td>
                      <td>{item.quantity}</td>
                      <td><Link to={'/update/'+item.itemId}><VscEdit /></Link></td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <p>{error.msg}</p>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default InventoryItems;
