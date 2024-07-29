import { useState, useEffect, useContext } from "react";
import { appContext } from "../../App";

import PrivateChat from "./Chat/PrivateChat/PrivateChat";
import PrivateChatAll from "./Chat/PrivateChat/PrivateChatAll";
import PublicChat from "./Chat/PublicChat/PublicChat";
import SlideGroupsContainer from "./Chat/Slide/SlideGroup/SlideGroupsContainer";
import SlidePersonContainer from "./Chat/Slide/SlidePerson/SlidePersonContainer";
import GroupChat from "./Chat/GroupChat/GroupChat";

function UserMain({ FilterArrayUser }) {
  const [slideGroup, setSlideGroup] = useState(false);
  const [slidePerson, setSlidePerson] = useState(false);
  const [showChatPrivate, setShowChatPrivate] = useState(false);
  const [getReceiver, setGetReceiver] = useState("");

  const APC = useContext(appContext);
  const { setSearchUser } = APC;
  const { ShowBoxChat, setShowBoxChat, ListShowBoxChat } = APC;

  const handleSlidePublic = () => {
    if (!ShowBoxChat.includes("public")) {
      setShowBoxChat((prev) => [...prev, "public"]);
    }
  };

  const handleSlideGroup = () => {
    if (slideGroup) {
      setSlideGroup(false);
    } else {
      setSlideGroup(true);
    }
  };
  const handleSlidePerson = () => {
    if (!ShowBoxChat.includes("private")) {
      setShowBoxChat((prev) => [...prev, "private"]);
    }
    if (slidePerson) {
      setSlidePerson(false);
    } else {
      setSlidePerson(true);
    }
  };

  const handleShowChatPrivate = (receiver) => {
    if (showChatPrivate) {
      setShowChatPrivate(false);
      setGetReceiver("");
    } else {
      setShowChatPrivate(true);
      setGetReceiver(receiver);
    }
  };

  const handleSearchUser = (e) => {
    setSearchUser(e);
  };

  const handleRemoveBox = (e) => {
    const removeBox = ShowBoxChat.filter((box) => box !== e);
    setShowBoxChat(removeBox);
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center relative overflow-hidden">
      <div className=" w-full h-full p-5 bg-[#233752]">
        {/* NAV START */}
        <div className="flex justify-between items-center shadow rounded-xl p-3 bg-[#182539]">
          <h1 className="text-2xl ml-5 font-bold">BeeChat</h1>
          <div className="flex justify-between gap-5 mr-5">
            <button className="flex items-center" onClick={handleSlidePublic}>
              <span className="material-symbols-outlined"> public </span>
            </button>
            <button className="flex items-center" onClick={handleSlideGroup}>
              <span className="material-symbols-outlined"> Groups </span>
            </button>
            <button className="flex items-center" onClick={handleSlidePerson}>
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
        {/* NAV END */}

        {/* BODY START */}
        <div className="flex gap-3 mt-3 h-[85vh]">
          {ListShowBoxChat.map((e, i) => {
            if (ShowBoxChat.includes(e)) {
              if (e === "private") {
                return (
                  <div
                    key={i}
                    className="bg-[#182539] border border-[#182539] rounded-2xl w-full p-3"
                  >
                    {showChatPrivate ? (
                      <PrivateChat
                        getReceiver={getReceiver}
                        handleBackPrivateChat={handleShowChatPrivate}
                      />
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <h1 className="font-bold">Private</h1>
                          <div className="flex items-center gap-2">
                            <input
                              type="search"
                              className="bg-transparent border border-[#233752] rounded-lg px-3 outline-none"
                              placeholder="Search User..."
                              onChange={(e) => handleSearchUser(e.target.value)}
                            />
                            <button
                              className="flex items-center"
                              onClick={() => handleRemoveBox("private")}
                            >
                              <span className="material-symbols-outlined">
                                cancel
                              </span>
                            </button>
                          </div>
                        </div>
                        <PrivateChatAll
                          handleShowChatPrivate={handleShowChatPrivate}
                        />
                      </>
                    )}
                  </div>
                );
              } else if (e === "public") {
                return <PublicChat handleRemoveBox={handleRemoveBox} key={i} />;
              } else if (e === "group") {
                return <GroupChat handleRemoveBox={handleRemoveBox} key={i} />;
              }
            }
            return null;
          })}
        </div>
        {/* BODY END */}

        {/* ASIDE START */}
        <SlideGroupsContainer setSlideChange={slideGroup} />
        <SlidePersonContainer
          setSlideChange={slidePerson}
          FilterPerson={FilterArrayUser}
          handleShowChatPrivate={handleShowChatPrivate}
        />
        {/* ASIDE END */}
      </div>
    </div>
  );
}

export default UserMain;
