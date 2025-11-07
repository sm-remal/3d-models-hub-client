import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateModel = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    setFetching(true);
    axiosSecure.get(`/model/${id}`)
        .then((res) => {
        setModel(res.data.result || res.data); 
      })
      .catch((err) => {
        console.error("Failed to fetch model:", err);
        toast.error("Failed to load model data!");
      })
      .finally(() => setFetching(false));
  }, [id, axiosSecure]);

  if (fetching) {
    return <p className="text-center mt-10">Loading model data...</p>;
  }

  if (!model) {
    return <p className="text-center mt-10 text-red-500">Model not found!</p>;
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
    };

    try {
      const res = await axiosSecure.patch(`/model/${model._id}`, formData);
      console.log(res.data);
      toast.success("Model updated successfully!");
      setModel({ ...model, ...formData }); // local update
    } catch (err) {
      console.error(err);
      toast.error("Failed to update model!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              defaultValue={model?.name}
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={model?.category}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Vehicles">Vehicles</option>
              <option value="Plants">Plants</option>
              <option value="Foods">Foods</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={model?.description}
              name="description"
              required
              rows="4"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              defaultValue={model?.thumbnail}
              name="thumbnail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Model"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;

