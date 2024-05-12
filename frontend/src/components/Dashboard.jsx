import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ButtonG from "./ButtonG";
import CustomModal from "./CustomModal";
import PetTypes from "./PetTypes";
import Section3 from "./Section3";
import Register from "./Register";
import Footer from "./Footer";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const openModal = () => {
    console.log(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function handleTasking(newProject) {
    // Update projects state with the new project
    setProjects([...projects, ...newProject]);
    console.log(projects);
  }

  return (
    <>
      <div className="bg-gray-800 h-screen flex flex-col">
        <div className="bg-my-image bg-cover flex-grow  items-center">
          <Sidebar />
          <div className="text-center ">
            <h1 className=" text-9xl mt-40 text-white font-bold">PetBUDDY</h1>
            <p className="text-4xl mt-10 text-white">The #1 PetCare Platform</p>
          </div>
          <div className=" flex justify-center mt-20">
            <button
          
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              //onClick={onClick} // Pass the onClick function prop here
            >
              <a href="/Pethouses">Lets find a pethouse</a>
            </button>
            <button
  
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              // Pass the onClick function prop here
            >
              <a href="/vetClinics">Lets Get You a Vet!</a>
            </button>
          </div>
          <button>
            <img src="./assets/arrow.png" alt="" />
          </button>
        </div>
      </div>
      <div className="text-white">
        <PetTypes />
        <Section3 />
        <Register />
        <Footer />
      </div>
      <CustomModal
        modalOpen={isModalOpen}
        funcHandle={closeModal}
        tasking={handleTasking}
      />
    </>
  );
}
