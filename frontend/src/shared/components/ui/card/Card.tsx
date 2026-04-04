import DetailsButton from "../buttons/DetailsButton";
import ProfilePhoto from "../ProfilePhoto";
import CardWrapper from "./CardWrapper";

const Card = ({
  photoPath,
  title = "Title",
  subtitle = "Subtitle",
  description = "Description",
  btnLabel = "Detalhes",
}: {
  photoPath?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  btnLabel?: string;
}) => {
  return (
    <CardWrapper>
      <div className="flex items-center w-full gap-5">
        <div className="w-fit">
          <ProfilePhoto photoPath={photoPath} size="md" />
        </div>

        <div className="flex-1">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p>{description}</p>
        </div>

        <DetailsButton>{btnLabel}</DetailsButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
