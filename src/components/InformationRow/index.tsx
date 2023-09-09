import { Delimiter } from "../../enum/Delimiter";

export interface AnimePageItemRowProps {
  label: string;
  children: string | string[];
}

const InformationRow: React.FC<AnimePageItemRowProps> = ({
  label,
  children,
}) => {
  const formattedChildren = Array.isArray(children)
    ? children.join(Delimiter.COMMA)
    : children;
  return (
    <p>
      <b>{`${label}:`}</b> {formattedChildren}
    </p>
  );
};

export default InformationRow;
