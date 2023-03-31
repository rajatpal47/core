import React from "react";
import { SCMenuItem } from "@wrappid/styled-components";

export default function CoreMenuItem(props) {
  return <SCMenuItem {...props}>{props.children}</SCMenuItem>;
}
