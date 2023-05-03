import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Sticky from "components/Sticky";
import Topbar from "components/Topbar";
import Header from "components/header/Header";
import SearchInput from "components/search-box/SearchInputWithCategory";

// =======================================================
type IndexLayoutProps = {
  children: ReactNode;
  showNavbar?: boolean;
  showTopbar?: boolean;
};
// =======================================================

const IndexLayout: FC<IndexLayoutProps> = ({
  children,
  showTopbar = true,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  return (
    <Fragment>
      {/* TOPBAR */}
      {showTopbar && <Topbar />}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={0}>
        <Header isFixed={false} searchInput={<SearchInput />} />
      </Sticky>

      <Box zIndex={4} position="relative" className="section-after-sticky">
        {/* BODY CONTENT */}
        {children}
      </Box>
    </Fragment>
  );
};

export default IndexLayout;
