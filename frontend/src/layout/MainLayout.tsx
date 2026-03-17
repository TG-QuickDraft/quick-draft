import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Content from "./components/Content";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
    </Container>
  );
};

export default MainLayout;
