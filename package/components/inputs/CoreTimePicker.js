// eslint-disable-next-line unused-imports/no-unused-imports, no-unused-vars
import React from "react";

// eslint-disable-next-line import/no-unresolved
import { NativeTimePicker } from "@wrappid/native";

export default function CoreTimePicker(props) {
  return (
    <NativeTimePicker {...props} />
  );
}
CoreTimePicker.validProps = [
  {
    name : "formik",
    types: [{ type: "object" }]
  }
];
CoreTimePicker.invalidProps = [];