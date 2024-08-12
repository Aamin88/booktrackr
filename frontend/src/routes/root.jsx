import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Spinner } from "../components";

function Root() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Spinner />;
  }

  return (
    <div className="root__page">
      <div className="root__page-container ">
        <div className="root__page-container_header section__padding">
          <Navbar />
          <Header />
        </div>
      </div>
      <div className="root__page-container_content">
        {navigation.state === "loading" || navigation.state === "pending" ? (
          <Spinner />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Root;
