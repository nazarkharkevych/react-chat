import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { ChatRoomEmpty } from "../pages/ChatRoomEmpty";
import { ChatRoom } from "../pages/ChatRoom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ChatRoomEmpty />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path=":chatId" element={<ChatRoom />} />
      </Route>
    </Routes>
  );
};
