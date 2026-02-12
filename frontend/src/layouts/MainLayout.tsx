import Navbar from "./elements/Navbar";
import Container from "./elements/Container";
import Content from "./elements/Content";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
    </Container>
  );
};

export default MainLayout;
