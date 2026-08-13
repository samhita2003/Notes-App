import { MdOutlinePushPin } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function NoteCard({ onEdit, onDelete, onPin, allNotes }) {

  return (
    <div className="min-h-screen relative">

      <div className="p-3 sm:p-4 lg:p-6 mt-3 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {allNotes.map((note) => (

          <div
            className="bg-white shadow-md flex flex-col gap-3 p-3 sm:p-4 border border-gray-300 rounded-md min-w-0"
            key={note._id}
          >

            {/* Header */}
            <div className="flex justify-between gap-3">

              <div className="flex flex-col gap-1 min-w-0">

                <h3 className="text-lg sm:text-xl font-bold wrap-break-word">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400">
                  {new Date(note.createdAt).toDateString()}
                </p>

              </div>

              <MdOutlinePushPin
                className={`text-xl shrink-0 cursor-pointer ${
                  note.isPinned
                    ? "text-blue-400"
                    : "text-gray-400"
                }`}
                onClick={() => onPin(note)}
              />

            </div>

            {/* Content */}
            <p className="text-sm sm:text-base text-gray-700 line-clamp-4 wrap-break-word">
              {note.content}
            </p>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

              {/* Tags */}
              <div className="flex gap-1 flex-wrap min-w-0">

                {note.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    #{tag}
                  </span>
                ))}

              </div>

              {/* Actions */}
              <div className="flex gap-3 self-end sm:self-auto">

                <MdOutlineEdit
                  className="text-gray-400 text-xl cursor-pointer hover:text-blue-400"
                  onClick={() => onEdit(note)}
                />

                <MdDeleteOutline
                  className="text-gray-400 text-xl cursor-pointer hover:text-red-400"
                  onClick={() => onDelete(note)}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NoteCard;