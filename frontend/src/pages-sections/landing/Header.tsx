import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Link as Scroll } from "react-scroll";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { styled, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";
import clsx from "clsx";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    fontWeight: 500,
    "&:hover": { color: theme.palette.primary.main },
  },

  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": { color: "inherit" },
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" },
  },
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = () => setOpen((open) => !open);

  const scrollListener = debounce(() => {
    if (window?.pageYOffset >= headerHeight) setFixed(true);
    else setFixed(false);
  }, 50);

  useEffect(() => {
    if (!window) return null;

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <Fragment>
      <HeaderWrapper>
        <Box className={clsx({ fixedHeader: isFixed })}>
          <Container>
            <FlexBox height={headerHeight} alignItems="center">
              <Scroll to="top" duration={400} smooth={true} isDynamic>
                <Box sx={{ cursor: "pointer" }}>
                  <Image
                    width="96px"
                    height="44px"
                    src="/assets/images/logo.png"
                    alt="logo"
                  />
                </Box>
              </Scroll>

              <Box sx={{ mx: "auto" }}></Box>
            </FlexBox>
          </Container>
        </Box>
      </HeaderWrapper>

      {isFixed && <Box height={headerHeight} />}
    </Fragment>
  );
};

export default Header;
