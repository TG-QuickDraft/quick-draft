import Rating from "react-rating";

import StarEmpty from "@/assets/icons/ui/rating/star-empty.svg?react";
import StarFull from "@/assets/icons/ui/rating/star-full.svg?react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Rating
      readonly
      initialRating={rating}
      emptySymbol={<StarEmpty className="mx-1.5" />}
      fullSymbol={<StarFull className="mx-1.5" />}
    />
  );
};

export default StarRating;
