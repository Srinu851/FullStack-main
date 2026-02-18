import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dash = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./componenets/dashboard"));
    }, 3000); // 3000ms = 3 seconds delay
  })
);


function Profile() {
  return (
    <>
      <h1>Srinivas Akkinapalli</h1>
      <h2>Full Stack Developer</h2>
      <Link to="/dashboard">Go to Dashboard</Link>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1 className="lazy">Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dash />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;