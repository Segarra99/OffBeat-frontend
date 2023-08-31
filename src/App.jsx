import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import isAnon from "./Components/IsAnon";
import isPrivate from "./Components/isPrivate";

/* Import all the pages */
import HomePage from "./Pages/Home";
import BandListPage from "./Pages/BandList";
import CreateBandPage from "./Pages/CreateBand";
import EditBandPage from "./Pages/EditBand";
import ProfilePage from "./Pages/Profile";
import EditProfilePage from "./Pages/EditProfile";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import IsPrivate from "./Components/isPrivate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <isAnon>
              <SignupPage />
            </isAnon>
          }
        />
        <Route
          path="/login"
          element={
            <isAnon>
              <LoginPage />
            </isAnon>
          }
        />
        <Route
          path="/bands"
          element={
            <isPrivate>
              <BandListPage />
            </isPrivate>
          }
        />
        <Route
          path="/bands/create"
          element={
            <isPrivate>
              <CreateBandPage />
            </isPrivate>
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
