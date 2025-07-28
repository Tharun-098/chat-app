import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import LoginRegister from "./pages/LoginRegister";
import HomePage from "./pages/HomePage";
import ChatWindow from "./components/ChatWindow";
import SettingPage from "./pages/SettingPage";
import UserInfo from "./pages/UserInfo";
import Chats from "./components/Chats";
import PrivateRoute from "./components/PrivateRoute";
import {Toaster} from 'react-hot-toast'
const App = () => {
  const { userr, login } = useContext(DataContext);
  return (
    <div>

    <Toaster/>
    <Routes>
      <Route path="/" element={login ? <HomePage /> : <LoginRegister />}>
        <Route index element={<ChatWindow />} />
        <Route path="chat/:id" element={<Chats />} />
      </Route>
      <Route
        path="/settings"
        element={
          <PrivateRoute userr={userr}>
            <SettingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/userprofile"
        element={
          <PrivateRoute userr={userr}>
            <UserInfo />
          </PrivateRoute>
        }
        />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
  );
};

export default App;
