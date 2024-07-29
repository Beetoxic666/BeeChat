import { useState, useEffect, useContext } from "react";
import { appContext } from "../../../../../App";

const SlideGroups = ({ handleAddGroups, handleSlideGroup }) => {
  const APC = useContext(appContext);
  const { UserLogin } = APC;
  const { RoomGroup } = APC;
  const { setShowChatGroup, setShowBoxChat, ShowBoxChat } = APC;

  const handleShowChatGroup = (room) => {
    if (!ShowBoxChat.includes("group")) {
      setShowBoxChat((prev) => [...prev, "group"]);
    }
    setShowChatGroup(room);
  };

  return (
    <>
      <div className="flex justify-between items-center p-2">
        <h1 className="font-bold">Groups</h1>
        <button onClick={handleAddGroups}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      {RoomGroup.filter(
        (room) =>
          room.user && Array.isArray(room.user) && room.user.includes(UserLogin)
      ).map((e, i) => (
        <div className="flex flex-col gap-2 mt-2" key={i}>
          <button
            className="transition-all hover:bg-[#233752] rounded-md"
            onClick={() => handleShowChatGroup(e.room)}
          >
            <div className="flex items-center gap-2 p-2 rounded-lg">
              <img
                src=""
                alt=""
                className="w-8 h-8 rounded-full bg-[#233752]"
              />
              <p>{e.room}</p>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

export default SlideGroups;
