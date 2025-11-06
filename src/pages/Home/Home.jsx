import { useLoaderData } from "react-router";
import Banner from "../../components/Banner/Banner";
import { ModelCard } from "../../components/ModelCard/ModelCard";

const Home = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-pink-700 mb-6">
                    Latest Models
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.map(model => (
                        <ModelCard key={model._id} model={model} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
