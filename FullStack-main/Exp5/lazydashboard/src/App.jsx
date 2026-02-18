import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

const delayImport = (component) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(component()), 1500);
  });

const Profile = lazy(() => delayImport(() => import("./pages/Profile")));
const Dashboard = lazy(() => delayImport(() => import("./pages/Dashboard")));
const Achievements = lazy(() =>
  delayImport(() => import("./pages/Achievements"))
);


function AppWrapper() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Suspense
        fallback={
          <h2 style={{ textAlign: "center" }}>Loading Page...</h2>
        }
        key={location.pathname}
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </Suspense>

      <div className="buttons">
        <Link to="/profile"><button>Go To Profile</button></Link>
        <Link to="/dashboard"><button>Go To Skills</button></Link>
        <Link to="/achievements"><button>Go To Achievements</button></Link>
      </div>
    </div>
  );
}

export default AppWrapper;