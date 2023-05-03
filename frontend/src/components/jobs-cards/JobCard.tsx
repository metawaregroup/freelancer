import Link from "next/link";
import { FC, Fragment, useCallback, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Chip, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductViewDialog from "components/products/ProductViewDialog";
import { CartItem, useAppContext } from "contexts/AppContext";
import Job from "models/Job.model";

const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .controller": { display: "flex", bottom: 20 },
  },
}));


const ContentWrapper = styled(FlexBox)({
  minHeight: 110,
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ===============================================================
type JobCardProps = {
  job: Job;
};
// ===============================================================

const JobCard: FC<JobCardProps> = (props) => {
  const {
    job
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);



  return (
    <StyledBazaarCard>

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          <Link href={`/product/`}>
            <H3
              mb={1}
              title={job.name}
              fontSize="14px"
              textAlign="left"
              fontWeight="600"
              className="title"
              color="text.secondary"
            >
              {job.name}
            </H3>
          </Link>

          <FlexBox gap={1} alignItems="center" mt={0.5}>
            <Box fontWeight={600} color="text.secondary">
              {job.duties}
            </Box>
          </FlexBox>

          <FlexBox gap={1} alignItems="center" mt={0.5}>
            <Box fontWeight={600} color="primary.main">
              {job.price_from > 100000 ? String(job.price_from / 10000) + "万" : job.price_from}
            </Box>
          </FlexBox>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default JobCard;
