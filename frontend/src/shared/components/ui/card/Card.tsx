import DetailsButton from "../buttons/DetailsButton";
import ProfilePhoto from "../ProfilePhoto";
import CardWrapper from "./CardWrapper";

const Card = ({
  title = "Title",
  subtitle = "Subtitle",
  description = "Description",
}: {
  title?: string;
  subtitle?: string;
  description?: string;
}) => {
  return (
    <CardWrapper>
      <div className="flex items-center w-full gap-5">
        <div className="w-fit">
          <ProfilePhoto photoPath="" size="md" />
        </div>

        <div className="flex-1">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p>{description}</p>
        </div>

        <DetailsButton>Detalhes</DetailsButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
