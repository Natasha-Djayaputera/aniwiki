import { useLocation } from "react-router-dom";
import AnimeInfo from "../../components/AnimeInfo";
import Character from "../../components/Character";
import ContentItem from "../../components/ContentItem";
import Relation from "../../components/Relation";
import Review from "../../components/Review";
import Trailer from "../../components/Trailer";
import { titles } from "../../enum/titles";
import { getFirstTitleOfType } from "../../helpers/title";
import { useAnimeReviews } from "../../hooks/useAnimeReviews";
import { useFullAnime } from "../../hooks/useFullAnime";

const AnimePage: React.FC = () => {
  const path = useLocation();
  const id = Number(path.pathname.split("/").pop());
  const animeData = useFullAnime(id);
  const animeReviews = useAnimeReviews(id);
  console.log(animeData);

  if (animeData === undefined) {
    return null;
  }

  const defaultTitle = getFirstTitleOfType(
    animeData.titles,
    titles.type.DEFAULT
  );

  return (
    <main>
      <div className="content anime-page-grid">
        <div>
          <h1>{defaultTitle.title}</h1>
          <Trailer trailer={animeData.trailer} />
          <ContentItem itemTitle="Synopsis" itemData={animeData.synopsis} />
          <ContentItem itemTitle="Background" itemData={animeData.background} />
          <Relation animeData={animeData} />
          <Character id={id} />
          <Review title="Latest Reviews" itemData={animeReviews} />
        </div>
        <AnimeInfo animeData={animeData} />
      </div>
    </main>
  );
};

export default AnimePage;
