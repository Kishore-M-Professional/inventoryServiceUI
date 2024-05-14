import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  getInventorySuccess,
  getInventoryFailure,
  getInventoryFetch,
  getItemSuccess,
  getItemsListSuccess,
} from "./reduxSlice";
import * as api from "../common/api";

function* workerInventoryFetch() {
  try {
    const response = yield call(fetch, api.GET_ALL);
    if (response.status === 200) {
      const data = yield response.json();
      data.isFallback = false;
      yield put(getInventorySuccess(data));
    } else {
      const fallBackResp = yield call(fetch, api.GET_FALLBACK);
      const fallBackData = yield fallBackResp.json();
      fallBackData.isFallback = true;
      yield put(getInventorySuccess(fallBackData));
    }
  } catch (error) {
    console.log("Error in Fetching Data :: ", error);
    const fallBackResp = yield call(fetch, api.GET_FALLBACK);
    const fallBackData = yield fallBackResp.json();
    fallBackData.isFallback = true;
    yield put(getInventorySuccess(fallBackData));
  }
}

function* inventorySagaWatcher() {
  yield takeEvery("inventoryReducer/getInventoryFetch", workerInventoryFetch);
}

function* workerFallBackData() {
  const fallBackResp = yield call(fetch, api.GET_FALLBACK);
  const fallBackData = yield fallBackResp.json();
  fallBackData.isFallback = true;
  yield put(getInventorySuccess(fallBackData));
}

function* fallBackSagaWatcher() {
  yield takeEvery("inventoryReducer/getFallBackData", workerFallBackData);
}

function* addItemApiWatcher() {
  yield takeEvery("inventoryReducer/addItemApiCall", workerAddItemApiCall);
}

function* workerAddItemApiCall(action) {
  try {
    console.log(JSON.stringify(action.payload));
    const response = yield call(fetch, api.ADD_ITEM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    if (response.status === 200) {
      const data = yield response.json();
      console.log("ADD Item resp: " + JSON.stringify(data));
      yield put(getInventoryFetch());
    } else {
      console.log("Item is not added to the inventory!!!");
    }
  } catch (error) {
    yield put(getInventoryFailure(error.message));
  }
}

function* getItemApiWatcher() {
  yield takeEvery("inventoryReducer/getItemApiCall", workerGetItemApiCall);
}

function* workerGetItemApiCall(action) {
  try {
    console.log("ID is " + JSON.stringify(action.payload));
    const url = api.GET_ITEM + action.payload;
    const response = yield call(fetch, url);
    if (response.status === 200) {
      const data = yield response.json();
      console.log("GET Item resp: " + JSON.stringify(data));
      yield put(getItemSuccess(data));
    } else {
      const message =
        "Error while retrieving an Item from the inventory for ID: " +
        action.payload;
      console.log(message);
      yield put(getInventoryFailure(message));
    }
  } catch (error) {
    yield put(getInventoryFailure(error.message));
  }
}

function* updateItemApiWatcher() {
  yield takeEvery(
    "inventoryReducer/updateItemApiCall",
    workerUpdateItemApiCall
  );
}

function* workerUpdateItemApiCall(action) {
  try {
    console.log("Update request is " + JSON.stringify(action.payload));
    const url = api.UPDATE_ITEM + action.payload.itemId;
    const response = yield call(fetch, url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    if (response.status === 200) {
      const data = yield response.json();
      console.log("PUT Item resp: " + JSON.stringify(data));
      yield put(getInventoryFetch());
    } else {
      const message =
        "Error while updating an Item from the inventory for ID: " +
        action.payload.itemId;
      console.log(message);
      yield put(getInventoryFailure(message));
    }
  } catch (error) {
    yield put(getInventoryFailure(error.message));
  }
}

function* deleteItemApiWatcher() {
  yield takeEvery(
    "inventoryReducer/deleteItemApiCall",
    workerDeleteItemApiCall
  );
}

function* workerDeleteItemApiCall(action) {
  try {
    console.log("Delete request for ID : " + JSON.stringify(action.payload));
    const url = api.DELETE_ITEM + "?id=" + action.payload;
    const response = yield call(fetch, url, {
      method: "DELETE",
    });
    if (response.status === 200) {
      const data = yield response.text();
      console.log("DELETE Item resp: " + data);
      yield put(getInventoryFetch());
    } else {
      const message =
        "Error while deleting an Item from the inventory for ID: " +
        action.payload;
      console.log(message);
      yield put(getInventoryFailure(message));
    }
  } catch (error) {
    yield put(getInventoryFailure(error.message));
  }
}

function* deleteAllApiWatcher() {
  yield takeEvery("inventoryReducer/deleteAllApiCall", workerDeleteAllApiCall);
}

function* workerDeleteAllApiCall() {
  try {
    console.log("Delete Request for all the records is invoked!!!");
    const response = yield call(fetch, api.DELETE_ALL, {
      method: "DELETE",
    });
    if (response.status === 200) {
      const data = yield response.text();
      console.log("DELETE ALL resp: " + data);
      yield put(getInventoryFetch());
    } else {
      const message = "Error while deleting all the records!!!";
      console.log(message);
      yield put(getInventoryFailure(message));
    }
  } catch (error) {
    yield put(getInventoryFailure(error.message));
  }
}

function* getItemsListApiWatcher() {
  yield takeEvery("inventoryReducer/getItemsList", workerGetItemsList);
}

function* workerGetItemsList() {
  console.log("Invoking the getItemsList api call");
  const response = yield call(fetch, api.GET_ITEMS_LIST);
  if (response.status === 200) {
    const data = yield response.json();
    console.log("GET ItemsList resp: " + JSON.stringify(data));
    yield put(getItemsListSuccess(data));
  } else {
    const message = "Error while getting ItemsList from the inventory";
    console.log(message);
    yield put(getInventoryFailure(message));
  }
}

export default function* rootSaga() {
  yield all([
    inventorySagaWatcher(),
    fallBackSagaWatcher(),
    addItemApiWatcher(),
    getItemApiWatcher(),
    updateItemApiWatcher(),
    deleteItemApiWatcher(),
    deleteAllApiWatcher(),
    getItemsListApiWatcher(),
  ]);
}
