import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { Contact } from "../LandingPage/Contact/Contact";
import Navbar from "../LandingPage/Navbar/navbar";
import { Servicedetail } from "../LandingPage/ServiceDetail/Servicedetail";
import Blog from "../LandingPage/Blogs/blogs";
import { Footer } from "../LandingPage/Footer/footer";
import ScrollToTopButton from "../Components/ScrollTopButton/scrolTopBtn";
import TeamDev from "../LandingPage/teamDev/teamDev";
import NotFound from "../Components/notFoundPage/notFound";
import { References } from "../LandingPage/References/References";
import { Inscription } from "../Formations/Inscription/Inscription";
import Login from "../Admin/Login/login";
import Dashboard from "../Admin/Dashboard/dashboard";
import FormationDashboard from "../Admin/Dashboard/Views/formations/formations";
import FormateurDashboard from "../Admin/Dashboard/Views/formateur/formateur";
import ModuleDashboard from "../Admin/Dashboard/Views/module/module";
import ReservationDashboard from "../Admin/Dashboard/Views/reservation/reservation";
import ClientDashboard from "../Admin/Dashboard/Views/client/client";
import StatistiquesDashboard from "../Admin/Dashboard/Views/home/home";
import { RegisterForm } from "../Admin/Register/Register";
import RequiredAuth from "./requiredAuth";
import { LangueContext } from "../Context/LangueContext";
import Cookies from 'js-cookie'


export default function RouterApp() {
  const token = Cookies.get('token') 

  return (
    <>
      <ScrollToTopButton />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Navbar />
              <LandingPage />
             <References />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/contact"
          element={
            <Fragment>
              <Navbar />
              <Contact />
              <References />

              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/blogs"
          element={
            <Fragment>
              <Navbar />
              <Blog />
             <References />
              <Footer />


            </Fragment>
          }
        />
        <Route
          path="/service/:id"
          element={
            <Fragment>
              <Navbar />
              <Servicedetail />
             <References />

              <Footer />


            </Fragment>
          }
        />
        <Route
          path="formation/:id"
          element={
            <Fragment>
              <Navbar />
              <Inscription />
             <References />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="team-dev"
          element={
            <Fragment>
              <Navbar />
              <TeamDev />
              <Footer />
            </Fragment>
          }
        />
     
        <Route path="*" element={
          
          <Fragment>
              <Navbar />
              <NotFound />
              <Footer />
            </Fragment>
        } />


<Route path="/login" element={
  token ? 
  <Navigate to='/dashboard/statistiques' />
  : <Fragment>
  <Navbar />
  <Login />
  <Footer />
</Fragment>
} />
<Route path="/register" element={<RegisterForm />} />
        <Route  element={<RequiredAuth />}>

          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="statistiques" element={<StatistiquesDashboard />} />
            <Route path="formations" element={<FormationDashboard />} />
            <Route path="formateurs" element={<FormateurDashboard />} />
            <Route path="modules" element={<ModuleDashboard />} />
            <Route path="reservations" element={<ReservationDashboard />} />
            <Route path="clients" element={<ClientDashboard />} />
          </Route>
          </Route>

      </Routes>
     
    </>
  );
}



