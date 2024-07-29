import { useNavigate } from "react-router-dom";

function Login({ setUserLogin, handleClickActive }) {
  const navigate = useNavigate();

  const inputChange = (val) => {
    setUserLogin(val);
  };

  const handleClickButton = () => {
    navigate(`/Public`);
    handleClickActive();
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center gap-3 bg-[#233752]">
      <NavLogin />
      <h1 className="text-2xl mb-5">Create User Name</h1>
      <input
        type="text"
        className="p-2 text-center bg-[#182539c4] border border-[#182539] rounded-lg outline-none"
        onChange={(e) => inputChange(e.target.value)}
      />
      <button
        className="bg-[#182539c4] border border-[#182539] p-2 rounded-lg"
        onClick={handleClickButton}
      >
        Login
      </button>
    </div>
  );
}

const NavLogin = () => {
  return (
    <div className="absolute w-full top-0 left-0">
      <div className=" bg-[#182539] m-5 p-3 rounded-xl">
        <h1 className="font-bold text-2xl ml-5">BeeChat</h1>
      </div>
    </div>
  );
};

export default Login;
