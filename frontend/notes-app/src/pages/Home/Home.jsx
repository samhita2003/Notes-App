import { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import axiosInstance from "../../utils/axios";
import {LuPlus} from "react-icons/lu";
import {
  useNavigate,
  useOutletContext
} from "react-router-dom";

function Home() {
  const [openModal, setOpenModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagTitle, setTagTitle] = useState("");

  const [allNotes, setAllNotes] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    searchText,
    userInfo,
    setUserInfo
  } = useOutletContext();

  const navigate = useNavigate();

  // -------------------------
  // Title
  // -------------------------

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // -------------------------
  // Content
  // -------------------------

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // -------------------------
  // Tag input
  // -------------------------

  const handleTagChange = (e) => {
    setTagTitle(e.target.value);
  };

  // -------------------------
  // Add tag
  // -------------------------

  const addTags = () => {
    const newTag = tagTitle.trim();

    if (!newTag) {
      return;
    }

    if (tags.includes(newTag)) {
      setTagTitle("");
      return;
    }

    setTags((prevTags) => [
      ...prevTags,
      newTag
    ]);

    setTagTitle("");
  };

  // -------------------------
  // Remove tag
  // -------------------------

  const handleCloseTag = (tagToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  // -------------------------
  // Open modal for ADD
  // -------------------------

  const handleOpenModal = (e) => {
    e.preventDefault();

    setIsEditing(false);
    setEditingNoteId(null);

    setTitle("");
    setContent("");
    setTags([]);
    setTagTitle("");

    setOpenModal(true);
  };

  // -------------------------
  // Close modal
  // -------------------------

  const handleCloseModal = (e) => {
    e.preventDefault();

    setOpenModal(false);

    setIsEditing(false);
    setEditingNoteId(null);

    setTitle("");
    setContent("");
    setTags([]);
    setTagTitle("");
  };

  // -------------------------
  // ADD / EDIT NOTE
  // -------------------------

  const handleSubmitNote = async () => {
    if (!title.trim()) {
      return;
    }

    if (!content.trim()) {
      return;
    }

    try {
      if (isEditing) {
        // -------------------------
        // EDIT NOTE
        // -------------------------

        const response = await axiosInstance.put(
          `/edit-note/${editingNoteId}`,
          {
            title: title.trim(),
            content: content.trim(),
            tags
          }
        );

        if (response.data?.note) {
          setAllNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === editingNoteId
                ? response.data.note
                : note
            )
          );
        }

      } else {
        // -------------------------
        // ADD NOTE
        // -------------------------

        const response = await axiosInstance.post(
          "/add-note",
          {
            title: title.trim(),
            content: content.trim(),
            tags
          }
        );

        if (response.data?.note) {
          setAllNotes((prevNotes) => [
            response.data.note,
            ...prevNotes
          ]);
        }
      }

      // -------------------------
      // Reset form
      // -------------------------

      setTitle("");
      setContent("");
      setTags([]);
      setTagTitle("");

      setEditingNoteId(null);
      setIsEditing(false);
      setOpenModal(false);

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to save note"
      );
    }
  };

  // -------------------------
  // GET USER
  // -------------------------

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        "/get-user"
      );

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  // -------------------------
  // GET ALL NOTES
  // -------------------------

  const getAllNotes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(
        "/get-notes"
      );

      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }

    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to fetch notes"
      );

    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // EDIT NOTE
  // -------------------------

  const handleEdit = (note) => {
    setIsEditing(true);
    setEditingNoteId(note._id);

    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
    setTagTitle("");

    setOpenModal(true);
  };

  // -------------------------
  // DELETE NOTE
  // -------------------------

  const handleDelete = async (note) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${note.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/delete-note/${note._id}`
      );

      if (response.data) {
        setAllNotes((prevNotes) =>
          prevNotes.filter(
            (item) => item._id !== note._id
          )
        );
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to delete note"
      );
    }
  };

  // -------------------------
  // PIN / UNPIN NOTE
  // -------------------------

  const handlePin = async (note) => {
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${note._id}`
      );

      if (response.data?.note) {
        setAllNotes((prevNotes) =>
          prevNotes
            .map((item) =>
              item._id === note._id
                ? response.data.note
                : item
            )
            .sort((a, b) => {
              if (a.isPinned === b.isPinned) {
                return 0;
              }

              return a.isPinned ? -1 : 1;
            })
        );
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to update note"
      );
    }
  };

  // -------------------------
  // SEARCH
  // -------------------------

  const filteredNotes = allNotes.filter((note) => {
    const search = searchText
      .toLowerCase()
      .trim();

    if (!search) {
      return true;
    }

    return (
      note.title
        ?.toLowerCase()
        .includes(search) ||

      note.content
        ?.toLowerCase()
        .includes(search) ||

      note.tags?.some((tag) =>
        tag.toLowerCase().includes(search)
      )
    );
  });

  // -------------------------
  // INITIAL API CALLS
  // -------------------------

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  // -------------------------
  // UI
  // -------------------------

  return (
    <div>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center items-center p-10">
          <p className="text-gray-500">
            Loading notes...
          </p>
        </div>
      )}

      {/* Error */}

      {error && !loading && (
        <div className="flex justify-center items-center p-10">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      )}

      {/* Empty / Search result */}

      {!loading &&
        !error &&
        filteredNotes.length === 0 && (

          <div className="flex flex-col justify-center items-center p-10">

            {searchText.trim() ? (
              <>
                <p className="text-gray-500 text-lg">
                  No notes found
                </p>

                <p className="text-gray-400">
                  Try searching for something else.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-lg">
                  No notes yet
                </p>

                <p className="text-gray-400">
                  Click the + button to create your first note.
                </p>
              </>
            )}

          </div>
        )}

      {/* Notes */}

      {!loading &&
        !error &&
        filteredNotes.length > 0 && (

          <NoteCard
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPin={handlePin}
            onClick={handleOpenModal}
            allNotes={filteredNotes}
          />
        )}

      {/* Add / Edit Modal */}

      <AddEditNotes
        openModal={openModal}
        onClick={handleCloseModal}
        onSubmit={handleSubmitNote}
        isEditing={isEditing}

        title={title}
        onChange={handleChange}

        content={content}
        onContentChange={handleContentChange}

        addTags={addTags}
        tags={tags}

        tagTitle={tagTitle}
        onTagChange={handleTagChange}

        closeTag={handleCloseTag}
      />

      <button
  onClick={handleOpenModal}
  className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 bg-blue-400 hover:bg-blue-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex justify-center items-center text-xl font-bold shadow-md cursor-pointer z-40"
>
  <LuPlus />
</button>
    </div>
  );
}

export default Home;