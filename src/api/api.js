import axios from "axios"

// const local_url = "http://localhost:5004/api/users"
const url = "https://parcelboy.herokuapp.com/api/users"

const API = axios.create({ baseURL: url })

API.interceptors.request.use(req => {
  if (localStorage.getItem("authUser")) {
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    req.headers.Authorization = `Bearer ${authUser.token}`
  }
  return req
})

////AUTH
export const login = formdata => API.post("/login/admin", formdata)
export const signup = formdata => API.post("/signup/admin", formdata)

////USERS

export const getConsumers = () => API.get("/consumers")
export const getDrivers = () => API.get("/drivers")

export const verifyDriver = id => API.patch(`/drivers/${id}/verify-driver`)
