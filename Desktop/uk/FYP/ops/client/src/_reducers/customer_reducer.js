import {
  LOGIN_CUSTOMER,
  AUTH_CUSTOMER,
  LOGOUT_CUSTOMER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_CUSTOMER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_CUSTOMER:
      return { ...state, customerData: action.payload };
    case LOGOUT_CUSTOMER:
      return { ...state };
    default:
      return state;
  }
}
