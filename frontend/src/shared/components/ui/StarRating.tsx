import Rating from "react-rating";

import { StarEmptyIcon } from "@/shared/assets";
import { StarFullIcon } from "@/shared/assets";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Rating
      readonly
      initialRating={rating}
      emptySymbol={<StarEmptyIcon className="mx-1.5" />}
      fullSymbol={<StarFullIcon className="mx-1.5" />}
    />
  );
};

export default StarRating;
