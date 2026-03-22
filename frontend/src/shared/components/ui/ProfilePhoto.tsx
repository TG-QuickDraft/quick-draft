import { MockProfile } from "@/shared/assets";
import clsx from "clsx";

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-50 h-50",
};

const ProfilePhoto = ({
  photoPath,
  size = "lg",
  className,
  imgClassName
}: {
  photoPath: string | undefined;
  size?: keyof typeof sizes;
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <div className={clsx("flex w-full justify-center items-center", className)}>
      <img
        className={clsx("rounded-full shadow-xl, object-cover", sizes[size], imgClassName)}
        src={photoPath || MockProfile}
        onError={(e) => {
          e.currentTarget.src = MockProfile;
        }}
        height={200}
      />
    </div>
  );
};

export default ProfilePhoto;
