import Sidebar2 from "./Sidebar2";
import ButtonG from "./ButtonG";
import { useNavigate } from "react-router-dom";

export default function CentralLogin() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };
    
    return (
        <>
            <div className="h-screen" >
                <Sidebar2 />
                <div className=" flex justify-around text-center ">
                    <div className=" w-1/3 pt-40  bg-blue-gray-800 text">
                        <h1 className="text-4xl mt-20 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
                            FOR PETHOUSES
                        </h1>

                        <h2 className=" text-lg font-serif mb-20 text-white">
                            We have over 1000 authorised pethouses on this platform.
                        </h2>
                        <ButtonG text={"LOGIN"} />
                        <h2 className=" text-lg font-serif mt-20 mb-16 text-white">
                            Don't Have Account?{" "}
                            <a href="" className=" text-teal-400">
                                SignUP
                            </a>
                        </h2>
                    </div>
                    <div className=" w-1/3  pt-40  bg-blue-gray-700 text">
                        <h1 className="text-4xl mt-20 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
                            FOR USERS
                        </h1>

                        <h2 className=" text-lg font-serif mb-20 text-white">
                            We have over 4000 active Satisfied users on this platform.
                        </h2>

                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleLoginClick}
                        >
                            {'Login'}
                        </button>

                        <h2 className=" text-lg font-serif mt-20 text-white">
                            Don't Have Account?{" "}
                            <a href="/signup" className=" text-teal-400">
                                SignUP
                            </a>
                        </h2>
                    </div>
                    <div className=" w-1/3 pt-40  bg-blue-gray-800 text">
                        <h1 className="text-4xl mt-20 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
                            FOR VETS
                        </h1>

                        <h2 className=" text-lg font-serif mb-20 text-white">
                            We have over 2000 verified vetenaries on this Platform.
                        </h2>
                        <ButtonG text={"LOGIN"} />
                        <h2 className=" text-lg font-serif mt-20 text-white">
                            Don't Have Account?{" "}
                            <a href="" className=" text-teal-400">
                                SignUP
                            </a>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}
