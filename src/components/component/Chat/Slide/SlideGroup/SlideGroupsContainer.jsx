import { useState } from "react";
import SlideGroupAdd from "./SlideGroupAdd";
import SlideGroups from "./SlideGroups";

const SlideGroupsContainer = ({ setSlideChange }) => {
  const [showAddGroup, setshowAddGroup] = useState(false);
  const slideOf =
    "absolute right-0 top-[75px] w-[20%] h-[87%] p-2 bg-[#182539] border  rounded-md translate-x-[400px] transition";
  const slideOn =
    "absolute right-0 top-[75px] w-[20%] h-[87%] p-2 bg-[#182539] border rounded-md translate-x-0 duration-300";

  const handleAddGroups = () => {
    if (showAddGroup) {
      setshowAddGroup(false);
    } else {
      setshowAddGroup(true);
    }
  };

  return (
    <div className={setSlideChange ? slideOn : slideOf}>
      {showAddGroup ? (
        <SlideGroupAdd handleBackGroups={handleAddGroups} />
      ) : (
        <SlideGroups handleAddGroups={handleAddGroups} />
      )}
    </div>
  );
};

export default SlideGroupsContainer;
