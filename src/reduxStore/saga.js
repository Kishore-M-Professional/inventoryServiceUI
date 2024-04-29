import { call, put, takeEvery, all } from "redux-saga/effects";
import { getInventorySuccess, getInventoryFailure, getInventoryFetch } from "./reduxSlice";
import * as api from "../common/api";

function* workerInventoryFetch() {
  try {
    const response = yield call(fetch, api.GET_ALL);
    if (response.status === 200) {
      const data = yield response.json();
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
    yield takeEvery("inventoryReducer/getFallBackData",workerFallBackData);
}

function* addItemApiWatcher() {
  yield takeEvery("inventoryReducer/addItemApiCall",workerAddItemApiCall);
}

function* workerAddItemApiCall(action){
  try{
    console.log(JSON.stringify(action.payload));
    const response = yield call(fetch, api.ADD_ITEM,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    })
    if(response.status === 200){
      const data = yield response.json();
      console.log("ADD Item resp: "+JSON.stringify(data));
      yield put(getInventoryFetch());
    }else {
      console.log("Item is not added to the inventory!!!")
    }
  } catch(error) {
    yield put(getInventoryFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([inventorySagaWatcher(),fallBackSagaWatcher(),addItemApiWatcher()]);
}
