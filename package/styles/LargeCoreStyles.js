import { LARGE_WINDOW_WIDTH, X_LARGE_WINDOW_WIDTH } from "../config/constants";
import { defaultUtilityStyles, DEFAULT_PADDING,
	IMPORTANT, largeUtilityStyles } from "@wrappid/styles";

const MIN_WIDTH = LARGE_WINDOW_WIDTH;
const MAX_WIDTH = X_LARGE_WINDOW_WIDTH - 1;

export const largeCoreStyles = {
	devBorder: { ...defaultUtilityStyles.borderSuccess },
	authBanner: {
		backgroundImage   : "url(./images/welcome-bg.png)",
		backgroundPosition: "center",
		backgroundSize    : "cover",
		backgroundRepeat  : "no-repeat",
		height            : "100%",
	},
	authForm         : { height: "100%" },
	authFormContainer: { width: "60%" },
	authContainer    : { height: "100%" },
	profileBarWidth  : { maxWidth: "25vw" },
};