import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ModelCard } from "../../components/ModelCard/ModelCard";

const MyDownloads = () => {
  const { user, loading: authLoading } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(models)
  useEffect(() => {
    
    if (!authLoading && user?.email) {
      axiosSecure.get(`/my-downloads?email=${user.email}`)
        .then((res) => setModels(res.data))
        .catch((err) => console.error("Error fetching downloads:", err))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, axiosSecure]);

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="mb-10">
            <h2 className="text-3xl font-semibold text-pink-600 text-center">My Download</h2>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;
