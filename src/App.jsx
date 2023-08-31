import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import IsAnon from "./Components/IsAnon";
import IsPrivate from "./Components/IsPrivate";

/* Import all the pages */
import HomePage from "./Pages/Home";
import BandListPage from "./Pages/BandList";
import CreateBandPage from "./Pages/CreateBand";
import EditBandPage from "./Pages/EditBand";
import ProfilePage from "./Pages/Profile";
import EditProfilePage from "./Pages/EditProfile";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/bands"
          element={
            <IsPrivate>
              <BandListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/create"
          element={
            <IsPrivate>
              <CreateBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/edit"
          element={
            <IsPrivate>
              <EditBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
