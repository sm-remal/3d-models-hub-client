import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

const ErrorDetailsPage = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">

            <div className="bg-red-100 p-6 rounded-full shadow-sm mb-6">
                <AlertTriangle className="text-red-500 w-16 h-16" />
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
                3D Models are Not Found
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
                3D Models are looking for does not exist or has been removed.
            </p>


            <div className="flex gap-3">
                <button onClick={() => navigate("/")}
                    className="btn bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white">Back to Home</button>
            </div>
        </div>
    );
};

export default ErrorDetailsPage;