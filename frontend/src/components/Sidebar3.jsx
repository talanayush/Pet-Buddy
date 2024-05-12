import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar3() {
    const handleProfileClick = () => {
        // Redirect to the profile page
        // Replace 'profile' with the actual route of your profile page
        window.location.href = '/profile';
    };

    return (
        <nav className="bg-gray-400 py-4 px-6 flex flex-row justify-between items-center">
            <div className="flex items-center">
                <button
                    className="text-white text-2xl mr-auto"
                    onClick={handleProfileClick}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='text-white font-poppins h-10 ml-5 mt-2'>Add New Pet</div>
            </div>
        </nav>
    );
}
