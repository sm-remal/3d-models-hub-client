import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ErrorDetailsPage from "../../components/ErrorPage/ErrorDetailsPage";

const ModelDetails = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const [model, setModel] = useState(null);
  const [error, setError] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (!id) return setError(true);

    
    setError(false);

    axiosSecure.get(`/model/${id}`)
      .then((res) => {
        if (!res.data || Object.keys(res.data).length === 0) {
          setError(true);
        } else {
          setModel(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching model:", err);
        setError(true);
      })

  }, [id, user, refetch, axiosSecure]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/model/${model?._id}`)
          .then(() => {
            navigate("/all-models");
            Swal.fire("Deleted!", "Your model has been deleted.", "success");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleDownload = () => {
    const finalModel = {
      name: model?.name,
      downloads: model?.downloads,
      created_by: model?.created_by,
      description: model?.description,
      thumbnail: model?.thumbnail,
      created_at: new Date(),
      downloaded_by: user?.email,
    };

    axiosSecure
      .post(`/downloads`, finalModel)
      .then(() => {
        toast.success("Successfully downloaded!");
        setRefetch(!refetch);
      })
      .catch((err) => console.error(err));
  };

  
  if (error || !model) {
    return <ErrorDetailsPage />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={model?.thumbnail || "/placeholder.jpg"}
              alt={model?.name || "Model Thumbnail"}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {model?.name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {model?.category}
              </div>

              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Downloaded: {model?.downloads}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {model?.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to={`/update-model/${model?._id}`}
                className="btn btn-primary rounded-full bg-linear-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                Update Model
              </Link>
              <button
                onClick={handleDownload}
                className="btn btn-secondary rounded-full"
              >
                Download
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
