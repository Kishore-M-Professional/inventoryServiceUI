import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getInventorySuccess, getInventoryFailure } from './reduxSlice';
import * as api from '../common/api';

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
        // yield put(getInventoryFailure(error.toString()));
    }
}

function* inventorySaga() {
    yield takeEvery('inventoryReducer/getInventoryFetch', workerInventoryFetch);
}

export default function* rootSaga() {
    yield all([inventorySaga()])
};