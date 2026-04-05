const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-neutral-20 rounded-2xl p-6 flex justify-between items-center">
      {children}
    </div>
  );
};

export default CardWrapper;
