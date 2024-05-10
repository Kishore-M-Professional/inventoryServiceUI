import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFallBackData } from "../reduxStore/reduxSlice";
import * as Constants from "../common/constants";

function FallBackData() {
  const dispatch = useDispatch();
  const inventoryItemsData = useSelector(
    (state) => state.inventory.inventoryItems
  );
  const error = useSelector((state) => state.inventory.error);
  const isLoading = useSelector((state) => state.inventory.isLoading);

  useEffect(() => {
    dispatch(getFallBackData());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <table className="table table-responsive-sm table-bordered table-hover caption-top">
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

          <tbody>
            {error.status === 200 &&
            !isLoading &&
            inventoryItemsData.length !== 0 ? (
              inventoryItemsData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                  </tr>
                );
              })
            ) : error.msg.length === 0 ? (
              <tr>
                <td colSpan={3}>{Constants.NO_ITEMS}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={3}>{error.msg}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default FallBackData;
