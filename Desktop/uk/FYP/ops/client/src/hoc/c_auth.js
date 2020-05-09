import React, { useEffect } from "react";
import { cust_auth } from "../_actions/customer_actions";
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, customerRoute = null) {
  function AuthenticationCheck(props) {
    let customer = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(cust_auth()).then(async (response) => {
        if (await !response.payload.isCustAuth) {
          if (reload) {
            props.history.push("/customer/login");
          }
        } else {
          if (customerRoute && !response.payload.isAdmin) {
            props.history.push("/customer/dashoard");
          } else {
            if (reload === false) {
              props.history.push("/customer/dashoard");
            }
          }
        }
      });
    }, [dispatch, props.history, customer.googleAuth]);

    return <ComposedClass {...props} customer={customer} />;
  }
  return AuthenticationCheck;
}
