import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { SectionCard } from ".";
import { useTheme } from "@mui/material/styles";
import {
  buttonStyle,
  xreDes,
  xreaBgStyle,
  barImgContainer,
  iconContainer,
  smallTextStyle,
  xreaTitleStyle,
  xreaButtonContainer,
  card2BuronContainer,
} from "app";
import { SectionCard2 } from "./section-card-2";

export const Methodology = ({ children }) => {
  const theme = useTheme();
  const iconStyle = {
    color: theme.palette.primary.main,
    fontSize: "3rem",
  };
  const sectionCard2Props = {
    title: "XREA methodology",
    description: "Newest data, sharpest insights,",
    description2: "greatest detail.",
    imageSection: (
      <>
        <Stack flexDirection={"row"} alignItems={"end"}>
          <Box sx={barImgContainer}>
            <img
              src="/playground_assets/greenbar1.svg"
              alt="image5144"
              className="img-width"
            />
          </Box>
          <Box sx={barImgContainer}>
            <img
              src="/playground_assets/greenbar2.svg"
              alt="image5144"
              className="img-width"
            />
          </Box>
          <Box sx={barImgContainer}>
            <Stack sx={iconContainer} alignItems={"center"}>
              <img
                src="/playground_assets/star.svg"
                alt="image5144"
                className="img-width"
              />
              <Typography sx={smallTextStyle}>TOP-rated by XREA</Typography>
            </Stack>
            <img
              src="/playground_assets/greenbar3.svg"
              alt="image5144"
              className="img-width"
            />
          </Box>
        </Stack>
        <Stack
          sx={{ ...card2BuronContainer, display: { xs: "flex", md: "none" } }}
        >
          <Button
            sx={{ ...buttonStyle, width: "fit-content" }}
            variant="contained"
          >
            {" "}
            Learn More
          </Button>
        </Stack>
      </>
    ),
    bgStyle: xreaBgStyle,
    button: {
      buttonLable: "Learn More",
    },
  };
  return <SectionCard2 props={sectionCard2Props} />;
};
