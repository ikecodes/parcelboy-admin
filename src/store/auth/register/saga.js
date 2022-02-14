import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import * as API from "../../../api/api"
//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    const response = yield call(API.signup, {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
    })
    yield put(registerUserSuccessful(response))
    setTimeout(() => {
      history.push("/login")
    }, 3000)
  } catch (error) {
    yield put(registerUserFailed(error?.response?.data?.message))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
