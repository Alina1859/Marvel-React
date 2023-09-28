import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from "../../resources/img/vision.png";
import gitHubIcon from "../../resources/img/github-logo.svg";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Marvel information portal" />
          <title>Marvel information</title>
        </Helmet>
      </HelmetProvider>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <a
        className="gitHub-logo"
        href="https://github.com/Alina1859/Marvel-React"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={gitHubIcon}
          width="130"
          height="50"
          alt="Link on project on Github"
        />
      </a>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
