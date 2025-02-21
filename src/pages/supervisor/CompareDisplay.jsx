import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatTitle } from "../../utils/formatTitle";

const CompareDisplay = () => {
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  console.log("caseId", caseId);
  const location = useLocation();
  const reportData = location.state?.reportData;
  console.log("reportData==>", reportData);
  const caseData = [
    {
      key: "Client Name:",
      value: reportData?.case?.clientName ?? "Not Provided",
    },
    { key: "Bank Name:", value: reportData?.case?.bankId ?? "Not Provided" },
    {
      key: "Bank Ref No:",
      value: reportData?.case?.bankRefNo ?? "Not Provided",
    },
    {
      key: "Bank Report No:",
      value: reportData?.case?.BOV_ReportNo ?? "Not Provided",
    },
    {
      key: "Visit Date:",
      value: new Date(reportData?.case?.visitDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    },
    {
      key: "Client Address 1:",
      value: reportData?.case?.clientAddress?.addressLine1 ?? "Not Provided",
    },
    {
      key: "Client Address 2:",
      value: reportData?.case?.clientAddress?.addressLine2 ?? "Not Provided",
    },
    {
      key: "Client Contact No:",
      value: reportData?.case?.contactNo ?? "Not Provided",
    },
    {
      key: "Client Plot No:",
      value: reportData?.case?.clientAddress?.plotNumber ?? "Not Provided",
    },
    {
      key: "Client Street Name:",
      value: reportData?.case?.clientAddress?.streetName ?? "Not Provided",
    },
    {
      key: "Client Land Mark:",
      value: reportData?.case?.clientAddress?.landMark ?? "Not Provided",
    },
    { key: "State:", value: reportData?.case?.state ?? "Not Provided" },
    { key: "District:", value: reportData?.case?.district ?? "Not Provided" },
    { key: "Zone:", value: reportData?.case?.zone },
    {
      key: "Pincode:",
      value: reportData?.case?.clientAddress?.pincode ?? "Not Provided",
    },
    {
      key: "Client Geo Location:",
      value: reportData?.case?.clientGeoFormattedAddress || "Not Provided",
    },
  ];

  const fieldExecutivePropertyData = [
    {
      name: "Basic Info",
      data: [
        {
          key: "Applicant Name:",
          value: reportData?.propertyDetails?.applicantName || "Not Provided",
        },
        {
          key: "Applicant Mobile No:",
          value: reportData?.propertyDetails?.mobileNo || "Not Provided",
        },
        {
          key: "Bank Name:",
          value: reportData?.propertyDetails?.bankName || "Not Provided",
        },
      ],
    },

    {
      name: "Person Meet",
      data: [
        {
          key: "Person Meet At Site:",
          value: reportData?.propertyDetails?.personMetAtSite || "Not Provided",
        },
        {
          key: "Person Meet Mobile No:",
          value:
            reportData?.propertyDetails?.personMetAtSiteMobileNo ||
            "Not Provided",
        },
      ],
    },
    {
      name: "Property Details",
      data: [
        {
          key: "Electricity Meter No.:",
          value:
            reportData?.propertyDetails?.electricityMeterNo || "Not Provided",
        },
        {
          key: "Street:",
          value:
            reportData?.propertyDetails?.propertyAddress?.street ||
            "Not Provided",
        },
        {
          key: "Plot:",
          value:
            reportData?.propertyDetails?.propertyAddress?.plotNo ||
            "Not Provided",
        },
        {
          key: "Land Mark:",
          value:
            reportData?.propertyDetails?.propertyAddress?.landmark ||
            "Not Provided",
        },
        {
          key: "Pin code:",
          value:
            reportData?.propertyDetails?.propertyAddress?.pinCode ||
            "Not Provided",
        },
        {
          key: "Zone:",
          value:
            reportData?.propertyDetails?.propertyAddress?.zone ||
            "Not Provided",
        },
        {
          key: "State:",
          value:
            reportData?.propertyDetails?.propertyAddress?.state ||
            "Not Provided",
        },
        {
          key: "City:",
          value:
            reportData?.propertyDetails?.propertyAddress?.city ||
            "Not Provided",
        },
        {
          key: "Sewarage Connection:",
          value:
            reportData?.propertyDetails?.sewerageConnection === true
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
            reportData?.propertyDetails?.roadPropertySubject?.roadWidth ||
            "Not Provided",
        },
        {
          key: "Primary Road Type:",
          value:
            reportData?.propertyDetails?.roadPropertySubject?.primaryRoadType ||
            "Not Provided",
        },
        {
          key: "Secondary Road Type:",
          value:
            reportData?.propertyDetails?.roadPropertySubject
              ?.secondaryRoadType || "Not Provided",
        },
        {
          key: "Road Widening Proposal:",
          value:
            reportData?.propertyDetails?.roadPropertySubject
              ?.roadWideningProposal === true
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
            formatTitle(
              reportData?.propertyDetails?.identificationOfProperty
            ) || "Not Provided",
        },
        {
          key: "Location of property:",
          value:
            reportData?.propertyDetails?.locationOfProperty || "Not Provided",
        },
        {
          key: "Type of locality:",
          value: reportData?.propertyDetails?.typesOfLocality || "Not Provided",
        },
        {
          key: "Type of area:",
          value: reportData?.propertyDetails?.typesOfArea || "Not Provided",
        },
        {
          key: "Neighbour area:",
          value: reportData?.propertyDetails?.neighbourhood || "Not Provided",
        },
        {
          key: "Type of property:",
          value:
            formatTitle(reportData?.propertyDetails?.typesOfProperty) ||
            "Not Provided",
        },
        {
          key: "Current use of property:",
          value:
            reportData?.propertyDetails?.currentUseOfProperty || "Not Provided",
        },
        {
          key: "Occupancy status:",
          value: reportData?.propertyDetails?.occupancyStatus || "Not Provided",
        },
        {
          key: "Relation with loan applicant:",
          value:
            reportData?.propertyDetails?.relationWithLoanApplicant ||
            "Not Provided",
        },
      ],
    },
    {
      name: "Rent Property Details",
      data: [
        {
          key: "Tenant Name:",
          value:
            reportData?.propertyDetails?.detailsOfRentedProperty
              ?.nameOfTenant || "Not Provided",
        },
        {
          key: "Tenant Mobile No.:",
          value:
            reportData?.propertyDetails?.detailsOfRentedProperty?.mobileNo ||
            "Not Provided",
        },
        {
          key: "year of tenancy:",
          value:
            reportData?.propertyDetails?.detailsOfRentedProperty
              ?.yearsOfTenancy || "Not Provided",
        },
        {
          key: "Monthly rent:",
          value:
            reportData?.propertyDetails?.detailsOfRentedProperty?.monthlyRent ||
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
            formatTitle(reportData?.propertyDetails?.stageOfConstruction) ||
            "Not Provided",
        },
        {
          key: "Year of construction:",
          value:
            reportData?.propertyDetails?.yearOfConstruction || "Not Provided",
        },
        {
          key: "Area of plot length:",
          value:
            reportData?.propertyDetails?.areaOfPlot?.length || "Not Provided",
        },
        {
          key: "Area of plot width:",
          value:
            reportData?.propertyDetails?.areaOfPlot?.width || "Not Provided",
        },
        {
          key: "No. of floors:",
          value:
            reportData?.propertyDetails?.structureOfBuilding?.numberOfFloors ||
            "Not Provided",
        },
        {
          key: "No of basements:",
          value:
            reportData?.propertyDetails?.structureOfBuilding
              ?.numberOfBasements || "Not Provided",
        },
        {
          key: "Height of complete building:",
          value:
            reportData?.propertyDetails?.structureOfBuilding
              ?.heightOfCompleteBuilding || "Not Provided",
        },
        {
          key: "Use of ground Floor:",
          value:
            reportData?.propertyDetails?.groundFloorDetails?.useOfGroundFloor ||
            "Not Provided",
        },
        {
          key: "Height of stilt Floor:",
          value:
            reportData?.propertyDetails?.groundFloorDetails
              ?.heightOfStiltFloor || "Not Provided",
        },
        {
          key: "Area of parking:",
          value:
            reportData?.propertyDetails?.groundFloorDetails?.areaOfParking ||
            "Not Provided",
        },
        {
          key: "No. of units at stilt:",
          value:
            reportData?.propertyDetails?.dwellingUnits
              ?.numberOfUnitsAtStiltFloor || "Not Provided",
        },
        {
          key: "No. of units per floor:",
          value:
            reportData?.propertyDetails?.dwellingUnits?.numberOfUnitsPerFloor ||
            "Not Provided",
        },
        {
          key: "TotalUnits:",
          value:
            reportData?.propertyDetails?.dwellingUnits?.totalUnits ||
            "Not Provided",
        },
        {
          key: "Right roof:",
          value:
            reportData?.propertyDetails?.structureOfBuilding?.roofRights ===
            true
              ? "Yes"
              : "No" || "Not Provided",
        },
        {
          key: "Demacration of plot:",
          value:
            reportData?.propertyDetails?.demarcationOfPlot === true
              ? "Yes"
              : "No" || "Not Provided",
        },
      ],
    },
    {
      name: "Floors Info",
      data:
        reportData?.propertyDetails?.details?.map((floor) => ({
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
          value: reportData?.propertyDetails?.valueOfProperty || "Not Provided",
        },
        {
          key: "Remark.:",
          value: reportData?.propertyDetails?.remarks || "Not Provided",
        },
      ],
    },
    {
      name: "CapturePhotos",
      data:
        reportData?.propertyDetails?.images?.map((item, i) => ({
          key: `Image ${i + 1}`,
          value: item,
        })) || [],
    },
  ];
  return (
    <div className="w-full flex flex-col gap-6">
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

      <Link to={`/supervisor/updateFieldExecutive?fieldExecutiveId=${caseId}`}>
        <div className="flex justify-end">
          <button className="px-2 py-1 bg-[#51677e] rounded-md">Update</button>
        </div>
      </Link>

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
                                className="h-full w-full"
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
                      <div className=" grid grid-cols-1 lg:grid-cols-2 font-semibold text-sm">
                        {item?.data?.map((data, index) => (
                          <div
                            key={index + 1}
                            className=" w-full flex flex-col"
                          >
                            <div className="border border-[#68ceb4] w-full flex flex-row gap-4">
                              <div className="w-[40%] border-r border-[#68ceb4]">
                                <p className="pl-2">{data?.key}</p>
                              </div>
                              <div className="w-[60%]">{data?.value}</div>
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
    </div>
  );
};

export default CompareDisplay;
