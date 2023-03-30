import { styled, TextField } from "@mui/material";
import { CoreClasses } from "@wrappid/styles";
import { getEffectiveStyle } from "@wrappid/styles";

const defaultStyleClasses = [
  CoreClasses.SC.INPUTS.TEXT_FIELD, // specific styled components classes const goes in StyledComponentsClasses.js
  CoreClasses.DATA_DISPLAY.CORE_TEXT, // This was previously given as default need to revisit and remove
];

export const SCTextField = styled(
  TextField,
  {}
)((props) => ({
  ...getEffectiveStyle([
    ...defaultStyleClasses,
    ...(props?.styleClasses || []),
  ]),
}));
