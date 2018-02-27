import {createMuiTheme} from "material-ui/styles";
import primary from "material-ui/colors/blueGrey";
import secondary from "material-ui/colors/deepOrange";
import error from "material-ui/colors/red";

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: secondary,
    error: error,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default theme;
