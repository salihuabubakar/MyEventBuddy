import { useRouteError } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button/button";



export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/app/dashboard", { replace: true });
  };
  return (
    <>
      {/* <Helmet>
        <title>Error 404</title>
        <meta name="description" content="Error page" />
      </Helmet> */}
      <div className="error-box">
        <h1>404</h1>
        <h3>
          <i className="fa fa-warning" /> Oops!{" "}
          {error?.statusText || error?.message}!
        </h3>
        <p>The page you requested was not found.</p>
        <div className="lg:w-[25%] lg:m-auto">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" size="lg" onClick={handleRedirect}>
            Home
          </Button>
        </div>
      </div>
    </>
  );
}
