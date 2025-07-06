import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimited";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/notes/");
        const data = response.data;
        console.log(data);
        setNotes(data);
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

  return (
    <div className="min-h-screen p-6">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-base-content/10 bg-base-200 p-4 hover:bg-base-300/50 transition shadow"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
