import { FC, useEffect, useState } from "react";
import { Box, styled, useTheme } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { Paragraph } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import CategorySectionCreator from "components/CategorySectionCreator";
import Job from "models/Job.model";
import JobCard from "components/jobs-cards/JobCard";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// =================================================================
type JobCarouselProps = { title: string; jobs: Job[] };
// =================================================================

const JobCarousel: FC<JobCarouselProps> = ({ jobs, title }) => {
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator title={title} seeMoreLink="#" mb={0}>
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Carousel
        infinite={true}
        totalSlides={jobs.length}
        visibleSlides={visibleSlides}
        sx={{
          "& #backArrowButton, #backForwardButton": {
            width: 40,
            height: 40,
            background: "#fff",
            boxShadow: shadows[2],
            color: palette.primary.main,
          },
        }}
      >
        {jobs.map((item, index) => (
          <Box pb={2} key={index}>
            <JobCard
              job={item}

            />
          </Box>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default JobCarousel;
