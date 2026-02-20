import Navbar from "./elements/Navbar";
import Container from "./elements/Container";
import Content from "./elements/Content";
import { Link } from "react-router-dom";
import Button from "@/components/common/ui/Button";
import { GoHome } from "react-icons/go";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
      <div className="flex p-6 gap-5">
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
