import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import UserMain from "./components/component/UserMain";
import Login from "./components/Login/Login";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "http://localhost:3001";
const AppContext = createContext();

function App() {
  const [UserLogin, setUserLogin] = useState("");
  const [ArrayUser, setArrayUser] = useState([""]);
  const [ArrChat, setArrChat] = useState([]);
  const [ArrRoom, setArrRoom] = useState([]);
  const [FilterArrayUser, setFilterArrUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [UserList, setUserList] = useState([]);
  const [ListShowBoxChat, setListShowBoxChat] = useState([
    "private",
    "public",
    "group",
  ]);
  const [ShowBoxChat, setShowBoxChat] = useState([]);

  // Group
  const [RoomGroup, setRoomGroup] = useState([]);
  const [RoomName, setRoomName] = useState("");
  const [ShowChatGroup, setShowChatGroup] = useState("");

  const [Room, setRoom] = useState("");
  const [IdMsg, setIdMsg] = useState(0);
  const [Sender, setSender] = useState("");
  const [Receiver, setReceiver] = useState("");
  const [Message, setMessage] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      transports: ["websocket"],
    });
  }, [CONNECTION_PORT]);

  const handleClickActive = () => {
    socket.emit("userLogin", UserLogin);
    socket.emit("group_chat", { room: "" });
  };

  useEffect(() => {
    socket.on("user_list", (data) => {
      setArrayUser(data);
    });
    socket.on("receive_message", (data) => {
      setArrChat(data);
    });
  }, []);

  useEffect(() => {
    const Arr = {
      room: Room,
      id: IdMsg,
      sender: Sender,
      receiver: Receiver,
      message: Message,
    };
    if (Room !== "") {
      socket.emit("send_message", Arr);
    }
  }, [Message]);

  useEffect(() => {
    if (ArrayUser.length > 1) {
      const newRoom = [];
      for (let i = 0; i < ArrayUser.length; i++) {
        for (let j = i + 1; j < ArrayUser.length; j++) {
          newRoom.push(`${ArrayUser[i]}x${ArrayUser[j]}`);
        }
      }
      newRoom.map((room) => {
        socket.emit("send_message", {
          room: room,
          id: 1,
          receiver: "",
          message: "undefinedXNull",
        });
      });
      setArrRoom(newRoom);
    }
  }, [ArrayUser]);

  useEffect(() => {
    const newArrayUser = [...ArrayUser];
    const findMainUser = newArrayUser.filter(
      (arrUser) => arrUser !== UserLogin
    );
    setFilterArrUser(findMainUser);
  }, [ArrayUser]);

  useEffect(() => {
    const newArrayUser = [...ArrayUser];
    if (searchUser.length > 0) {
      const findMainUser = newArrayUser.filter(
        (arrUser) => arrUser === searchUser
      );
      setFilterArrUser(findMainUser);
    } else {
      const findMainUser = newArrayUser.filter(
        (arrUser) => arrUser !== UserLogin
      );
      setFilterArrUser(findMainUser);
    }
  }, [searchUser]);

  useEffect(() => {
    socket.on("group_message", (data) => {
      setRoomGroup(data);
    });
  }, [RoomName]);

  return (
    <AppContext.Provider
      value={{
        socket,
        ArrayUser,
        UserLogin,
        ArrChat,
        ArrRoom,
        setRoom,
        setIdMsg,
        setMessage,
        setSender,
        setReceiver,
        setSearchUser,
        setUserList,
        UserList,
        ShowBoxChat,
        setShowBoxChat,
        ListShowBoxChat,
        setListShowBoxChat,
        // group
        RoomGroup,
        setRoomGroup,
        setRoomName,
        ShowChatGroup,
        setShowChatGroup,
      }}
    >
      <Router>
        <Routes>
          <Route
            path={"/"}
            element={
              <Login
                setUserLogin={setUserLogin}
                handleClickActive={handleClickActive}
              />
            }
          />
          <Route
            path="/Public"
            element={<UserMain FilterArrayUser={FilterArrayUser} />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export const appContext = AppContext;
export default App;
