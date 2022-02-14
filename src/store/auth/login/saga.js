import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import * as API from "../../../api/api"
// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

function* loginUser({ payload: { user, history } }) {
  try {
    const { data } = yield call(API.login, {
      email: user.email,
      password: user.password,
    })
    localStorage.setItem("authUser", JSON.stringify(data))
    yield put(loginSuccess(data))
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error?.response?.data?.message))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    yield put(logoutUserSuccess())
    history.push("/login")
  } catch (error) {
    yield put(apiError(error?.response?.data?.message))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
