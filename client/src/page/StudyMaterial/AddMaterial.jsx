import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  MdArrowDropDown,
  MdOutlineDescription,
  MdOutlineImage,
  MdOutlineLink,
} from "react-icons/md";
import upload from "../../assets/images/upload.png";
import api from "../../config/axiosInstance";
import { toast } from 'react-toastify'

function AddMaterial({ data,
  onClose,
  materials,
  setMaterials,
  refreshFuntion
}) {
  const [step, setStep] = useState(1);
  const [classOptions, setClassOptions] = useState([])
  const [subjects, setSubjects] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class: "",
    subject: "",
    availableFor: "students",
    type: "",
    url: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    class: "",
    subject: "",
    url: "",
    file: "",
  });



  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes')
      setClassOptions(response.data?.data)
      // console.log(classOptions)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects/AllSubjects')
      setSubjects(response.data?.data)
    } catch (error) {
      toast.error(error.message)
    }
  }




  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        title: data.title || "",
        description: data.description || "",
        class: data.class || "",
        subject: data.subject || "",
        type: data.type || "",
        url: data.url || "",
      }));
    }
    fetchClasses()
    fetchSubjects()
  }, [data]);

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   let updatedValue = value;
  //   if (id === "title" && value.length > 0) {
  //     updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
  //   }

  //   setFormData((prev) => ({ ...prev, [id]: updatedValue }));

  //   // Clear error when user types
  //   if (errors[id]) {
  //     setErrors((prev) => ({ ...prev, [id]: "" }));
  //   }
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  //   // Clear error when user types
  //   if (errors[id]) {
  //     setErrors((prev) => ({ ...prev, [id]: "" }));
  //   }
  // };


  const handleChange = (e) => {
    const { id, value } = e.target;

    let updatedValue = value;

    if (id === "title" && value.length > 0) {
      updatedValue =
        value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: updatedValue,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateStep1 = () => {
    let isValid = true;
    let newErrors = { title: "", class: "", subject: "" };

    if (!formData.title.trim()) {
      newErrors.title = "Content title is required";
      isValid = false;
    }

    if (!formData.class) {
      newErrors.class = "Please select a class";
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateStep2 = () => {
    if (!formData.type) {
      toast.info("Please select material type")
      // alert("Please select material type");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    let isValid = true;

    let newErrors = {
      url: "",
      file: "",
    };

    // LINK VALIDATION
    if (formData.type === "link") {
      if (!formData.url.trim()) {
        newErrors.url = "Resource URL is required";
        isValid = false;
      } else {
        try {
          new URL(formData.url);
        } catch {
          newErrors.url = "Enter valid URL (https://...)";
          isValid = false;
        }
      }
    }

    // FILE VALIDATION
    else {
      if (files.length === 0) {
        newErrors.file = "Please upload file";
        isValid = false;
      } else {
        const allowedDocs = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        // DOCUMENT VALIDATION
        if (formData.type === "document") {
          if (files.length > 10) {
            newErrors.file = "Maximum 10 documents allowed";
            isValid = false;
          }

          const invalidDoc = files.find(
            (file) =>
              !allowedDocs.includes(file.type) ||
              file.size > 25 * 1024 * 1024
          );

          if (invalidDoc) {
            newErrors.file =
              "Only PDF, DOC, DOCX, PPT, PPTX under 25MB allowed";
            isValid = false;
          }
        }

        // IMAGE VALIDATION
        if (formData.type === "image") {
          if (files.length > 10) {
            newErrors.file = "Maximum 10 images allowed";
            isValid = false;
          }

          const invalidImage = files.find(
            (file) =>
              !file.type.startsWith("image/") ||
              file.size > 25 * 1024 * 1024
          );

          if (invalidImage) {
            newErrors.file = "Only image files under 25MB allowed";
            isValid = false;
          }
        }
      }
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return isValid;
  };
  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const inputBaseStyle =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-[16px] font-normal text-[#1A1A1A] outline-none focus:border-gray-400 transition-colors";

  const handleBack = () => setStep((prev) => prev - 1);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // IMAGE MULTIPLE UPLOAD
    if (formData.type === "image") {
      const updatedFiles = [...files, ...selectedFiles];

      if (updatedFiles.length > 10) {
        toast.info("You can upload maximum 10 images")
        // alert("You can upload maximum 10 images");
        return;
      }

      const invalidImage = updatedFiles.find(
        (file) =>
          !file.type.startsWith("image/") ||
          file.size > 25 * 1024 * 1024
      );

      if (invalidImage) {
        toast.error("Only image files under 25MB are allowed");
        return;
      }

      const uniqueFiles = updatedFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) => f.name === file.name && f.size === file.size
          )
      );

      setFiles(uniqueFiles);
      setErrors((prev) => ({ ...prev, file: "" }));
    }

    // DOCUMENT MULTIPLE UPLOAD
    else if (formData.type === "document") {
      const allowedDocs = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      const updatedFiles = [...files, ...selectedFiles];

      if (updatedFiles.length > 10) {
        toast.info("You can upload maximum 10 documents");
        return;
      }

      const invalidDoc = updatedFiles.find(
        (file) =>
          !allowedDocs.includes(file.type) ||
          file.size > 25 * 1024 * 1024
      );

      if (invalidDoc) {
        toast.info("Only PDF, DOC, DOCX, PPT, PPTX under 25MB allowed");
        return;
      }

      const uniqueFiles = updatedFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) => f.name === file.name && f.size === file.size
          )
      );

      setFiles(uniqueFiles);
      setErrors((prev) => ({ ...prev, file: "" }));
    }

    e.target.value = "";
  };
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // const handleSubmit = () => {
  //   if (!validateStep3()) return;

  //   let newMaterial = {};

  //   // EXTERNAL LINK
  //   if (formData.type === "link") {
  //     newMaterial = {
  //       id: Date.now(),
  //       title: formData.title,
  //       description: formData.description,
  //       class: formData.class,
  //       subject: formData.subject,
  //       uploadedBy: "Admin",
  //       uploadDate: new Date().toLocaleDateString(),
  //       fileSize: "-",
  //       type: "External Link",
  //       url: formData.url,
  //     };
  //   }

  //   // DOCUMENT
  //   else if (formData.type === "document") {
  //     const file = files[0];

  //     newMaterial = {
  //       id: Date.now(),
  //       title: formData.title,
  //       description: formData.description,
  //       class: formData.class,
  //       subject: formData.subject,
  //       uploadedBy: "Admin",
  //       uploadDate: new Date().toLocaleDateString(),
  //       fileSize: formatFileSize(file.size),
  //       type: "Document",
  //       fileName: file.name,
  //       url: URL.createObjectURL(file),

  //       files: [
  //         {
  //           name: file.name,
  //           size: formatFileSize(file.size),
  //           url: URL.createObjectURL(file),
  //           type: "Document",
  //         },
  //       ],
  //     };
  //   }

  //   // IMAGE
  //   else if (formData.type === "image") {
  //     const imageFiles = files.map((file, index) => ({
  //       id: index + 1,
  //       name: file.name,
  //       size: formatFileSize(file.size),
  //       url: URL.createObjectURL(file),
  //       type: "Image",
  //     }));

  //     newMaterial = {
  //       id: Date.now(),
  //       title: formData.title,
  //       description: formData.description,
  //       class: formData.class,
  //       subject: formData.subject,
  //       uploadedBy: "Admin",
  //       uploadDate: new Date().toLocaleDateString(),
  //       fileSize: `${files.length} Images`,
  //       type: "Image",

  //       // MAIN IMAGE
  //       url: imageFiles[0]?.url,

  //       files: imageFiles,
  //     };
  //   }

  //   // UPDATE UI
  //   console.log(newMaterial)
  //   setMaterials((prev) => [newMaterial, ...prev]);

  //   onClose();
  // };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      class: formData.class,
      subject: formData.subject,
      availableFor: formData.availableFor,
      status: "Published",
      images: [],
      document: null,
    };

    // IMAGE TYPE
    if (formData.type === "image") {
      payload.images = files;
    }

    // DOCUMENT TYPE
    if (formData.type === "document") {
      payload.document = files[0];
    }

    // LINK TYPE
    if (formData.type === "link") {
      payload.url = formData.url;
    }

    // console.log("UPLOAD PAYLOAD =>", payload);

    // FORM DATA
    const formPayload = new FormData();

    formPayload.append("title", payload.title);
    formPayload.append("description", payload.description);
    formPayload.append("type", payload.type);
    formPayload.append("class", payload.class);
    formPayload.append("subject", payload.subject);
    formPayload.append("status", payload.status);
    formPayload.append("availableFor", payload.availableFor)

    // IMAGES
    if (payload.images.length > 0) {
      payload.images.forEach((img) => {
        formPayload.append("images", img);
      });
    }

    // DOCUMENT
    if (payload.document) {
      formPayload.append("document", payload.document);
    }

    // URL
    if (payload.url) {
      formPayload.append("url", payload.url);
    }

    // DEBUG
    // for (let pair of formPayload.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // console.log(formPayload)

    try {
      const response = await api.post(
        "/studymaterials",
        formPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("SUCCESS =>", response.data);

      // OPTIONAL UI UPDATE
      setMaterials((prev) => [
        response.data,
        ...prev,
      ]);
      refreshFuntion()
      toast.success("Study Material Uploaded successfully")

      onClose();
    } catch (error) {
      console.error(
        "UPLOAD ERROR =>",
        error.response?.data || error.message
      );
      toast.error(error?.message || "data upload failed")
    }
  }; ///deepdev
  const Stepper = () => (
    <div className="w-full mb-7 mt-8">
      <div className="flex items-center w-full relative">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <div
              className={`z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step >= num || (step === 3 && num === 4)
                ? "bg-[#12516E] text-white"
                : "bg-[#F1F4F5] text-[#99A1AF]"
                }`}
            >
              {num}
            </div>
            {num < 4 && (
              <div className="flex-1 h-1 bg-[#F1F4F5] mx-2 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-[#12516E] transition-all duration-300"
                  style={{
                    width:
                      step > num || (step === 3 && num === 3) ? "100%" : "0%",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="text-[14px] text-[#696969] mt-4 font-normal text-center">
        {step === 1 && "Step 1: Basic Details"}
        {step === 2 && "Step 2: Choose Material Type"}
        {step === 3 && "Step 3: Upload or Add Content"}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-['Segoe_UI']">
      <div className="bg-white w-full max-w-3xl rounded-2xl flex flex-col max-h-[92vh] shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center p-8 pb-4">
          <h2 className="text-[20px] font-semibold">Add Study Material</h2>
          <IoClose
            size={24}
            onClick={onClose}
            className="cursor-pointer text-[#1F1A1A]"
          />
        </div>

        {/* MAIN AREA */}
        <div className="px-8 pb-8 overflow-y-auto scrollbar-hide">
          <Stepper />

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-[14px] font-medium mb-1">
                  Content Title
                </label>
                <input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full ... capitalize border rounded-xl px-4 py-3 focus:outline-none ${errors.title ? "border-red-500" : "border-gray-200"
                    }`}
                  placeholder="e.g. photosynthesis notes"
                />
                {errors.title && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[14px] font-normal mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 h-28 focus:outline-none"
                  placeholder="Brief summary of the content"
                />
              </div>
              <div>
                <label className="block text-[14px] font-normal mb-1">
                  Available For
                </label>
                <div className="relative">
                  <select
                    id="availableFor"
                    value={formData.availableFor}
                    onChange={handleChange}
                    className={`${inputBaseStyle} appearance-none bg-white`}
                  >
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="teachers">Teachers</option>
                  </select>
                  <MdArrowDropDown
                    size={24}
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-normal mb-1">
                    Class
                  </label>
                  <div className="relative">
                    <select
                      id="class"
                      value={formData.class}
                      onChange={handleChange}
                      className={`${inputBaseStyle} appearance-none bg-white ${errors.class ? "border-red-500" : "border-gray-200"
                        }`}
                    >
                      <option value="">Select class</option>
                      {
                        classOptions.map((classes, index) => (
                          <option key={index} value={`${classes.className} ${classes.section}`}>{`${classes.className} ${classes.section}`}</option>
                        ))
                      }
                      {/* <option value="">Select class</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option> */}
                    </select>
                    <MdArrowDropDown
                      size={24}
                      className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {errors.class && (
                    <p className="text-red-500 text-[12px] mt-1">
                      {errors.class}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[14px] font-normal mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`${inputBaseStyle} appearance-none bg-white ${errors.subject ? "border-red-500" : "border-gray-200"
                        }`}
                    >
                      <option value="">Select subject</option>
                      {subjects
                        .filter((subject) =>
                          subject.applicableClasses?.some(
                            (cls) =>
                              `${cls.className} ${cls.section}` === formData.class
                          )
                        )
                        .map((subject, pos) => (
                          <option
                            key={pos}
                            value={subject.subjectName}
                          >
                            {subject.subjectName}
                          </option>
                        ))}
                    </select>
                    <MdArrowDropDown
                      size={24}
                      className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-[12px] mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-[14px] text-[#4A5565] font-normal mb-4">
                Choose the type of material you want to add
              </p>
              {[
                {
                  id: "document",
                  title: "Upload Document",
                  desc: "PDF, Word, PowerPoint, or other document files",
                  icon: (
                    <MdOutlineDescription className="text-blue-600" size={24} />
                  ),
                  bg: "bg-[#DBEAFE]",
                },
                {
                  id: "image",
                  title: "Upload Image",
                  desc: "Diagrams, charts, infographics, or photos",
                  icon: <MdOutlineImage className="text-green-600" size={24} />,
                  bg: "bg-[#DCFCE7]",
                },
                {
                  id: "link",
                  title: "Add External Link",
                  desc: "YouTube videos, websites, or online resources",
                  icon: <MdOutlineLink className="text-purple-600" size={24} />,
                  bg: "bg-[#F3E8FF]",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setFormData({ ...formData, type: item.id });
                    handleNext();
                  }}
                  className="flex items-center p-4 border-[1.6px] border-[#E6E6E6] rounded-xl cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mr-4`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#101828] text-[16px]">
                      {item.title}
                    </h4>
                    <p className="font-normal text-[14px] text-[#4A5565]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              {formData.type === "link" ? (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="url"
                    className="text-[14px] font-semibold text-[#101828]"
                  >
                    Resource URL
                  </label>
                  <input
                    id="url"
                    type="url"
                    placeholder="https://example.com/resource"
                    value={formData.url}
                    onChange={handleChange}
                    className={`w-full border rounded-[10px] px-4 py-3 text-[14px] text-[#696969] focus:outline-none focus:ring-2 transition-all ${errors.url ? "border-red-500" : "border-[#E6E6E6]"
                      }`}
                  />
                  {errors.url && (
                    <p className="text-red-500 text-[12px]">{errors.url}</p>
                  )}
                  <p className="text-[12px] text-[#9C9C9C] font-normal">
                    Enter the complete URL including https://
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[16px] font-semibold text-[#101828] mb-2">
                    Upload File
                  </h2>
                  <label className="flex flex-col items-center justify-center border border-dashed border-[#9C9C9C] rounded-[10px] p-6 cursor-pointer bg-white opacity-100 transition-all hover:bg-gray-50">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple={formData.type === "image"}
                      accept={
                        formData.type === "document"
                          ? ".pdf,.doc,.docx,.ppt,.pptx"
                          : "image/*"
                      }
                    />
                    <img src={upload} alt="Upload" />
                    <p className="text-[12px] font-normal text-[#6A7282] leading-none mt-1 text-center">
                      {formData.type === "image"
                        ? "PNG, JPG, JPEG, WEBP up to 25MB"
                        : "PDF, DOC, DOCX, PPT, or PPTX up to 25MB"}
                    </p>
                  </label>
                  {errors.file && (
                    <p className="text-red-500 text-[12px] mt-2">
                      {errors.file}
                    </p>
                  )}

                  {files.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="p-3 bg-[#F0FDF4] border border-[#B9F8CF] rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                              {formData.type === "document" ? (
                                <MdOutlineDescription
                                  className="text-[#12516E]"
                                  size={18}
                                />
                              ) : (
                                <MdOutlineImage
                                  className="text-[#12516E]"
                                  size={18}
                                />
                              )}
                            </div>

                            <div>
                              <p className="text-[14px] font-medium text-[#1A1A1A]">
                                {file.name}
                              </p>

                              <p className="text-[12px] text-[#696969]">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          {formData.type === "image" && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    )}

                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <IoClose size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Summary Table */}
              <div className="mt-6 bg-[#FAFBFF] p-4 rounded-xl space-y-2 text-[14px]">
                <span className="font-semibold text-[16px] text-[#1C1C1C]">
                  Summary
                </span>
                <div className="gap-2.5">
                  <div className="flex justify-between">
                    <span className="text-[#696969]">Title:</span>
                    <span className="font-semibold text-[14px]">
                      {formData.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#696969]">Class:</span>
                    <span className="font-semibold text-[14px]">
                      {formData.class}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#696969]">Subject:</span>
                    <span className="font-semibold text-[14px]">
                      {formData.subject}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#696969]">Type:</span>
                    <span className="font-semibold text-[14px] capitalize">
                      {formData.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-6">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="w-24 h-10 flex items-center justify-center gap-2 rounded-lg border border-[#9C9C9C] bg-[#FFFFFF] text-[16px] font-normal text-[#696969] hover:bg-gray-50 transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          {step !== 2 && (
            <button
              onClick={step < 3 ? handleNext : handleSubmit}
              className="bg-[#0B3142] text-white px-6 py-2 rounded-xl"
            >
              {step === 3 ? "Publish Material" : "Continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMaterial;
