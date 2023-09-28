import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import "./singleComicsPage.scss";

const SingleComicsPage = () => {
  const { id } = useParams();
  const [comics, setComics] = useState(null);

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateComics = () => {
    clearError();
    getComics(id).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comics) ? (
    <View comics={comics} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comics }) => {
  const { title, description, pageCount, thumbnail, language, price } = comics;

  return (
    <div className="single-comic">
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={`${title} comics book`} />
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicsPage;
