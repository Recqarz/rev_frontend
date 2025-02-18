import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllBankData } from "../redux/banks/bankAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../redux/users/userAction";
import {
  getProfileByToken,
  updateProfileAvatar,
  updateProfileByToken,
} from "../redux/profile/profileAction";
import { FaCamera } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineCancelPresentation } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state) => state.profileReducer);
  const [profilePic, setProfilePic] = useState(null); //for getting image file //file like: all object keys of file
  const [onchangeAvatar, setOnchangeAvatar] = useState(null); //for getting to preview the
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  //get banks
  const { accessToken } = useSelector((store) => store?.authReducer);
  const {
    isLoading,
    isError,
    data: bankData,
  } = useSelector((state) => state.allBankReducer);
  const { banks } = bankData;

  useEffect(() => {
    dispatch(getProfileByToken(accessToken));
    dispatch(getAllBankData());
  }, [dispatch]);

  const AddUserFormSchema = [
    {
      key: 1,
      label: "First Name",
      htmlFor: "firstName",
      name: "firstName",
      type: "text",
      id: "firstName",
      mainDivClassname: "col-span-4 md:col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter first name",
      validation: Yup.string().required("First Name is required"),
      disabled: false,
      initialValue: profileData?.firstName || "",
    },
    {
      key: 2,
      label: "Last Name",
      htmlFor: "lastName",
      name: "lastName",
      type: "text",
      id: "lastName",
      mainDivClassname: "col-span-4 md:col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter last name",
      validation: Yup.string().required("Last Name is required"),
      disabled: false,
      initialValue: profileData?.lastName || "",
    },
    {
      key: 3,
      label: "Email",
      htmlFor: "email",
      name: "email",
      type: "email",
      id: "email",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter email",
      validation: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      disabled: false,
      initialValue: profileData?.email || "",
    },
    {
      key: 4,
      label: "Mobile Code",
      htmlFor: "mobileCode",
      as: "select",
      name: "mobileCode",
      // type: 'mobileCode',
      id: "mobileCode",
      mainDivClassname: "col-span-4 md:col-span-1",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone code",
      options: [
        // { key: 1, value: '', label: 'Select Code' }, // Default empty value
        { key: 2, value: "+91", label: "+91" },
      ],
      validation: Yup.string().required("Mobile Code is required"),
      disabled: true,
      initialValue: "+91",
    },
    {
      key: 5,
      label: "Mobile No.",
      htmlFor: "mobile",
      name: "mobile",
      type: "number",
      id: "mobile",
      mainDivClassname: "col-span-4 md:col-span-3",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone number",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, "")) // Remove leading zeros
        .matches(/^\d{10}$/, "Phone number must be 10 digits") // Validate 10-digit number
        .required("Mobile No. is required")
        .nullable(),
      disabled: false,

      initialValue: profileData?.mobile || "",
    },
    {
      key: 6,
      label: "Role",
      htmlFor: "role",
      as: "select",
      name: "role",
      // type: 'role',
      id: "role",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "cursor-not-allowed shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter country name",
      options: [
        { key: 1, value: "", label: "Select Role" }, // Default empty value
        { key: 3, value: "fieldExecutive", label: "Field Executive" },
        { key: 4, value: "coordinator", label: "Coordinator" },
        { key: 5, value: "auditor", label: "Auditor" },
        { key: 6, value: "superVisor", label: "Supervisor" },
        { key: 7, value: "admin", label: "Admin" },
      ],
      validation: Yup.string().required("Role is required"),
      disabled: true,
      initialValue: profileData?.role || "",
    },
    {
      key: 7,
      label: "Work for bank",
      htmlFor: "workForBank",
      as: "select",
      name: "workForBank",
      // type: 'workForBank',
      id: "workForBank",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "cursor-not-allowed shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter country name",

      options: [
        { key: 0, value: "", label: "Select Bank" }, // Default empty value
        ...(banks ?? [])?.map((bank, index) => ({
          key: index + 1, // Adjust index to avoid conflict with the default option key
          value: bank?._id,
          label: `${bank?.bankName} (${bank?.branchName})`,
        })),
      ],
      validation: Yup.string().required("Bank Name is required"),
      disabled: true,
      initialValue: profileData?.workForBank || "",
    },
  ];
  const validationSchema = Yup.object(
    AddUserFormSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  const initialValues = AddUserFormSchema.reduce((values, field) => {
    values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
    return values;
  }, {});

  const handleSubmit = (values, { resetForm }) => {
    dispatch(updateProfileByToken(values, accessToken));
    resetForm();
  };

  const handleAvatarUpdate = (e) => {
    e.preventDefault();
    if (!profilePic) return;
    const formData = new FormData();
    formData.append("avatar", profilePic);
    dispatch(updateProfileAvatar(formData, accessToken));
    setProfilePic(null);
    setOnchangeAvatar(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 ">
        <div className="">
          <div className="bg-slate-800 gap-6 flex items-center justify-center">
            <div className="bg-slate-800 relative shadow-xl overflow-hidden rounded-xl p-2 ">
              <form onSubmit={handleAvatarUpdate}>
                <div className="flex flex-row items-center gap-4 relative">
                  {/* Profile Picture */}
                  <div className="relative border-2 p-1 border-[#73d1ba] rounded-full">
                    <img
                      src={
                        onchangeAvatar ||
                        profileData?.avatar ||
                        "https://i.pinimg.com/736x/41/e0/39/41e0398984b0f1a0c79acfb0694bfcce.jpg"
                      }
                      alt="profile_pic"
                      onClick={() => setIsModalOpen(true)} // Open modal on click
                      // target="_blank"
                      className="w-24 group-hover:w-28 group-hover:h-28 h-24 object-center object-cover rounded-full cursor-pointer"
                    />

                    {/* Camera Icon with File Input */}
                    <div>
                      <label
                        htmlFor="avatar"
                        className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
                      >
                        <FaCamera className="text-sm" />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar"
                        name="avatar"
                        capture="user" // Opens the camera for mobile devices
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setProfilePic(file);
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setOnchangeAvatar(event.target.result); // Update the profile picture preview
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="w-fit">
                    <h1 className="text-white font-bold">
                      {profileData?.firstName} {profileData?.lastName}
                    </h1>
                    <p className="text-white uppercase">{profileData?.role}</p>
                    <a className="text-xs text-white opacity-1000">
                      {profileData?.email}
                    </a>
                  </div>
                </div>

                {/* Profile pic update submission section */}
                {profilePic && (
                  <div className="flex justify-end">
                    <div className="flex gap-2 text-sm">
                      <button
                        onClick={() => {
                          setProfilePic(null);
                          setOnchangeAvatar(null);
                        }}
                        type="button"
                      >
                        <MdOutlineCancel className="text-red-500 text-2xl" />
                      </button>
                      <button type="submit">
                        <TiTickOutline className="text-blue-500 text-2xl" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className=" bg-gray-100  rounded-lg shadow-xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, resetForm, dirty }) => (
              <Form>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                  {AddUserFormSchema?.map((item) => (
                    <div key={item?.key} className={item?.mainDivClassname}>
                      <div>
                        <label
                          htmlFor={item?.htmlFor}
                          className="text-sm font-medium text-gray-900 block mb-2"
                        >
                          {item?.label}
                        </label>
                        {item?.as === "select" ? (
                          <Field
                            disabled={item?.disabled}
                            as="select"
                            name={item?.name}
                            id={item?.id}
                            className={item?.inputFieldClassName}
                          >
                            {item?.options?.map((option) => (
                              <option key={option?.key} value={option?.value}>
                                {option?.label}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            disabled={item?.disabled}
                            type={item?.type}
                            name={item?.name}
                            id={item?.id}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={item?.placeholder}
                          />
                        )}
                        <ErrorMessage
                          name={item?.name}
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center md:justify-end m-4">
                  {/* <button
                  type="button" // Use type="button" to prevent triggering form submission
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                  onClick={() => resetForm()}
                >
                  Reset
                </button> */}
                  <button
                    type="submit"
                    className={`hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg ${
                      dirty
                        ? "bg-[#25b992] cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!dirty || isSubmitting} // Disable if not dirty or submitting
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Image Popup Modal for preview*/}
        {isModalOpen && (
          <div
            id="modalBackground"
            className="fixed inset-0 md:left-44 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target.id === "modalBackground") {
                setIsModalOpen(false);
              }
            }}
          >
            <div className="relative bg-white p-0.5 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-2xl bg-white text-gray-500 hover:text-red-600 rounded-sm"
                onClick={() => setIsModalOpen(false)}
              >
                <MdOutlineCancelPresentation />
              </button>
              <img
                src={
                  onchangeAvatar ||
                  profileData?.avatar ||
                  "https://i.pinimg.com/736x/41/e0/39/41e0398984b0f1a0c79acfb0694bfcce.jpg"
                }
                alt="profile_pic"
                className="w-fit h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
