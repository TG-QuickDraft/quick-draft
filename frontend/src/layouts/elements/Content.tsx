const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-full p-6">{children}</div>
    </div>
  );
};

export default Content;
