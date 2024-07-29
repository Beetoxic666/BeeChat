import { useState, useEffect, useContext } from "react";
import { appContext } from "../../../../App";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "http://localhost:3001";

const PublicChat = ({ handleRemoveBox }) => {
  const APC = useContext(appContext);
  // const { socket } = APC;
  const { UserLogin } = APC;

  const [ArrayChatPublic, setArrayChatPublic] = useState([]);
  const [TypeMessagePublic, setTypeMessagePublic] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      transports: ["websocket"],
    });
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.emit("Public", {
      name: "",
      message: "",
    });
    socket.on("message_public", (data) => {
      setArrayChatPublic(data);
    });
  }, [UserLogin]);

  useEffect(() => {
    setTypeMessagePublic("");
  }, [ArrayChatPublic]);

  const handleMessagePublic = () => {
    if (TypeMessagePublic.length > 0) {
      socket.emit("Public", {
        name: UserLogin,
        message: TypeMessagePublic,
      });

      socket.on("message_public", (data) => {
        setArrayChatPublic(data);
      });
    }
  };

  return (
    <div className="bg-[#182539] border border-[#182539] rounded-2xl w-full p-3 relative">
      <div className="flex justify-between items-center ">
        <h1 className="font-bold">Public</h1>
        <button
          className="flex items-center"
          onClick={() => handleRemoveBox("public")}
        >
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </div>
      {ArrayChatPublic.filter((e) => e.name !== "" && e.message !== "").map(
        (e, i) => (
          <div className="flex gap-5 p-2 my-5 " key={i}>
            {e.name !== UserLogin ? (
              <>
                <img src="" alt="" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col w-full">
                  <p className="font-semibold">{e.name}</p>
                  <p className="font-thin text-sm">{e.message}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <p className="font-semibold text-right">You</p>
                  <p className="font-thin text-right text-sm">{e.message}</p>
                </div>
                <img src="" alt="" className="w-10 h-10 rounded-full" />
              </>
            )}
          </div>
        )
      )}
      <div className="absolute bottom-2 left-0 w-full">
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            className="w-[90%] h-9 bg-transparent border border-[#233752] rounded-lg p-3 outline-none"
            placeholder="Type here..."
            onChange={(e) => setTypeMessagePublic(e.target.value)}
            value={TypeMessagePublic}
          />
          <button className="flex items-center" onClick={handleMessagePublic}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicChat;
