import { HelmetProvider, Helmet } from "react-helmet-async";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Page with list of our comics" />
          <title>Comics page</title>
        </Helmet>
      </HelmetProvider>
      <ComicsList />
      <AppBanner />
    </>
  );
};

export default ComicsPage;
