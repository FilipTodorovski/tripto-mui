import PropTypes from "prop-types";

import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows, { customShadows } from "./shadows";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const themeOptions = {
    palette: { ...palette.light, mode: "light" },
    shape,
    typography,
    breakpoints,
    shadows: shadows.light,
    customShadows: customShadows.light,
  };

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
