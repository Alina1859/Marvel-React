import "./singleCharacterPage.scss";
import { HelmetProvider, Helmet } from "react-helmet-async";

const SingleCharacterPage = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-comic">
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={`${name} page`} />
          <title>{name}</title>
        </Helmet>
      </HelmetProvider>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterPage;
