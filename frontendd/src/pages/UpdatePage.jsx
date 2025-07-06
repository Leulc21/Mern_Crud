import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/notes/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        toast.error("Failed to load note");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setUpdating(true);
    try {
      await axios.put(`http://localhost:3001/api/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading note...</p>;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto p-6 max-w-xl">
        <Link
          to="/"
          className="btn btn-ghost mb-6 flex items-center gap-2 text-base-content hover:text-primary transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        <div className="bg-base-100 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Update Note
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={updating}
                placeholder="Enter note title"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-36 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={updating}
                placeholder="Enter note content"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
