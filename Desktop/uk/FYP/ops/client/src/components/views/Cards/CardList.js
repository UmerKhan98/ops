import React from "react";
import Card from "./Card";
import { data } from "../../../data/index";

const cardList = () => {
  return data.map((app) => {
    return <Card {...app} key={app.name} />;
  });
};

export default cardList;
