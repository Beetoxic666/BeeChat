import { useState, useEffect, useContext } from "react";
import { appContext } from "../../../../App";
const GroupChat = ({ handleRemoveBox }) => {
  const APC = useContext(appContext);
  const { socket } = APC;
  const { UserLogin } = APC;
  const { ShowChatGroup } = APC;
  const { RoomGroup } = APC;
  const { setRoomName } = APC;

  const [TypeInput, setTypeInput] = useState("");

  const handleSendMessageGroup = () => {
    const mapRoomGroup = RoomGroup.filter(
      (room) => room.room === ShowChatGroup
    );
    if (mapRoomGroup) {
      const dataGroup = {
        room: ShowChatGroup,
        message: {
          sender: UserLogin,
          msg: TypeInput,
        },
        info: "send_message",
      };
      socket.emit("group_chat", dataGroup);
    }
    setRoomName(TypeInput);
    setTypeInput("");
  };

  return (
    <div className="bg-[#182539] border border-[#182539] rounded-2xl w-full p-3 relative">
      <div className="flex justify-between items-center ">
        <h1 className="font-bold">Group [{ShowChatGroup}]</h1>
        <button
          className="flex items-center"
          onClick={() => handleRemoveBox("group")}
        >
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </div>
      {/* Start */}
      <div>
        {RoomGroup.filter((room) => room.room.includes(ShowChatGroup)).flatMap(
          (message) =>
            message.message.map((msg, i) => (
              <div className="flex gap-5 p-2 my-5 " key={i}>
                {msg.sender !== UserLogin ? (
                  <>
                    <img src="" alt="" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col w-full">
                      <p className="font-semibold">{msg.sender}</p>
                      <p className="font-thin text-sm">{msg.msg}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-right">You</p>
                      <p className="font-thin text-right text-sm">{msg.msg}</p>
                    </div>
                    <img src="" alt="" className="w-10 h-10 rounded-full" />
                  </>
                )}
              </div>
            ))
        )}
        <div className="absolute bottom-2 left-0 w-full">
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              className="w-[90%] h-9 bg-transparent border border-[#233752] rounded-lg p-3 outline-none"
              placeholder="Type here..."
              value={TypeInput}
              onChange={(e) => setTypeInput(e.target.value)}
            />
            <button
              className="flex items-center"
              onClick={handleSendMessageGroup}
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* End */}
    </div>
  );
};

export default GroupChat;
