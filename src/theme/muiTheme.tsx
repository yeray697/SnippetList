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
    maxWidth: 100,
    margin: 28,
  },
  breakpointColumnsObj: {
    default: 1,
    5000: 4,
    1280: 3,
    960: 2,
    500: 1,
  },
});

//using the variable in order to access the spacing function
// muiTheme.overrides = {
//   MuiCardContent: {
//     root: {
//       //Setting same padding as all the other elements
//       '&:last-child': {
//         paddingBottom: muiTheme.spacing(2),
//       },
//     },
//   },
// };

export default muiTheme;
