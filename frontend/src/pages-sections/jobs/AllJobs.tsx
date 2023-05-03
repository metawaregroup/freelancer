import { FC } from "react";
import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import CategorySectionCreator from "components/CategorySectionCreator";
import Job from "models/Job.model";
import JobCard from "components/jobs-cards/JobCard";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ========================================================
type AllJobsProps = { jobs: Job[]; title?: string };
// ========================================================

const AllJobs: FC<AllJobsProps> = ({
  jobs,
  title = "全ての案件",
}) => {
  return (
    <CategorySectionCreator title={title} seeMoreLink="#">
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Grid container spacing={3}>
        {jobs.map((item, index) => (
          <Grid key={index} item md={4} sm={6} xs={12}>
            <JobCard
              job={item}
            />
          </Grid>
        ))}
      </Grid>


    </CategorySectionCreator>
  );
};

export default AllJobs;
