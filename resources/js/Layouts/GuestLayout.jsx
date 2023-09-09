import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen">
            {/* <div className="relative">
                <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/path/to/your-background-image.jpg")' }}></div>
                <h1 className="logo-name">Nubook</h1>
            </div> */}

            {/* <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"> */}
                {children}
            {/* </div> */}
        </div>
    );
}
