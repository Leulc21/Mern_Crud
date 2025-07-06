import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Fetch the existing note data
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

  if (loading) return <p>Loading note...</p>;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-base-100 rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Update Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={updating}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={updating}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
