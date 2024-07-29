import { useEffect, useState, useContext } from "react";
import { appContext } from "../../../../App";
const PrivateChatAll = ({ handleShowChatPrivate }) => {
  const APC = useContext(appContext);
  const { ArrChat } = APC;
  const { UserLogin } = APC;
  const { UserList, setUserList } = APC;

  useEffect(() => {
    const isMessageUndefined = ArrChat.filter(
      (chat) => chat.message !== "undefinedXNull"
    );

    const uniqueMap = new Map();
    isMessageUndefined.forEach((chat) => {
      const keyRoom = chat.room;
      uniqueMap.set(keyRoom, chat);
    });

    const uniqueList = Array.from(uniqueMap.values());
    setUserList(uniqueList);
  }, [ArrChat]);

  return UserList.filter(
    (chat) => chat.receiver === UserLogin || chat.sender === UserLogin
  ).map((e, i) => (
    <div
      className="flex gap-5 p-2 my-5 shadow-lg bg-[#233752] rounded-lg hover:cursor-pointer"
      key={i}
      onClick={() =>
        handleShowChatPrivate(e.sender === UserLogin ? e.receiver : e.sender)
      }
    >
      <img src="" alt="" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between ">
          <p className="font-bold">
            {e.sender === UserLogin ? e.receiver : e.sender}
          </p>
          <p>31/07/03</p>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <span className="material-symbols-outlined">done_all</span>
            {e.message}
          </div>
          <div className="flex gap-1">
            <span className="material-symbols-outlined">keep</span>
            <p className="w-6 rounded-full text-center">1</p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default PrivateChatAll;
