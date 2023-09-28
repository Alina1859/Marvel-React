import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage"));
const Page404 = lazy(() => import("../pages/Page404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicsPage = lazy(() => import('../pages/singleComicsLayout/SingleComicsPage'));
const SingleCharacterPage = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterPage'));
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route exact path="/comics/:id" element={
                <SinglePage 
                  Component={SingleComicsPage} 
                  dataType="comics" />}
                />
              <Route exact path="/characters/:id" element={
                <SinglePage
                  Component={SingleCharacterPage}
                  dataType="character"/>}
                />
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
