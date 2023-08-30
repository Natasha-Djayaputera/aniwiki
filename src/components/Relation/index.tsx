import { anime_full } from "../../generated/jikan";

export interface RelationProp {
  animeData: anime_full | undefined;
}

const Relation: React.FC<RelationProp> = ({ animeData }) => {
  if (animeData === undefined) {
    return null;
  } else if (
    animeData.relations === undefined ||
    animeData.relations.length === 0
  ) {
    return null;
  } else {
    const relationsMap = animeData.relations?.map((relations) => (
      <p key={`${relations.relation}`} className="relation">
        {relations.relation}
        {relations.entry?.map((entry) => (
          <div className="flex column">
            <a
              key={`${entry.mal_id}`}
              className={`relation-entry ${
                relations.relation === "Adaptation" ? "disable" : ""
              }`}
              href={`/anime/${entry.mal_id}`}
            >
              {entry.name}
            </a>
          </div>
        ))}
      </p>
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

export default Relation;
