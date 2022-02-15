import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_DRIVERS,
  GET_DRIVERS_SUCCESS,
  GET_DRIVERS_FAIL,
  VERIFY_DRIVER,
  VERIFY_DRIVER_SUCCESS,
  VERIFY_DRIVER_FAIL,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

export const verifyDriver = id => ({
  type: VERIFY_DRIVER,
  payload: id,
})
export const verifyDriverSuccess = driver => ({
  type: VERIFY_DRIVER_SUCCESS,
  payload: driver,
})
export const verifyDriverFail = error => ({
  type: VERIFY_DRIVER_FAIL,
  payload: error,
})

export const getUsers = () => ({
  type: GET_USERS,
})

export const getDrivers = () => ({
  type: GET_DRIVERS,
})
export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getDriversSuccess = drivers => ({
  type: GET_DRIVERS_SUCCESS,
  payload: drivers,
})

export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})
export const getDriversFail = error => ({
  type: GET_DRIVERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})
