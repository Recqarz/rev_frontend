import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  caseDataIdByAuditor,
  approveDataByAuditor,
  getAllAssignCaseByAuditor,
} from "../../redux/auditor/auditorAction";
import { formatTitle } from "../../utils/formatTitle";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getFinalReports,
  getFinalReportsPDF,
} from "../../redux/reports/reportAction";

const CompareDataAuditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalOpenForApprove, setIsModalOpenForApprove] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  const { accessToken } = useSelector((store) => store?.authReducer);
  const caseAllData = useSelector(
    (store) => store?.auditorReducer?.data?.indivisualData
  );
  const caseDetails = caseAllData.caseData;
  const propertyDetails = caseAllData.PropertyDetails;

  const auditorStatus = caseDetails?.verifiedBy?.auditor || false;
  const downloadReportMSStatus = useSelector(
    (store) => store?.reportReducer?.loadingMS
  );
  console.log("ms loading==>", downloadReportMSStatus);
  const downloadReportPdfStatus = useSelector(
    (store) => store?.reportReducer?.loadingPDF
  );
  console.log("pdf loading==>", downloadReportPdfStatus);

  useEffect(() => {
    if (accessToken && caseId) {
      dispatch(caseDataIdByAuditor(accessToken, caseId));
    }
  }, [dispatch, caseId, accessToken]);

  const caseData = [
    {
      key: "Client Name:",
      value: caseDetails?.clientName || "Not Provided",
    },
    {
      key: "Bank Name:",
      value: caseDetails?.bankId?.bankName || "Not Provided",
    },
    {
      key: "Bank Ref No:",
      value: caseDetails?.bankRefNo || "Not Provided",
    },
    {
      key: "Bank Report No:",
      value: caseDetails?.BOV_ReportNo || "Not Provided",
    },
    {
      key: "Visit Date:",
      value: new Date(caseDetails?.visitDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    },
    {
      key: "Client Address 1:",
      value: caseDetails?.clientAddress?.addressLine1 || "Not Provided",
    },
    {
      key: "Client Address 2:",
      value: caseDetails?.clientAddress?.addressLine2 || "Not Provided",
    },
    {
      key: "Client Contact No:",
      value: caseDetails?.contactNo || "Not Provided",
    },
    {
      key: "Client Plot No:",
      value: caseDetails?.clientAddress?.plotNumber || "Not Provided",
    },
    {
      key: "Client Street Name:",
      value: caseDetails?.clientAddress?.streetName || "Not Provided",
    },
    {
      key: "Client Land Mark:",
      value: caseDetails?.clientAddress?.landMark || "Not Provided",
    },
    { key: "State:", value: caseDetails?.state?.name || "Not Provided" },
    { key: "District:", value: caseDetails?.district?.name || "Not Provided" },
    { key: "Zone:", value: caseDetails?.zone?.name || "Not Provided" },
    {
      key: "Pincode:",
      value: caseDetails?.clientAddress?.pincode || "Not Provided",
    },
    {
      key: "Client Geo Location:",
      value: caseDetails?.clientGeoFormattedAddress || "Not Provided",
    },
  ];

  const fieldExecutivePropertyData = [
    {
      name: "Basic Info",
      data: [
        {
          key: "CLient Name:",
          value: propertyDetails?.applicantName || "Not Provided",
        },
        {
          key: "CLient Mobile No:",
          value: propertyDetails?.mobileNo || "Not Provided",
        },
        {
          key: "Bank Name:",
          value: propertyDetails?.bankName || "Not Provided",
        },
      ],
    },

    {
      name: "Person Met",
      data: [
        {
          key: "Person Met At Site:",
          value: propertyDetails?.personMetAtSite || "Not Provided",
        },
        {
          key: "Person Met Mobile No:",
          value: propertyDetails?.personMetAtSiteMobileNo || "Not Provided",
        },
      ],
    },
    {
      name: "Property Details",
      data: [
        {
          key: "Electricity Meter No.:",
          value: propertyDetails?.electricityMeterNo || "Not Provided",
        },
        {
          key: "Street:",
          value: propertyDetails?.propertyAddress?.street || "Not Provided",
        },
        {
          key: "Plot:",
          value: propertyDetails?.propertyAddress?.plotNo || "Not Provided",
        },
        {
          key: "Land Mark:",
          value: propertyDetails?.propertyAddress?.landmark || "Not Provided",
        },
        {
          key: "Pin code:",
          value: propertyDetails?.propertyAddress?.pinCode || "Not Provided",
        },
        {
          key: "Zone:",
          value: propertyDetails?.propertyAddress?.zone || "Not Provided",
        },
        {
          key: "State:",
          value: propertyDetails?.propertyAddress?.state || "Not Provided",
        },
        {
          key: "City:",
          value: propertyDetails?.propertyAddress?.city || "Not Provided",
        },
        {
          key: "Sewarage Connection:",
          value:
            propertyDetails?.sewerageConnection === true
              ? "Yes"
              : "No" || "Not Provided",
        },
      ],
    },
    {
      name: "Road Details",
      data: [
        {
          key: "Road width (Metres):",
          value:
            propertyDetails?.roadPropertySubject?.roadWidth || "Not Provided",
        },
        {
          key: "Primary Road Type:",
          value:
            formatTitle(
              propertyDetails?.roadPropertySubject?.primaryRoadType
            ) || "Not Provided",
        },
        {
          key: "Secondary Road Type:",
          value:
            formatTitle(
              propertyDetails?.roadPropertySubject?.secondaryRoadType
            ) || "Not Provided",
        },
        {
          key: "Road Widening Proposal:",
          value:
            propertyDetails?.roadPropertySubject?.roadWideningProposal === true
              ? "Yes"
              : "No" || "Not Provided",
        },
      ],
    },
    {
      name: "Property Identification",
      data: [
        {
          key: "Identification of property:",
          value:
            formatTitle(propertyDetails?.identificationOfProperty) ||
            "Not Provided",
        },
        {
          key: "Location of property:",
          value: propertyDetails?.locationOfProperty || "Not Provided",
        },
        {
          key: "Type of locality:",
          value: propertyDetails?.typesOfLocality || "Not Provided",
        },
        {
          key: "Type of area:",
          value: propertyDetails?.typesOfArea || "Not Provided",
        },
        {
          key: "Neighbour area:",
          value: formatTitle(propertyDetails?.neighbourhood) || "Not Provided",
        },
        {
          key: "Type of property:",
          value:
            formatTitle(propertyDetails?.typesOfProperty) || "Not Provided",
        },
        {
          key: "Current use of property:",
          value: propertyDetails?.currentUseOfProperty || "Not Provided",
        },
        {
          key: "Occupancy status:",
          value: propertyDetails?.occupancyStatus || "Not Provided",
        },
        {
          key: "Relation with loan applicant:",
          value: propertyDetails?.relationWithLoanApplicant || "Not Provided",
        },
      ],
    },
    {
      name: "Rent Property Details",
      data: [
        {
          key: "Tenant Name:",
          value:
            propertyDetails?.detailsOfRentedProperty?.nameOfTenant ||
            "Not Provided",
        },
        {
          key: "Tenant Mobile No.:",
          value:
            propertyDetails?.detailsOfRentedProperty?.mobileNo ||
            "Not Provided",
        },
        {
          key: "year of tenancy:",
          value:
            propertyDetails?.detailsOfRentedProperty?.yearsOfTenancy ||
            "Not Provided",
        },
        {
          key: "Monthly rent:",
          value:
            propertyDetails?.detailsOfRentedProperty?.monthlyRent ||
            "Not Provided",
        },
      ],
    },
    {
      name: "Other Construction Info",
      data: [
        {
          key: "stage of construction:",
          value:
            formatTitle(propertyDetails?.stageOfConstruction) || "Not Provided",
        },
        {
          key: "Year of construction:",
          value: propertyDetails?.yearOfConstruction || "Not Provided",
        },
        {
          key: "Area of plot length:",
          value: propertyDetails?.areaOfPlot?.length || "Not Provided",
        },
        {
          key: "Area of plot width:",
          value: propertyDetails?.areaOfPlot?.width || "Not Provided",
        },
        {
          key: "No. of floors:",
          value:
            propertyDetails?.structureOfBuilding?.numberOfFloors ||
            "Not Provided",
        },
        {
          key: "No of basements:",
          value:
            propertyDetails?.structureOfBuilding?.numberOfBasements ||
            "Not Provided",
        },
        {
          key: "Height of complete building:",
          value:
            propertyDetails?.structureOfBuilding?.heightOfCompleteBuilding ||
            "Not Provided",
        },
        {
          key: "Use of ground Floor:",
          value:
            formatTitle(
              propertyDetails?.groundFloorDetails?.useOfGroundFloor
            ) || "Not Provided",
        },
        {
          key: "Height of stilt Floor:",
          value:
            propertyDetails?.groundFloorDetails?.heightOfStiltFloor ||
            "Not Provided",
        },
        {
          key: "Area of parking:",
          value:
            propertyDetails?.groundFloorDetails?.areaOfParking ||
            "Not Provided",
        },
        {
          key: "No. of units at stilt:",
          value:
            propertyDetails?.dwellingUnits?.numberOfUnitsAtStiltFloor ||
            "Not Provided",
        },
        {
          key: "No. of units per floor:",
          value:
            propertyDetails?.dwellingUnits?.numberOfUnitsPerFloor ||
            "Not Provided",
        },
        {
          key: "TotalUnits:",
          value: propertyDetails?.dwellingUnits?.totalUnits || "Not Provided",
        },
        {
          key: "Right roof:",
          value:
            propertyDetails?.structureOfBuilding?.roofRights === true
              ? "Yes"
              : "No" || "Not Provided",
        },
        {
          key: "Demacration of plot:",
          value:
            propertyDetails?.demarcationOfPlot === true
              ? "Yes"
              : "No" || "Not Provided",
        },
      ],
    },
    {
      name: "Floors Info",
      data:
        propertyDetails?.details?.map((floor) => ({
          floorName: floor.floorName,
          data: [
            { key: "Floor Name:", value: floor.floorName },
            { key: "Accommodation:", value: floor.accommodation },
            { key: "Builtup Area:", value: floor.builtupArea },
            { key: "Projection Area:", value: floor.projectionArea },
          ],
        })) || [],
    },
    {
      name: "Other Details",
      data: [
        {
          key: "Value of property:",
          value: propertyDetails?.valueOfProperty || "Not Provided",
        },
        {
          key: "Remarks:",
          value: propertyDetails?.remarks || "Not Provided",
        },
      ],
    },
    {
      name: "CapturePhotos",
      data:
        propertyDetails?.images?.map((item, i) => ({
          key: `Image ${i + 1}`,
          value: item,
        })) || [],
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleApproveByAuditor = () => {
    setIsModalOpenForApprove(true);
  };

  const handleApproveCaseData = () => {
    dispatch(approveDataByAuditor(accessToken, caseId))
      .then((res) => {
        dispatch(getAllAssignCaseByAuditor(accessToken));
        navigate("/auditor/allReports");
      })
      .catch((error) => {
        console.error("Error case:", error);
      });
    setIsModalOpenForApprove(false);
  };

  const handelDownFinalReportMSWord = () => {
    dispatch(getFinalReports(accessToken, caseId));
  };

  const handelDownFinalReportPDF = () => {
    dispatch(getFinalReportsPDF(accessToken, caseId));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Final Report Button */}
      <div className="flex justify-end">
        {!auditorStatus ? (
          <div className="space-x-4">
            <button className="p-2 rounded-md text-white bg-gray-400 cursor-not-allowed">
              Pdf Report
            </button>
            <button className="p-2 rounded-md text-white bg-gray-400 cursor-not-allowed">
              Word Report
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              className={` p-2 rounded-md text-white ${
                downloadReportPdfStatus
                  ? "cursor-not-allowed bg-gray-600"
                  : "bg-[#51677e]"
              }`}
              disabled={downloadReportPdfStatus}
              onClick={handelDownFinalReportPDF}
            >
              {downloadReportPdfStatus ? "Downloading" : "PDF Report"}
            </button>
            <button
              className={` p-2 rounded-md text-white ${
                downloadReportMSStatus
                  ? "cursor-not-allowed bg-gray-600"
                  : "bg-[#51677e]"
              }`}
              disabled={downloadReportMSStatus}
              onClick={handelDownFinalReportMSWord}
            >
              {downloadReportMSStatus ? "Downloading" : "MS Report"}
            </button>
          </div>
        )}
      </div>
      {/* Property Details by Coordinator (Case) */}
      <div className="bg-[#51677e] shadow-lg shadow-[#68ceb4]">
        <div className="flex justify-center p-3">
          <h3 className=" text-white font-semibold uppercase">
            Property Details by Coordinator (Case)
          </h3>
        </div>

        <div className="bg-white p-3 lg:p-6">
          <div className="bg-[#68ceb4]  rounded-lg shadow p-2 flex flex-col gap-6">
            <div className="bg-white text-center rounded-md">
              <div className="p-1">
                <h1 className="text-lg font-medium">Coordinator</h1>
              </div>
            </div>

            <div className="bg-white rounded-md">
              <div className="p-1 grid grid-cols-1 lg:grid-cols-2 font-semibold text-sm">
                {caseData?.map((item, index) => (
                  <div key={index + 1} className=" w-full flex flex-col">
                    <div className="border border-[#68ceb4] w-full flex flex-row gap-4">
                      <div className="w-[40%] border-r border-[#68ceb4]">
                        <p className="pl-2">{item?.key}</p>
                      </div>
                      <div className="w-[60%]">{item?.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Update FieldExecutiveData Button */}
      <div className="flex justify-end">
        <Link to={`/auditor/updateFieldExecutive?fieldExecutiveId=${caseId}`}>
          <button
            className={`px-2 py-2 mr-1 rounded-md text-white bg-[#51677e]`}
            // disabled={supervisorStatus}
          >
            {/* {supervisorStatus ? "Updated" : "Update FE Data"} */}
            Update FE Data
          </button>
        </Link>
      </div>
      {/* Property Details Of Client, Collect by Field Executive */}
      <div className="bg-[#51677e] shadow-lg shadow-[#68ceb4]">
        <div className="flex justify-center p-3">
          <h3 className=" text-white font-semibold uppercase">
            Property Details Of Client, Collect by Field Executive
          </h3>
        </div>

        <div className="bg-white p-3 lg:p-6">
          <div className="bg-[#68ceb4]  rounded-lg shadow p-2 flex flex-col gap-6">
            <div className="bg-white text-center rounded-md">
              <div className="p-1">
                <h1 className="font-medium text-sm">Field Executive</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {fieldExecutivePropertyData?.map((item, i) => (
                <React.Fragment key={i + 1}>
                  {item?.name === "Floors Info" ? (
                    <div className="p-1 bg-white rounded-md ">
                      <div className="pl-2">
                        <h1 className="font-semibold uppercase text-[#51677e]">
                          {item?.name}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-4">
                        {item?.data?.length &&
                          item?.data?.map((ele, index) => (
                            <div
                              key={index + 1}
                              className="flex flex-col gap-1"
                            >
                              <div className="pl-2">
                                <h1 className="uppercase font-semibold text-[#51677e]">
                                  Floor: {ele?.floorName}
                                </h1>
                              </div>
                              <div className=" grid grid-cols-1 lg:grid-cols-2 font-semibold text-sm">
                                {ele?.data?.map((data, index) => (
                                  <div
                                    key={index + 1}
                                    className=" w-full flex flex-col"
                                  >
                                    <div className="border border-[#68ceb4] w-full flex flex-row gap-4">
                                      <div className="w-[40%] border-r border-[#68ceb4]">
                                        <p className="pl-2">{data?.key}</p>
                                      </div>
                                      <div className="w-[60%]">
                                        {data?.value}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : item?.name === "CapturePhotos" ? (
                    <div className="p-1 bg-white rounded-md ">
                      <div className="pl-2">
                        <h1 className="font-semibold uppercase text-[#51677e]">
                          {item?.name}
                        </h1>
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                        {item?.data?.map((item, index) => (
                          <div
                            key={index + 1}
                            className=" w-full flex flex-col justify-center items-center gap-2"
                          >
                            <div className="border rounded-md shadow-md shadow-slate-400 h-44 w-44 ">
                              <img
                                src={item?.value}
                                alt={item?.key}
                                className="h-full w-full cursor-pointer"
                                onClick={() => openModal(item?.value)}
                              />
                            </div>
                            <div className="text-center">
                              <h1>{item?.key}</h1>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-1 bg-white rounded-md ">
                      <div className="pl-2">
                        <h1 className="font-semibold uppercase text-[#51677e]">
                          {item?.name}
                        </h1>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 font-semibold text-sm">
                        {item?.data?.map((data, index) => (
                          <div
                            key={index + 1}
                            className=" w-full flex flex-col"
                          >
                            <div className="border border-[#68ceb4] w-full flex flex-row gap-4">
                              <div className="w-[40%] border-r border-[#68ceb4]">
                                <p className="pl-2">{data?.key}</p>
                              </div>
                              <div
                                className={`w-[60%] ${
                                  item?.name === "Other Details"
                                    ? "h-24 overflow-y-auto custom-scrollbar"
                                    : ""
                                }`}
                              >
                                {data?.value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`px-2 py-2 mr-1 rounded-md text-white ${
            auditorStatus ? "bg-gray-500 cursor-not-allowed" : "bg-green-900"
          }`}
          onClick={handleApproveByAuditor}
          disabled={auditorStatus}
        >
          {auditorStatus ? "Approved" : "Approve"}
        </button>
      </div>

      {isModalOpenForApprove && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-10 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full -ml-7 mt-0 md:ml-60 md:mt-60 lg:ml-[500px] lg:mt-[200px]">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setIsModalOpenForApprove(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to approve the case?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleApproveCaseData}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setIsModalOpenForApprove(false)}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 md:left-44 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-0.5 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-2xl bg-white text-gray-500 hover:text-red-600 rounded-sm"
              onClick={closeModal}
            >
              <MdOutlineCancelPresentation />
            </button>
            <img
              src={selectedImage}
              alt="profile_pic"
              className="max-h-[80vh] max-w-[100vw] object-contain mx-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareDataAuditor;
