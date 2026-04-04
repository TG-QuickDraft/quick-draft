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
        {photoPath && (
          <div className="w-fit">
            <ProfilePhoto photoPath={photoPath} size="md" />
          </div>
        )}

        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-3xl">{title}</h1>
          <h2 className="text-neutral-80">{subtitle}</h2>
          <p className="text-neutral-80">{description}</p>
        </div>

        <DetailsButton>{btnLabel}</DetailsButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
