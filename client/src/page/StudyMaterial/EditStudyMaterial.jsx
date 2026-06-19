import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import upload from "../../assets/images/upload.png";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify"

function EditStudyMaterial({
  data,
  onClose,
  materials,
  setMaterials,
  refreshFuntion,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class: "",
    subject: "",
    availableFor: "students",
    type: "",
    status: "Published",
    url: "",
  });

  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [classOptions, setClassOptions] = useState([
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
  ]);

  // AUTO FILL
  useEffect(() => {
    if (data) {
      if (!classOptions.includes(data.class)) setClassOptions([...classOptions, data.class])
      setFormData({
        title: data.title || "",
        description: data.description || "",
        class: data.class || "",
        subject: data.subject || "",
        availableFor: data.availableFor?.toLowerCase() || "students",
        type: data.type || "",
        status: data.status || "Published",
        url: data?.files?.[0]?.url || "",
      });

      // HANDLE EXISTING FILES
      if (data.files && Array.isArray(data.files)) {
        setExistingFiles(data.files);
      } else if (data.url && data.type !== "Link") {
        setExistingFiles([
          {
            name: data.fileName || data.title || "Uploaded File",
            size: data.fileSize || data.size || "0 MB",
            type: data.type,
            url: data.url,
          },
        ]);
      }
      else {
        setExistingFiles([]);
      }
    }
  }, [data]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // REMOVE EXISTING FILE
  const removeExistingFile = (index) => {
    setExistingFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // REMOVE NEW FILE
  const removeNewFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // HANDLE FILE CHANGE
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const totalFiles =
      existingFiles.length +
      files.length +
      selectedFiles.length;

    const limit = formData.type === "Image" ? 10 : 1;

    if (totalFiles > limit) {
      toast.info(
        `You can only upload up to ${limit} ${formData.type === "Image"
          ? "images"
          : "document"
        }.`
      );

      e.target.value = "";
      return;
    }

    const validatedFiles = selectedFiles.filter((file) => {
      if (formData.type === "Document") {
        const allowed = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        return allowed.includes(file.type);
      }

      if (formData.type === "Image") {
        return file.type.startsWith("image/");
      }

      return true;
    });

    if (validatedFiles.length !== selectedFiles.length) {
      toast.info("Some files were rejected due to invalid format.");
    }

    setFiles((prev) => [...prev, ...validatedFiles]);

    // ALLOW SAME FILE RESELECT
    e.target.value = "";
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      // VALIDATION
      if (!formData.title.trim()) {
        return toast.info("Title is required");
      }

      if (!formData.class) {
        return toast.info("Class is required");
      }

      if (!formData.subject) {
        return toast.info("Subject is required");
      }

      if (
        formData.type === "Link" &&
        !formData.url.trim()
      ) {
        return toast.info("URL is required");
      }

      setIsSubmitting(true);

      const formPayload = new FormData();

      formPayload.append("title", formData.title);
      formPayload.append(
        "description",
        formData.description
      );

      formPayload.append(
        "type",
        formData.type
          ? formData.type.charAt(0).toUpperCase() +
          formData.type.slice(1)
          : ""
      );

      formPayload.append("class", formData.class);
      formPayload.append("subject", formData.subject);
      formPayload.append(
        "availableFor",
        formData.availableFor
      );
      formPayload.append("status", formData.status);

      // SEND EXISTING FILES
      formPayload.append(
        "existingFiles",
        JSON.stringify(existingFiles)
      );

      // IMAGE FILES
      if (formData.type === "Image") {
        files.forEach((file) => {
          formPayload.append("images", file);
        });
      }

      // DOCUMENT FILE
      if (
        formData.type === "Document" &&
        files[0]
      ) {
        formPayload.append("document", files[0]);
      }

      // Link
      if (formData.type === "Link") {
        formPayload.append("url", formData.url);
      }

      const response = await api.put(
        `/studymaterials/${data._id}`,
        formPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("UPDATED =>", response.data);

      const updatedItem =
        response.data?.data || response.data;

      // UPDATE LOCAL UI
      const updatedMaterials = materials.map((item) =>
        item._id === data._id
          ? updatedItem
          : item
      );

      setMaterials(updatedMaterials);
      toast.success("Study Material Updated Successfully")
      if (refreshFuntion) {
        refreshFuntion();
      }


      onClose();
    } catch (error) {
      console.error(
        "UPDATE ERROR =>",
        error.response?.data || error.message
      );
      toast.error(error.response?.data || error.message || "Study Material Updated Failed")

      // alert(
      //   error.response?.data?.message ||
      //     "Failed to update study material"
      // );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white w-full max-w-3xl rounded-xl flex flex-col h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold">
              Edit Study Material
            </h2>

            <p className="text-[14px] text-[#9C9C9C]">
              Update the study material information
            </p>
          </div>

          <IoClose
            size={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TITLE */}
          <div>
            <label className="font-semibold text-[14px]">
              Material Title
            </label>

            <input
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full border border-gray-400 rounded-xl px-4 py-3 mt-1 text-[16px] focus:outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label className="font-semibold text-[14px]">
              Description
            </label>

            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description..."
              className="w-full border border-gray-400 rounded-xl px-4 py-3 mt-1 h-24 text-[16px] focus:outline-none resize-none"
            />
          </div>

          {/* CLASS + SUBJECT */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* CLASS */}
            <div>
              <label className="font-semibold text-[14px]">
                Class
              </label>

              <div className="relative mt-1">
                <select
                  id="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-400 rounded-xl px-4 py-3 pr-10 bg-white focus:outline-none"
                >
                  <option value="">
                    Select Class
                  </option>

                  {classOptions.map((cls) => (
                    <option
                      key={cls}
                      value={cls}
                    >
                      {cls}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  size={20}
                  className="absolute right-3 inset-y-0 my-auto text-[#9C9C9C] pointer-events-none"
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="font-semibold text-[14px]">
                Subject
              </label>

              <input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full border border-gray-400 rounded-xl px-4 py-3 mt-1 text-[16px] focus:outline-none"
              />
            </div>
          </div>

          {/* AVAILABLE FOR */}
          <div className="mt-4">
            <label className="font-semibold text-[14px]">
              Available For
            </label>

            <div className="relative mt-1">
              <select
                id="availableFor"
                value={formData.availableFor}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-400 rounded-xl px-4 py-3 pr-10 bg-white focus:outline-none"
              >
                <option value="all">
                  All
                </option>

                <option value="students">
                  Students
                </option>

                <option value="teachers">
                  Teachers
                </option>
              </select>

              <MdArrowDropDown
                size={20}
                className="absolute right-3 inset-y-0 my-auto text-[#9C9C9C] pointer-events-none"
              />
            </div>
          </div>

          {/* Link */}
          {formData.type === "Link" ? (
            <div className="mt-4">
              <label className="font-semibold text-[14px]">
                Resource URL
              </label>

              <input
                id="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border rounded-xl px-4 py-3 mt-1 text-[16px] focus:outline-none"
              />
            </div>
          ) : (
            <>
              {/* FILE UPLOAD */}
              <div className="mt-4">
                <label className="font-semibold text-[16px]">
                  Upload File
                </label>

                <div className="flex flex-col w-full mt-2 border border-dashed border-[#9C9C9C] rounded-[10px] p-6 text-center">
                  <input
                    type="file"
                    id="fileUpload"
                    hidden
                    multiple={
                      formData.type === "Image"
                    }
                    accept={
                      formData.type === "Image"
                        ? "image/*"
                        : ".pdf,.doc,.docx,.ppt,.pptx"
                    }
                    onChange={handleFileChange}
                  />

                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full mx-auto mb-2">
                      <img
                        src={upload}
                        alt="upload"
                      />
                    </div>

                    <p className="text-[12px] text-[#6A7282]">
                      {formData.type === "Image"
                        ? "JPG, PNG, JPEG up to 25MB"
                        : "PDF, DOC, DOCX, PPT, PPTX up to 25MB"}
                    </p>
                  </label>
                </div>

                {/* EXISTING FILES */}
                {existingFiles.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="mt-4 flex items-center justify-between bg-[#F0FDF4] border border-[#B9F8CF] p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-[#0D542B] text-[14px]">
                          Existing file:{" "}
                          {item.name ||
                            item.fileName}
                        </p>

                        <p className="text-[#00A63E] text-[12px]">
                          {item.size ||
                            item.fileSize ||
                            "0 MB"}
                        </p>
                      </div>

                      <IoClose
                        size={18}
                        className="cursor-pointer text-red-500"
                        onClick={() =>
                          removeExistingFile(index)
                        }
                      />
                    </div>
                  )
                )}

                {/* NEW FILES */}
                {/* {files.map((file, index) => (
                  <div
                    key={index}
                    className="mt-4 flex items-center justify-between bg-[#F0FDF4] border border-[#B9F8CF] p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-[#0D542B] text-[14px]">
                        New file: {file.name}
                      </p>

                      <p className="text-[#00A63E] text-[12px]">
                        {(
                          file.size /
                          (1024 * 1024)
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                    <div>
                      <p>image Preview</p>
                      {console.log(file)}
                      <img src={file.url} alt="image" srcset="" />
                    </div>

                    <IoClose
                      size={18}
                      className="cursor-pointer text-red-500"
                      onClick={() =>
                        removeNewFile(index)
                      }
                    />
                  </div>
                ))} */}
                {/* NEW FILES */}
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="mt-4 flex items-center justify-between bg-[#F0FDF4] border border-[#B9F8CF] p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-[#0D542B] text-[14px]">
                        New file: {file.name}
                      </p>

                      <p className="text-[#00A63E] text-[12px]">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    {/* IMAGE PREVIEW */}
                    {formData.type === "Image" && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    )}

                    <IoClose
                      size={18}
                      className="cursor-pointer text-red-500"
                      onClick={() => removeNewFile(index)}
                    />
                  </div>
                ))}

              </div>
            </>
          )}

          {/* PREVIEW */}
          <div className="mt-6 bg-blue-100 border border-[#BEDBFF] p-4 rounded-xl">
            <h3 className="text-[16px] font-semibold text-[#1C398E] mb-2">
              Updated Information
            </h3>

            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-[#1447E6]">
                Title:
              </span>

              <span className="text-right text-[14px] font-semibold text-[#1C398E]">
                {formData.title}
              </span>

              <span className="text-[#1447E6]">
                Class:
              </span>

              <span className="text-right text-[14px] font-semibold text-[#1C398E]">
                {formData.class}
              </span>

              <span className="text-[#1447E6]">
                Subject:
              </span>

              <span className="text-right text-[14px] font-semibold text-[#1C398E]">
                {formData.subject}
              </span>

              <span className="text-[#1447E6]">
                Visibility:
              </span>

              <span className="text-right text-[14px] font-semibold text-[#1C398E] capitalize">
                {formData.availableFor}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="w-[96px] h-[40px] border border-[#9C9C9C] rounded-[8px] text-[#364153] text-[14px] font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#0B3142] text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStudyMaterial;