const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh text-black">{children}</div>
  );
};

export default Container;
