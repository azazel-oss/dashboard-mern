import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween.jsx";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import ProfileImage from "../assets/eustace.png";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

function Navbar(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/*  LEFT SIDE  */}
        <FlexBetween>
          <IconButton
            onClick={() => {
              console.log("Open/close sidebar");
            }}
          >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius={"9px"}
            gap={"3rem"}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder={"Search..."} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/*  RIGHT SIDE  */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
