import { call, put, takeEvery } from "redux-saga/effects"
import * as API from "../../api/api"
// Crypto Redux States
import {
  GET_USERS,
  GET_DRIVERS,
  VERIFY_DRIVER,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getDriversSuccess,
  getDriversFail,
  verifyDriverSuccess,
  verifyDriverFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

function* fetchUsers() {
  try {
    const {
      data: { consumers },
    } = yield call(API.getConsumers)
    yield put(getUsersSuccess(consumers))
  } catch (error) {
    yield put(getUsersFail(error?.response?.data?.message))
  }
}
function* fetchDrivers() {
  try {
    const {
      data: { drivers },
    } = yield call(API.getDrivers)
    yield put(getDriversSuccess(drivers))
  } catch (error) {
    yield put(getDriversFail(error?.response?.data?.message))
  }
}
function* verifyDriver({ payload }) {
  try {
    const {
      data: { updatedUser },
    } = yield call(API.verifyDriver, payload)
    yield put(verifyDriverSuccess(updatedUser))
  } catch (error) {
    yield put(verifyDriverFail(error?.response?.data?.message))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(addUserFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_DRIVERS, fetchDrivers)
  yield takeEvery(VERIFY_DRIVER, verifyDriver)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga
