import { GetStaticProps, NextPage } from "next";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import SEO from "components/SEO";
import Footer from "components/footer/Footer";
import IndexLayout from "components/layouts/IndexLayout";

import JobCarousel from "pages-sections/jobs/JobCarousel";
import Job from "models/Job.model";
import AllJobs from "pages-sections/jobs/AllJobs";
import * as api from "api/jobs";

// =====================================================
type IndexProps = {
  products: Job[];
  popularProducts: Job[];
  trendingProducts: Job[];
};
// =====================================================

const Index: NextPage<IndexProps> = (props) => {

  return (
    <IndexLayout showNavbar={false} showTopbar={false}>
      <SEO title="案件紹介サイト" />

      {/* SIDEBAR WITH OTHER CONTENTS */}

      <Stack spacing={6} mt={2}>

        <Fragment>
          {/* POPULAR PRODUCTS AREA */}
          <JobCarousel
            title="人気案件"
            jobs={props.popularProducts}
          />

          {/* TRENDING PRODUCTS AREA */}
          <JobCarousel
            title="気になる案件"
            jobs={props.trendingProducts}
          />

          {/* ALL PRODUCTS AREA */}
          <AllJobs jobs={props.products} />
        </Fragment>

        {/* FOOTER AREA */}
        <Footer />
      </Stack>
    </IndexLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = JSON.parse(await (await fetch("http://nginx:80/api/jobs")).text());
  const popularProducts = products;
  const trendingProducts = products;
  const grocery1NavList = products;

  return {
    props: {
      products,
      grocery1NavList,
      popularProducts,
      trendingProducts,
    },
  };
};

export default Index;
