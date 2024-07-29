import { useState, useEffect, useContext } from "react";
import { appContext } from "../../../../App";
const PrivateChat = ({ getReceiver, handleBackPrivateChat }) => {
  const APC = useContext(appContext);
  const { UserLogin } = APC;
  const { ArrRoom } = APC;
  const { ArrChat } = APC;

  const { setRoom } = APC;
  const { setIdMsg } = APC;
  const { setMessage } = APC;
  const { setSender } = APC;
  const { setReceiver } = APC;

  const [FindRoom, setFindRoom] = useState("");
  const [TypeMessage, setTypeMessage] = useState("");

  // ====== First Execution ======
  useEffect(() => {
    const rooms = ArrRoom.map((room) => room);

    const leftToRight = [UserLogin, "x", getReceiver].join("");
    const rightToLeft = [getReceiver, "x", UserLogin].join("");

    if (rooms.find((room) => room === leftToRight)) {
      setFindRoom(leftToRight);
    } else if (rooms.find((room) => room === rightToLeft)) {
      setFindRoom(rightToLeft);
    }
  }, [getReceiver]);

  // ====== Handle Execution ======
  const handleSendMessage = () => {
    if (TypeMessage.length > 0) {
      setRoom(FindRoom);
      setSender(UserLogin);
      setReceiver(getReceiver);
      setMessage(TypeMessage);
      const findIdRoomUser = ArrChat.filter(
        (chat) => chat.room === FindRoom
      ).map((chat) => chat.id);
      if (findIdRoomUser.length > 0) {
        const add = findIdRoomUser.length + 1;
        setIdMsg(add);
      }
    }
  };

  // ====== After Chat Get Change Execution ======
  useEffect(() => {
    setTypeMessage("");
  }, [ArrChat]);

  return (
    <div className="p-3 w-full h-full relative">
      <div className="flex items-center gap-5 p-2 rounded-lg bg-[#233752]">
        <button className="flex items-center" onClick={handleBackPrivateChat}>
          <span className="material-symbols-outlined"> arrow_back </span>
        </button>
        <h1>{getReceiver}</h1>
      </div>
      <div className="w-full h-[85%] overflow-auto">
        {ArrChat.filter((chat) => chat.room === FindRoom && chat.id !== 1).map(
          (chat, i) => (
            <div
              key={i}
              className={
                chat.sender === UserLogin
                  ? "flex justify-end px-2 m-2"
                  : "flex justify-start px-2 m-2"
              }
            >
              <p
                className={
                  chat.sender === UserLogin
                    ? "px-2 rounded-md bg-green-900"
                    : "px-2 rounded-md bg-slate-700"
                }
              >
                {chat.message}
              </p>
            </div>
          )
        )}
      </div>
      <div className="absolute bottom-2 left-0 w-full">
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            className="w-[90%] h-9 bg-transparent border border-[#233752] rounded-lg p-3 outline-none"
            placeholder="Type here..."
            onChange={(e) => setTypeMessage(e.target.value)}
            value={TypeMessage}
          />
          <button className="flex items-center" onClick={handleSendMessage}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
