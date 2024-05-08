import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <Fragment>
      <div className="parentNotFound">
        <div className="notFound">
          <h1>404</h1>
          <p>Cette page n'a pas été trouvée. Retournez à la page d'accueil.</p>
          <button className="btnSeeMoreServices">
            <Link to="/">
              <i className="bx bx-arrow-back"></i>
            </Link>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
