import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#0074D9" },
    secondary: { main: "#01FF70" }
  },
  typography: { useNextVariants: true }
});
