import { trailer_base } from "../../generated/jikan";

export interface TrailerProps {
  trailer: trailer_base | undefined;
}

const Trailer: React.FC<TrailerProps> = ({ trailer }) => {
  if (typeof trailer?.embed_url !== "string") {
    return null;
  }
  return (
    <>
      <h2>Trailers</h2>
      <hr></hr>
      <iframe
        className="trailer"
        title={trailer.embed_url}
        src={trailer.embed_url}
      ></iframe>
    </>
  );
};

export default Trailer;
