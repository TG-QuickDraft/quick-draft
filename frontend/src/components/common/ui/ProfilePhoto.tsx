import MockProfile from "@/assets/mock-profile.png";

const ProfilePhoto = ({ photoPath }: { photoPath: string | undefined }) => {
  return (
    <div className="flex w-full justify-center items-center">
      <img
        className="rounded-full shadow-xl w-50 h-50"
        src={photoPath ? photoPath : MockProfile}
        height={200}
      />
    </div>
  );
};

export default ProfilePhoto;
