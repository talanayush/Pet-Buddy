import Sidebar2 from "./Sidebar2";
import Cat from "../assets/cats.jpg";
import Footer from "./Footer";
export default function PetHouseProfile() {
    const petHouse = {
        name: "Happy Tails Pet House",
        latitude: 37.7749,
        longitude: -122.4194,
        address: "1234 Bark St, San Francisco, CA 94102",
        price: 75.0,
        rating: 4.5,
    };

    const feedbacks = [
        {
            petHouseId: 1,
            petHouseName: "Happy Tails Pet House",
            feedback: "Great service, my dog loved it here!",
            userId: "user123",
        },
        {
            petHouseId: 2,
            petHouseName: "Paws & Claws Pet House",
            feedback: "Friendly staff and excellent care for my cat.",
            userId: "user456",
        },
        {
            petHouseId: 3,
            petHouseName: "Furry Friends Pet House",
            feedback: "My rabbit was so happy after staying here!",
            userId: "user789",
        },
    ];

    return (
        <>
            <Sidebar2 />
            <div className="text-3xl font-semibold flex justify-start mt-20 ml-20 mb-10">
                <p>Your Profile</p>
            </div>
            <div className="flex justify-center">
                <div className="flex justify-normal bg-blue-gray-100 rounded-3xl w-1/3 ml-10">
                    <div className="m-10">
                        <img
                            src={Cat}
                            alt="Pet House"
                            className="h-full w-full object-cover rounded-none"
                        />
                    </div>
                    <div className="flex flex-col justify-center ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {petHouse.name}
                        </h3>
                        <p className="text-sm text-gray-600">{petHouse.address}</p>
                        <div className="flex mt-2">
                            <div className="bg-green-200 text-green-800 px-2 py-1 rounded-lg">
                                <span className="font-semibold">Price:</span> $
                                {petHouse.price.toFixed(2)}
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg">
                                <span className="font-semibold">Rating:</span> {petHouse.rating}{" "}
                                ⭐
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-10 text-lg font-serif font-medium text-center w-2/3 p-20">
                    <p className="font-bold text-3xl mb-5">{petHouse.name}</p>
                    <p>
                        Welcome to Happy Tails Pet House, where pets are pampered with the
                        care and attention they deserve. Nestled in the heart of San
                        Francisco, this pet house offers a warm and welcoming environment
                        for your furry friends. Located at 1234 Bark St, San Francisco, CA,
                        Happy Tails is easily accessible, providing a convenient spot for
                        pet owners. With an affordable daily rate of $75, it's a great value
                        for the qua
                        lity of care your pets receive. Happy Tails is renowned
                        for its 4.5-star rating, a testament to its dedication to
                        exceptional service. The trained and friendly staff ensure that
                        every pet is comfortable and well-tended to. Whether you're heading
                        out of town or just need a safe place for your pet during the day,
                        Happy Tails Pet House is your go-to spot for quality pet care in San
                        Francisco.
                    </p>
                </div>
            </div>
            <div className="flex justify-center py-10 bg-slate-100">
                <div className="w-3/4 bg-sky-200 p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-sky-800 mb-8">
                        Customer Feedback
                    </h1>
                    <div className="space-y-6">
                        {feedbacks.map((feedback) => (
                            <div
                                key={feedback.petHouseId}
                                className="bg-white rounded-xl p-6 shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {feedback.petHouseName}
                                </h3>
                                <p className="text-gray-500">
                                    <span className="font-semibold">User ID:</span>{" "}
                                    {feedback.userId}
                                </p>
                                <p className="text-gray-700 mt-2">{feedback.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}