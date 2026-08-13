import { IoIosClose } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import TagInput from "../../components/TagInput/TagInput";

function AddEditNotes({
  openModal,
  onClick,
  onSubmit,
  title,
  onChange,
  content,
  onContentChange,
  addTags,
  tags,
  tagTitle,
  onTagChange,
  closeTag,
  isEditing
}) {
  return (
    <>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 sm:p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md bg-white p-3 sm:p-4 shadow-lg">
            <div className="p-2 rounded shadow-md">

              {/* Title */}
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <h6 className="uppercase text-gray-400">
                    Title
                  </h6>

                  <button onClick={onClick}>
                    <IoIosClose
                      className="text-2xl text-gray-400 cursor-pointer hover:text-gray-500"
                    />
                  </button>
                </div>

                <input
                  className="border-none p-2 outline-none"
                  placeholder="Enter title"
                  type="text"
                  value={title}
                  onChange={onChange}
                />
              </div>

              {/* Content */}
              <div>
                <h6 className="uppercase text-gray-400">
                  Content
                </h6>

                <textarea
                 className="w-full min-h-[150px] sm:min-h-[220px] resize-none outline-none border border-gray-300 bg-gray-100 rounded-md p-2"
                  rows={6}
                  name="content"
                  value={content}
                  onChange={onContentChange}
                  placeholder="Write the content"
                />
              </div>

              {/* Tags */}
              <div>
                <h4 className="uppercase text-gray-400">
                  Tags
                </h4>

                <div className="flex gap-2 m-1.5 flex-wrap">
                  {tags.map((tag) => (
                    <div
                      className="bg-gray-200 rounded p-1 text-lg capitalize flex justify-center items-center"
                      key={tag}
                    >
                      {tag}

                      <button
                        type="button"
                        className="text-gray-600 cursor-pointer hover:text-gray-500"
                        onClick={() => closeTag(tag)}
                      >
                        <IoIosClose className="text-2xl" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <TagInput
                    onChange={onTagChange}
                    tagTitle={tagTitle}
                  />

                  <button
                    type="button"
                    className="bg-blue-400 text-white p-3 rounded-md cursor-pointer hover:bg-blue-500"
                    onClick={addTags}
                  >
                    <LuPlus />
                  </button>
                </div>
              </div>

              {/* Add / Update */}
              <div className="mt-2 flex flex-col">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-2 rounded-md cursor-pointer hover:bg-blue-500"
                  onClick={onSubmit}
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddEditNotes;