import { createTheme } from "@mui/material/styles";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme = (customization:any) => {
	const color = colors;

	const themeOption = {
		colors: color,
		heading: color.grey900,
		paper: color.paper,
		backgroundDefault: color.myBlue,
		background: color.primaryLight,
		darkTextPrimary: color.grey700,
		darkTextSecondary: color.grey500,
		textDark: color.grey900,
		menuSelected: color.secondaryDark,
		menuSelectedBack: color.secondaryLight,
		divider: color.grey200,
		customization
	};

	const themeOptions = {
		direction: "ltr",
		palette: themePalette(themeOption),
		mixins: {
			toolbar: {
				minHeight: "48px",
				padding: "16px",
				"@media (min-width: 600px)": {
					minHeight: "48px"
				}
			}
		},
		typography: themeTypography(themeOption),
	};

	const themes = createTheme({...themeOptions, 
		breakpoints:{
			values:{
				xs: 0,
				sm: 600,
				tsm: 850,
				md: 900,
				lg: 1200,
				xl: 1480,
			}
		}
	});
	themes.components = componentStyleOverrides(themeOption);

	return themes;
};

export default theme;
