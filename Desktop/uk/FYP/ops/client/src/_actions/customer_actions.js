import axios from "axios";
import { LOGIN_CUSTOMER, AUTH_CUSTOMER, LOGOUT_CUSTOMER } from "./types";
import { CUSTOMER_SERVER } from "../components/Config";

export function loginCustomer(dataToSubmit) {
  const request = axios
    .post(`${CUSTOMER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_CUSTOMER,
    payload: request,
  };
}

export function cust_auth() {
  const request = axios
    .get(`${CUSTOMER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_CUSTOMER,
    payload: request,
  };
}

export function logoutCustomer() {
  const request = axios
    .get(`${CUSTOMER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_CUSTOMER,
    payload: request,
  };
}
