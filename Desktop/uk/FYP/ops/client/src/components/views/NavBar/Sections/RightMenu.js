/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Icon, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/vendor/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/customer/login">Become our Customer</a>
        </Menu.Item>
        <SubMenu title={<span>Become a Vendor</span>}>
          <MenuItemGroup>
            <Menu.Item key="mail">
              <a href="/vendor/login">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/vendor/register">Signup</a>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22, color: "#667777" }}>
              <Icon
                type="shopping-cart"
                style={{ fontSize: 30, marginBottom: 3 }}
              />
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
