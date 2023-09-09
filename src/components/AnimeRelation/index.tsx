import { anime_full } from "../../generated/jikan";
import { isEmptyArray } from "../../helpers/array";

export interface AnimeRelationProp {
  animeData: anime_full | undefined;
}

const AnimeRelation: React.FC<AnimeRelationProp> = ({ animeData }) => {
  const animeDataRelations = animeData?.relations;
  if (isEmptyArray(animeDataRelations)) {
    return null;
  }
  const relationsMap = animeDataRelations?.map((relations) => (
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
};

export default AnimeRelation;
