import { transition, container } from "../jss/dashBoard.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: "20px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  },
  root: {
      width: '97%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
  },
  table: {
      minWidth: 700,
  },
  row: {
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
      },
      '&:nth-of-type(even)': {
          backgroundColor: theme.palette.background.default,
      },
  },
  cell0:{
      width:"13%",
      textAlign: 'center',
  },
  cell: {
      paddingTop: 35,
      paddingBottom: 35,
      backgroundColor:"#f0f0f0",
  },
});

export default appStyle;
