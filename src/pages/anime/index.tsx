import { useParams } from "react-router-dom";
import AnimeCharacter from "../../components/AnimeCharacter";
import AnimeRelation from "../../components/AnimeRelation";
import AnimeReview from "../../components/AnimeReview";
import AnimeSidebarInfo from "../../components/AnimeSidebarInfo";
import ContentItem from "../../components/ContentItem";
import Trailer from "../../components/Trailer";
import { TitleType } from "../../enum/titles";
import { getFirstTitleOfType } from "../../helpers/title";
import { useAnimeReviews } from "../../hooks/useAnimeReviews";
import { useFullAnime } from "../../hooks/useFullAnime";

const AnimePage: React.FC = () => {
  const { id } = useParams();
  const animeData = useFullAnime(Number(id));
  const animeReviews = useAnimeReviews(Number(id));
  console.log(animeData);

  if (animeData === undefined) {
    return null;
  }

  const defaultTitle = getFirstTitleOfType(animeData.titles, TitleType.DEFAULT);

  return (
    <main>
      <div className="content anime-page-grid">
        <div>
          <h1>{defaultTitle.title}</h1>
          <Trailer trailer={animeData.trailer} />
          <ContentItem itemTitle="Synopsis" itemData={animeData.synopsis} />
          <ContentItem itemTitle="Background" itemData={animeData.background} />
          <AnimeRelation animeData={animeData} />
          <AnimeCharacter animeId={Number(id)} />
          <AnimeReview title="Latest Reviews" animeReviewsData={animeReviews} />
        </div>
        <AnimeSidebarInfo animeData={animeData} />
      </div>
    </main>
  );
};

export default AnimePage;
