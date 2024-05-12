import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";
export default function Features() {
    const cardsData = [
        {
            id: 1,
            title: 'Pet Housing',
            description: "Enjoy our convenient door-to-door service, where we pick up your beloved pets and safely transport them to our Pet House. When you're ready, we'll bring them back to your doorstep, ensuring a seamless experience for both you and your pets.",
            imageUrl: 'src/assets/petcare.jpg',
            link: "/PetHouses",
        },
        {
            id: 2,
            title: 'Vetenary Clinics',
            description: 'Offering convenient and effortless health checkups for your cherished pets, our services prioritize their well-being while minimizing any inconvenience or stress for both you and your furry companions.',
            imageUrl: 'src/assets/vet.jpg',
            link: "/vetClinics",
        },
        {
            id: 3,
            title: 'Pet Grooming',
            description: 'Offering convenient and effortless health checkups for your cherished pets, our services prioritize their well-being while minimizing any inconvenience or stress for both you and your furry companions.',
            imageUrl: 'src/assets/pet groom.jpg',
            link: "/PetHouses",
        },
        {
            id: 4,
            title: 'Pet Care',
            description: 'Offering convenient and effortless health checkups for your cherished pets, our services prioritize their well-being while minimizing any inconvenience or stress for both you and your furry companions.',
            imageUrl: 'src/assets/pet run.jpg',
            link: "/PetHouses",
        },
    ];

    return (
        <>
            <Sidebar2 />
            <div className="m-10">
                <h1 className="text-5xl mt-20 text-black font-bold text-center">Features We Provide</h1>
                <div className="mt-10 flex justify-center gap-8">
                    {cardsData.map((card) => (
                        <a key={card.id} href={card.link} className="text-black no-underline">
                            <div className="border border-gray-300 rounded-lg p-4 w-64 cursor-pointer">
                                <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover mb-4" />
                                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                                <p className="text-gray-600">{card.description}</p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
            <Footer />
        </>
    );
}
