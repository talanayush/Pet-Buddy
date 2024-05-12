import ButtonG from "./ButtonG";
import SimpleCard from "./SimpleCard";

export default function Register() {
  return (
    <>
      <div className="bg-register bg-cover items-center">
        <div className="text-center p-20">
          <h1 className="text-6xl text-white font-bold">
            Let us help you take care of your pet!!
          </h1>
          <p className="text-xl mt-10 text-white">
            Help your pet by making their personalized health profiles and find
            them their favorite PetHouse
          </p>
        </div>
        <div className="flex justify-center mt-20">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg text-sm mb-20 px-10 py-5 text-center me-2 mb-2 font-bold"
          >
            <a href="/addpet">
            Register Your Pet
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
