const SlidePersonContainer = ({
  setSlideChange,
  FilterPerson,
  handleShowChatPrivate,
}) => {
  const slideOf =
    "absolute right-0 top-[75px] w-[20%] h-[87%] p-2 bg-[#182539] border rounded-md translate-x-[400px] transition";
  const slideOn =
    "absolute right-0 top-[75px] w-[20%] h-[87%] p-2 bg-[#182539] border rounded-md translate-x-0 duration-300 ";

  return (
    <div className={setSlideChange ? slideOn : slideOf}>
      <div className="flex justify-between items-center p-2">
        <h1 className="font-bold">Person</h1>
      </div>
      {FilterPerson.map((e, i) => (
        <div className="flex flex-col gap-2 mt-2" key={i}>
          <button
            className="transition-all hover:bg-[#233752] rounded-md"
            onClick={() => handleShowChatPrivate(e)}
          >
            <div className="flex items-center gap-2 p-2 rounded-lg">
              <img
                src=""
                alt=""
                className="w-8 h-8 rounded-full bg-[#233752]"
              />
              <p>{e}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SlidePersonContainer;
