import { Fragment, useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import Subscriptions from "./subscription/subscriptions";
import MultiLineChart from "./Chart/chart";

export default function StatistiquesDashboard() {
  const [statics, setStatics] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/statistics")
      .then((response) => {
        setStatics(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // console.log(statics);

  return (
    <Fragment>
      <div className="parentHomeDashboard">
        <div className="chemin">
          <h6>Dashboard / Statistiques</h6>
        </div>
        <div className="TitleDashboard">
          <h1>STATISTIQUES</h1>
          <div className="keys">
            <p>
              <div className="greenDiv"></div> Compter
            </p>
            <p>
              <div className="orangeDiv"></div> Mis à la poubelle
            </p>
          </div>
        </div>
        <div className="Statics">
          <ul>
            <li>
              <div className="triangleStatic">
                <i className="bx bx-news"></i>
                <div className="textStatic">
                  <h3>Formations</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.formationsCount}</h2>
                      <h2>-{statics.formationsCountTrashed}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="triangleStatic">
                <i className="bx bxs-cheese"></i>
                <div className="textStatic">
                  <h3>Modules</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.modulesCount}</h2>
                      <h2>-{statics.modulesCountTrashed}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="triangleStatic">
                <i className="bx bxs-id-card"></i>
                <div className="textStatic">
                  <h3>Formateurs</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.formateursCount}</h2>
                      <h2>-{statics.formateursCountTrashed}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="triangleStatic">
                <i className="bx bxs-user-detail"></i>
                <div className="textStatic">
                  <h3>Clients</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.clientsCount}</h2>
                      <h2>-{statics.clientsCountTrashed}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="triangleStatic">
                <i className="bx bxs-calendar-edit"></i>
                <div className="textStatic">
                  <h3>Reservations</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.reservationsCount}</h2>
                      <h2>-{statics.reservationsCountTrashed}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="triangleStatic">
                <i className="bx bx-data"></i>
                <div className="textStatic">
                  <h3>Subscriptions</h3>
                  {statics && (
                    <div>
                      <h2>+{statics.subscriptionsCount}</h2>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="parentSecondStatics">
            <MultiLineChart />
            <Subscriptions />
        </div>
      </div>
    </Fragment>
  );
}
