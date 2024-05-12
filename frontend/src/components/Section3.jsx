import SimpleCard from "./SimpleCard";
export default function Section3() {
  return (
    <>
      <div className="mb-20">
        <div className="flex justify-center m-10">
          <div className=" bg-teal-900 p-20 rounded-3xl text-center">
            <h1 className=" text-blue-gray-50  text-4xl  font-semibold">
              Discover PetBuddy: Your Trusted Companion in Pet Care!
            </h1>
            <br />
            <br />
            <p className=" text-blue-gray-50 text-lg font-serif">
              We provides personalized pet care solutions, including boarding
              and veterinary services, ensuring every furry friend receives the
              love and attention they deserve for their happiness and
              well-being.
            </p>
          </div>
        </div>
        <div className="flex justify-around mt-20">
          <SimpleCard
            heading={"Door to Door"}
            content={
              <ul className="list-disc">
                <li>Convenient service for pet owners.</li>
                <li>
                  Ensures pets safety and reduces stress during transportation.
                </li>
                <li>Simplifies pet care logistics for busy individuals.</li>
              </ul>
            }
          />
          <SimpleCard
            heading={"Personalized Pet Profiles"}
            content={
              <ul className="list-disc">
                <li>Track diet, health, and vet appointments.</li>
                <li>Centralized health history for better care.</li>
                <li>
                  Customized recommendations based on individual pet needs.
                </li>
              </ul>
            }
          />
          <SimpleCard
            heading={"Cleanliness And Safety Checks"}
            content={
              <ul className="list-disc">
                <li>Regular inspections of pet houses.</li>
                <li>Ensures hygienic environment.</li>
                <li>Prioritizes pet safety and well-being.</li>
              </ul>
            }
          />
        </div>
      </div>
    </>
  );
}
