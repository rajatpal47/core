import React from "react";
import { NativeIcon } from "@wrappid/styled-components";

export const __IconTypes = {
  MATERIAL_ICON: "material-icons", // Default support of MUI
  MATERIAL_OUTLINED_ICON: "material-icons-outlined",
  FONTAWESOME_V5_SOLID_ICON: "fas",
  FONTAWESOME_V5_REGULAR_ICON: "far",
  RXICON_V1_REGULAR_ICON: "rxi",
};

/**
 * - important notice
 * - children > props > options(local/db) > default
 *
 * @param {*} props
 * @returns
 */
export default function CoreIcon(props) {
  const { type, icon, options, sx, ...restProps } = props;

  let tmpType = type || __IconTypes[options?.type] || __IconTypes.MATERIAL_ICON;
  let tmpIcon = props.children || icon || options?.icon || "";

  return (
    <NativeIcon
      type={tmpType}
      name={tmpIcon}
      size={props.size}
      childrenFlag={
        tmpType === __IconTypes.MATERIAL_ICON ||
        tmpType === __IconTypes.MATERIAL_OUTLINED_ICON
          ? true
          : false
      }
      sx={
        type === __IconTypes.MATERIAL_ICON ? sx : { ...sx, overflow: "unset" }
      }
      styleClasses={props.styleClasses || []}
      {...restProps}
    />
  );
}
