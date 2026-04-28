import ReactMarkdown from "react-markdown";

const texto = `### Test`;

export const TesteMarkdown = () => {
  return (
    <div className="prose">
      <ReactMarkdown>{texto}</ReactMarkdown>
    </div>
  );
};
