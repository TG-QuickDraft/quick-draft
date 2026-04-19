import Rating from "react-rating";
import type { ComponentType, ReactNode } from "react";

import { StarEmptyIcon } from "@/shared/assets";
import { StarFullIcon } from "@/shared/assets";

interface StarRatingProps {
  rating: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  emptySymbol?: ReactNode;
  fullSymbol?: ReactNode;
}

type RatingComponentProps = {
  readonly?: boolean;
  initialRating?: number;
  emptySymbol?: ReactNode;
  fullSymbol?: ReactNode;
  onChange?: (value: number) => void;
};

const RatingComponent =
  Rating as unknown as ComponentType<RatingComponentProps>;

const StarRating = ({
  rating,
  onChange,
  readonly = false,
  emptySymbol,
  fullSymbol,
}: StarRatingProps) => {
  return (
    <RatingComponent
      readonly={readonly}
      initialRating={rating}
      emptySymbol={
        emptySymbol || (
          <StarEmptyIcon className="mx-0.5 h-5.25 text-neutral-60" />
        )
      }
      fullSymbol={fullSymbol || <StarFullIcon className="mx-0.5 h-5.2" />}
      onChange={onChange}
    />
  );
};

export default StarRating;
