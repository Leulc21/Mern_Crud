import axios from "axios";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimited";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingNoteId, setDeletingNoteId] = useState(null); // track deleting note id
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/notes/");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    setDeletingNoteId(id);
    try {
      await axios.delete(`http://localhost:3001/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error, error?.response);
      toast.error("Failed to delete note");
    } finally {
      setDeletingNoteId(null);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const isDeleting = deletingNoteId === note._id;
            return (
              <div
                key={note._id}
                className="relative rounded-lg border border-base-content/10 bg-base-200 p-4 hover:bg-base-300/50 transition shadow"
              >
                <div className="flex flex-col">
                  <div className="bg-primary/20 p-4 rounded mb-4">
                    <h2 className="text-primary text-xl font-bold">
                      {note.title}
                    </h2>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-base-content mb-2">
                      {note.content}
                    </p>
                    <p className="text-xs text-base-content/70">
                      Created at: {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <div className="text-xs text-base-content/70 mt-1">
                      {note.updatedAt && note.updatedAt !== note.createdAt ? (
                        <>
                          Updated at:{" "}
                          {new Date(note.updatedAt).toLocaleString()}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleUpdate(note._id)}
                    className="btn btn-sm btn-ghost"
                    title="Edit note"
                    disabled={isDeleting}
                  >
                    <PencilIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="btn btn-sm btn-ghost text-error"
                    title="Delete note"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      "Deleting..."
                    ) : (
                      <TrashIcon className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
