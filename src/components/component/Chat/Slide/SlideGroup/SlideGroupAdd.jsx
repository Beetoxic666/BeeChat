import { useState, useEffect, useContext } from "react";
import { appContext } from "../../../../../App";
const SlideGroupAdd = ({ handleBackGroups }) => {
  const APC = useContext(appContext);
  const { socket } = APC;
  const { RoomGroup, setRoomGroup } = APC;
  const { setRoomName } = APC;
  const { UserLogin } = APC;

  const [TypeInput, setTypeInput] = useState("");

  const [ListGroupSearching, setListGroupSearching] = useState([]);
  const [Information, setInformation] = useState("");

  // Add Group
  const handleAddGroup = () => {
    const listGroup = RoomGroup.filter((room) => room.room === TypeInput);
    if (TypeInput !== "" && listGroup.length <= 0) {
      const dataAddGroup = {
        room: TypeInput,
        user: [UserLogin],
        message: [],
        info: "none",
      };
      socket.emit("group_chat", dataAddGroup);
      setRoomName(TypeInput);
      setTypeInput("");
      handleBackGroups();
    } else {
      setInformation("Group already exists!");
    }
  };

  const handleSearchGroup = () => {
    const listGroup = RoomGroup.filter(
      (room) => room.room.includes(TypeInput) && !room.user.includes(UserLogin)
    );
    if (listGroup.length > 0) {
      setListGroupSearching(listGroup);
    } else {
      setInformation("Group not found!");
    }
  };
  const handleJoinGroup = (e) => {
    const joinGroup = RoomGroup.find((room) => room.room === e);
    if (joinGroup) {
      const addUser = {
        room: e,
        user: UserLogin,
        info: "addUser",
      };
      socket.emit("group_chat", addUser);
      setRoomName(e);
      handleBackGroups();
    }
  };

  return ListGroupSearching.length > 0 ? (
    <SlideListGroup
      handleBackGroups={handleBackGroups}
      ListGroupSearching={ListGroupSearching}
      handleJoinGroup={handleJoinGroup}
    />
  ) : (
    <>
      <div className="flex justify-between items-center p-2">
        <h1 className="font-bold">Groups</h1>
        <button onClick={handleBackGroups}>
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
      {Information.length > 0 && (
        <p className="text-red-500 text-sm text-center">{Information}</p>
      )}

      {/* Search */}
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <h1>Search Group</h1>
        <input
          type="text"
          className="w-[90%] h-9 bg-transparent border border-[#233752] rounded-lg p-3 outline-none"
          onChange={(e) => setTypeInput(e.target.value)}
        />
        <button
          className="border border-[#233752] p-2 rounded-lg hover:bg-[#233752]"
          onClick={handleSearchGroup}
        >
          Search
        </button>
      </div>

      {/* Add */}
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <h1>Create New Group</h1>
        <input
          type="text"
          className="w-[90%] h-9 bg-transparent border border-[#233752] rounded-lg p-3 outline-none"
          onChange={(e) => setTypeInput(e.target.value)}
        />
        <button
          className="border border-[#233752] p-2 rounded-lg hover:bg-[#233752]"
          onClick={handleAddGroup}
        >
          Create
        </button>
      </div>
    </>
  );
};

const SlideListGroup = ({
  handleBackGroups,
  ListGroupSearching,
  handleJoinGroup,
}) => {
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <h1 className="font-bold">List Groups</h1>
        <button onClick={handleBackGroups}>
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
      {ListGroupSearching.map((e, i) => (
        <div className="flex flex-col gap-2 mt-2" key={i}>
          <button
            className="transition-all hover:bg-[#233752] rounded-md"
            onClick={() => handleJoinGroup(e.room)}
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

export default SlideGroupAdd;
