import MockProfile from "@/assets/mock-profile.png";
import clsx from "clsx";

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-50 h-50",
};

const ProfilePhoto = ({
  photoPath,
  size = "lg",
}: {
  photoPath: string | undefined;
  size?: keyof typeof sizes;
}) => {
  return (
    <div className="flex w-full justify-center items-center">
      <img
        className={clsx("rounded-full shadow-xl", sizes[size])}
        src={photoPath ? photoPath : MockProfile}
        height={200}
      />
    </div>
  );
};

export default ProfilePhoto;
