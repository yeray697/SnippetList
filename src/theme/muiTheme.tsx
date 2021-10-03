import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
const muiTheme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  chip: {
    maxWidth: 46,
    margin: 5,
    borderWidth: 1.25,
    textPaddingSides: 8, //ToDo theme.spacing(1)
  },
  breakpointColumnsObj: {
    default: 1,
    5000: 4,
    1280: 3,
    960: 2,
    500: 1,
  },
});

muiTheme.overrides = {
  MuiChip: {
    labelSmall: {
      paddingLeft: muiTheme.chip.textPaddingSides,
      paddingRight: muiTheme.chip.textPaddingSides,
    },
    outlined: {
      borderWidth: muiTheme.chip.borderWidth,
    },
  },
};

export default muiTheme;
