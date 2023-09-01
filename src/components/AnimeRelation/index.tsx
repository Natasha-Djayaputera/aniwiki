import { anime_full } from "../../generated/jikan";

export interface AnimeRelationProp {
  animeData: anime_full | undefined;
}

const AnimeRelation: React.FC<AnimeRelationProp> = ({ animeData }) => {
  if (animeData === undefined) {
    return null;
  } else if (
    animeData.relations === undefined ||
    animeData.relations.length === 0
  ) {
    return null;
  } else {
    const relationsMap = animeData.relations?.map((relations) => (
      <div key={`${relations.relation}`} className="flex column">
        <p className="relation">{relations.relation}</p>
        {relations.entry?.map((entry) => (
          <a
            key={`${entry.mal_id}`}
            className={`relation-entry ${
              relations.relation === "Adaptation" ? "disable" : ""
            }`}
            href={`/anime/${entry.mal_id}`}
          >
            {entry.name}
          </a>
        ))}
      </div>
    ));
    return (
      <>
        <h2>Related Anime</h2>
        <hr></hr>
        {relationsMap}
      </>
    );
  }
};

export default AnimeRelation;
