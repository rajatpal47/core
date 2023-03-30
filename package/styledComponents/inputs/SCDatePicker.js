import { Input, styled } from "@mui/material";
import { CoreClasses } from "@wrappid/styles";
import { getEffectiveStyle } from "@wrappid/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const defaultStyleClasses = [
  CoreClasses.SC.INPUTS.DATE_PICKER,
  ...CoreClasses.LAYOUT.FULL_WIDTH,
];

export const SCDatePicker = styled(
  DesktopDatePicker,
  {}
)((props) => ({
  ...getEffectiveStyle([
    ...defaultStyleClasses,
    ...(props?.styleClasses || []),
  ]),
}));
