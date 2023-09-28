import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

  const {request, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=66e8eb9f1820170f4933afc4b335abfa';
    const _baseOffset = 210;

  const getAllCharsLength = async () => {
    const res = await request(`${_apiBase}characters?&${_apiKey}`);
    return res.data.total;
  }

  const getAllCharacters = async(offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      if (!res || !res.data || !res.data.results[0]) {
        throw new Error('Data is not available');
      }
      return _transformCharacter(res.data.results[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

  const _transformCharacter = (char) => {
    return {
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        id: char.id,
        comics: char.comics.items
    }
  }

  const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

  return { 
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComics,
    getCharacterByName,
    process, 
    setProcess,
  }
}
export default useMarvelService;
