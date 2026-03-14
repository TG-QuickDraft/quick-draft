import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Content from "./components/Content";
import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/buttons/Button";
import { GoHome } from "react-icons/go";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
      <div className="fixed bottom-0 left-0 flex p-6 gap-5">
        <Link to="/">
          <Button icon={<GoHome />} variant="secondary">
            New Home
          </Button>
        </Link>
        <Link to="/old-home">
          <Button icon={<GoHome />} variant="secondary">
            Old Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default MainLayout;
