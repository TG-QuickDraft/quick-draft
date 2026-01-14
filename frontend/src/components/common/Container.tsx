const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid p-8 min-h-screen text-white">{children}</div>;
};

export default Container;
