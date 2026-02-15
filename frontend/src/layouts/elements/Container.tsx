const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen text-white">{children}</div>
  );
};

export default Container;
