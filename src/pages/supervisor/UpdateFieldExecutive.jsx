import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getCaseDataBySupervisor } from "../../redux/supervisor/supervisorAction";

const UpdateFieldExecutive = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fieldExecutiveId = searchParams.get("fieldExecutiveId");

  const { accessToken } = useSelector((store) => store?.authReducer);
  const supervisor = useSelector(
    (store) => store?.supervisorReducer?.data?.allData
  );
  const feAPiData = supervisor?.PropertyDetails;

  const [feData, setFieldExecutiveData] = useState({
    bankName: feAPiData?.bankName,
    applicantName: feAPiData?.applicantName,
    mobileNo: feAPiData?.mobileNo,
    personMetAtSite: feAPiData?.personMetAtSite,
    personMetAtSiteMobileNo: feAPiData?.personMetAtSiteMobileNo,
    electricityMeterNo: feAPiData?.electricityMeterNo,
    street: feAPiData?.propertyAddress?.street,
    plotNo: feAPiData?.propertyAddress?.plotNo,
    landmark: feAPiData?.propertyAddress?.landmark,
    pinCode: feAPiData?.propertyAddress?.pinCode,
    zone: feAPiData?.propertyAddress?.zone,
    city: feAPiData?.propertyAddress?.city,
    state: feAPiData?.propertyAddress?.state,
    sewerageConnection: feAPiData?.sewerageConnection,
    roadWidth: feAPiData?.roadPropertySubject?.roadWidth,
    primaryRoadType: feAPiData?.roadPropertySubject?.primaryRoadType,
    secondaryRoadType: feAPiData?.roadPropertySubject?.secondaryRoadType,
    roadWideningProposal: feAPiData?.roadPropertySubject?.roadWideningProposal,
    identificationOfProperty: feAPiData?.identificationOfProperty,
    locationOfProperty: feAPiData?.locationOfProperty,
    typesOfLocality: feAPiData?.typesOfLocality,
    typesOfArea: feAPiData?.typesOfArea,
    neighbourhood: feAPiData?.neighbourhood,
    typesOfProperty: feAPiData?.typesOfProperty,
    currentUseOfProperty: feAPiData?.currentUseOfProperty,
    occupancyStatus: feAPiData?.occupancyStatus,
    relationWithLoanApplicant: feAPiData?.relationWithLoanApplicant,
    nameOfTenant: feAPiData?.detailsOfRentedProperty?.nameOfTenant,

    mobileNo: feAPiData?.detailsOfRentedProperty.mobileNo,

    yearsOfTenancy: feAPiData?.detailsOfRentedProperty?.yearsOfTenancy,
    monthlyRent: feAPiData?.detailsOfRentedProperty?.monthlyRent,
    stageOfConstruction: feAPiData?.stageOfConstruction,
    yearOfConstruction: feAPiData?.yearOfConstruction,
    length: feAPiData?.areaOfPlot?.length,
    width: feAPiData?.areaOfPlot?.width,
    numberOfFloors: feAPiData?.structureOfBuilding?.numberOfFloors,
    numberOfBasements: feAPiData?.structureOfBuilding?.numberOfBasements,
    heightOfCompleteBuilding:
      feAPiData?.structureOfBuilding?.heightOfCompleteBuilding,
    useOfGroundFloor: feAPiData?.groundFloorDetails?.useOfGroundFloor,
    heightOfStiltFloor: feAPiData?.groundFloorDetails?.heightOfStiltFloor,
    areaOfParking: feAPiData?.groundFloorDetails?.areaOfParking,
    numberOfUnitsAtStiltFloor:
      feAPiData?.dwellingUnits?.numberOfUnitsAtStiltFloor,
    totalUnits: feAPiData?.dwellingUnits?.totalUnits,
    roofRights: feAPiData?.structureOfBuilding?.roofRights,
    demarcationOfPlot: feAPiData?.demarcationOfPlot,

    details:
      feAPiData?.details?.map((item) => ({
        floorName: item?.floorName || "",
        accommodation: item?.accommodation || "",
        builtupArea: item?.builtupArea || "",
        projectionArea: item?.projectionArea || "",
      })) || [],

    valueOfProperty: feAPiData?.valueOfProperty,
    remarks: feAPiData?.remarks,

    images: feAPiData?.images,
  });

  const floorsInfo = feData?.details?.length
    ? feData.details.flatMap((floor, index) => [
        {
          label: `Floor Name`,
          type: "text",
          name: "floorName",
          value: floor.floorName || "",
          index,
        },
        {
          label: `Floor Accommodation`,
          type: "text",
          name: "accommodation",
          value: floor.accommodation || "",
          index,
        },
        {
          label: `Floor Builtup Area`,
          type: "text",
          name: "builtupArea",
          value: floor.builtupArea || "",
          index,
        },
        {
          label: `Floor Projection Area`,
          type: "text",
          name: "projectionArea",
          placeholder: "Enter Floor Name",
          value: floor.projectionArea || "",
          index,
        },
      ])
    : [];

  const formSections = [
    {
      title: "Basic Info",
      fields: [
        {
          label: "Bank Name",
          type: "text",
          name: "bankName",
          placeholder: "Enter Bank Name",
          value: feData.bankName || "",
        },
        {
          label: "Applicant Name",
          type: "text",
          name: "applicantName",
          placeholder: "Enter Applicant Name",
          value: feData.applicantName || "",
        },
        {
          label: "Mobile Number",
          type: "number",
          name: "mobileNo",
          placeholder: "Enter Mobile Number",
          value: feData.mobileNo || "",
        },
      ],
    },
    {
      title: "Person Met",
      fields: [
        {
          label: "Person Met At Site",
          type: "text",
          name: "personMetAtSite",
          placeholder: "Enter Person Met At Site",
          value: feData.personMetAtSite || "",
        },
        {
          label: "Person Met Mobile No",
          type: "number",
          name: "personMetAtSiteMobileNo",
          placeholder: "Enter Person Mobile Number",
          value: feData.personMetAtSiteMobileNo || "",
        },
      ],
    },
    // // Property Address
    {
      title: "Property Address",
      fields: [
        {
          label: "Electricity Meter No",
          type: "text",
          name: "electricityMeterNo",
          placeholder: "Enter Electricity Meter No.",
          value: feData.electricityMeterNo || "",
        },
        {
          label: "Street",
          type: "text",
          name: "street",
          placeholder: "Enter Street",
          value: feData.street || "",
        },
        {
          label: "Plot",
          type: "text",
          name: "plotNo",
          placeholder: "Enter Plot",
          value: feData.plotNo || "",
        },
        {
          label: "Landmark",
          type: "text",
          name: "landmark",
          placeholder: "Enter Landmark",
          value: feData.landmark || "",
        },
        {
          label: "Pin Code",
          type: "number",
          name: "pinCode",
          placeholder: "Enter Pin Code",
          value: feData.pinCode || "",
        },
        {
          label: "Zone",
          type: "select",
          name: "zone",
          options: [
            { key: 1, value: "north", label: "North" },
            { key: 2, value: "south", label: "South" },
            { key: 3, value: "east", label: "East" },
            { key: 4, value: "west", label: "West" },
          ],
          value: feData.zone,
        },
        {
          label: "City",
          type: "text",
          name: "city",
          placeholder: "Enter City",
          value: feData.city || "",
        },
        {
          label: "State",
          type: "text",
          name: "state",
          placeholder: "Enter State",
          value: feData.state || "",
        },
        {
          label: "Sewerage Connection",
          type: "select",
          name: "sewerageConnection",
          options: [
            { key: 1, value: true, label: "True" },
            { key: 2, value: false, label: "False" },
          ],
          value: feData.sewerageConnection || "",
        },
      ],
    },
    // // Road Details
    {
      title: "Road Details",
      fields: [
        {
          label: "Road Width(Meters)",
          type: "number",
          name: "roadWidth",
          placeholder: "Enter Road Width",
          value: feData.roadWidth || "",
        },
        {
          label: "Primary road type",
          type: "select",
          name: "primaryRoadType",
          options: [
            { key: 1, value: "mainRoad", label: "Main Road" },
            { key: 2, value: "innerRoad", label: "Inner Road" },
          ],
          value: feData.primaryRoadType || "",
        },
        {
          label: "Secondary road type",
          type: "select",
          name: "secondaryRoadType",
          options: [
            { key: 1, value: "pakkaRoad", label: "Pakka Road" },
            { key: 2, value: "kachaRoad", label: "Kacha Road" },
          ],
          value: feData.secondaryRoadType || "",
        },
        {
          label: "Road Widening Proposal",
          type: "select",
          name: "roadWideningProposal",
          options: [
            { key: 1, value: true, label: "True" },
            { key: 2, value: false, label: "False" },
          ],
          value: feData.roadWideningProposal || "",
        },
      ],
    },
    // //Property Identification
    {
      title: "Property Identification",
      fields: [
        {
          label: "Identification of property",
          type: "select",
          name: "identificationOfProperty",
          options: [
            { key: 1, value: "self", label: "Self" },
            { key: 2, value: "helpOfApplicant", label: "Help Of Applicant" },
            { key: 3, value: "nonIdentifiable", label: "Non identifiable" },
            {
              key: 4,
              value: "otherNumbersInStreet",
              label: "Other Numbers in Street",
            },
            { key: 5, value: "localInquiry", label: "Local Inquiry" },
          ],
          value: feData.identificationOfProperty || "",
        },
        {
          label: "Location of property",
          type: "select",
          name: "locationOfProperty",
          options: [
            { key: 1, value: "normal", label: "Normal" },
            { key: 2, value: "parkFacing", label: "Park Facing" },
            { key: 3, value: "corner", label: "Corner" },
            { key: 4, value: "mainRoad", label: "Main Road" },
          ],
          value: feData.locationOfProperty || "",
        },
        {
          label: "Type of locality",
          type: "select",
          name: "typesOfLocality",
          options: [
            { key: 1, value: "residential", label: "Residential" },
            { key: 2, value: "commercial", label: "Commercial" },
            { key: 3, value: "industrial", label: "Industrial" },
            { key: 4, value: "agricultural", label: "Agricultural" },
            { key: 5, value: "institutional", label: "Institutional" },
          ],
          value: feData.typesOfLocality || "",
        },
        {
          label: "Type of area",
          type: "select",
          name: "typesOfArea",
          options: [
            { key: 1, value: "authorized", label: "Authorized" },
            { key: 2, value: "regularized", label: "Regularized" },
            { key: 3, value: "unauthorized", label: "Unauthorized" },
            { key: 4, value: "urbanizedVillage", label: "Urbanized Village" },
          ],
          value: feData.typesOfArea || "",
        },
        {
          label: "Neighbourhood",
          type: "select",
          name: "neighbourhood",
          options: [
            { key: 1, value: "poshArea", label: "Posh Area" },
            { key: 2, value: "middleClassArea", label: "Middle Class Area" },
            { key: 3, value: "jhuggiArea", label: "Juggi Area" },
            { key: 4, value: "villageArea", label: "Village Area" },
          ],
          value: feData.neighbourhood || "",
        },
        {
          label: "Type of property",
          type: "select",
          name: "typesOfProperty",
          options: [
            { key: 1, value: "rowHouse", label: "Row House" },
            { key: 2, value: "builderFloor", label: "Builder Floor" },
            { key: 3, value: "builderFlat", label: "Builder Flat" },
            { key: 4, value: "developerFlat", label: "Developer Flat" },
            { key: 5, value: "authorityFlat", label: "Authority Flat" },
            { key: 6, value: "shop", label: "Shop" },
            { key: 7, value: "office", label: "Office" },
            { key: 8, value: "industry", label: "Industry" },
            { key: 9, value: "warehouse", label: "Warehouse" },
            { key: 10, value: "vacantPlot", label: "Vacant Plot" },
          ],
          value: feData.typesOfProperty || "",
        },
        {
          label: "Current use of property",
          type: "select",
          name: "currentUseOfProperty",
          options: [
            { key: 1, value: "residential", label: "Residential" },
            { key: 2, value: "commercial", label: "Commercial" },
            { key: 3, value: "industrial", label: "Industrial" },
            { key: 4, value: "agricultural", label: "Agricultural" },
            { key: 5, value: "mixedUse", label: "Mixed Use" },
          ],
          value: feData.currentUseOfProperty || "",
        },
        {
          label: "Occupation Status",
          type: "select",
          name: "occupancyStatus",
          options: [
            { key: 1, value: "vacant", label: "Vacant" },
            { key: 2, value: "tenantOccupied", label: "Tenant Occupied" },
            { key: 1, value: "selfOccupied", label: "Self Occupied" },
            { key: 2, value: "sellerOccupied", label: "Seller Occupied" },
          ],
          value: feData.occupancyStatus || "",
        },
        {
          label: "Relation with loan application",
          type: "text",
          name: "relationWithLoanApplicant",
          placeholder: "Enter Relationship with loan application",
          value: feData.relationWithLoanApplicant || "",
        },
      ],
    },

    // // Rented Property Details
    {
      title: "Rented Property Details",
      fields: [
        {
          label: "Tenant Name",
          type: "text",
          name: "nameOfTenant",
          placeholder: "Enter Tenant Name",
          value: feData?.nameOfTenant || "",
        },
        {
          label: "Mobile No.",
          type: "number",
          name: "mobileNo",
          placeholder: "Enter Mobile Number",
          value: feData?.mobileNo || "",
        },
        {
          label: "Year of Tenancy",
          type: "text",
          name: "yearsOfTenancy",
          placeholder: "Enter Year Of Tenancy",
          value: feData?.yearsOfTenancy || "",
        },
        {
          label: "Monthly Rent",
          type: "number",
          name: "monthlyRent",
          placeholder: "Enter Monthly Rent",
          value: feData?.monthlyRent || "",
        },
      ],
    },

    // // Other Construction Info
    {
      title: "Other Construction Info",
      fields: [
        {
          label: "Stage Of Construction",
          type: "select",
          name: "stageOfConstruction",
          options: [
            { key: 1, value: "completed", label: "Completed" },
            { key: 2, value: "underConstruction", label: "Under Construction" },
            { key: 3, value: "underRenovation", label: "Under Renovation" },
          ],
          value: feData.stageOfConstruction || "",
        },
        {
          label: "Year Of Construction",
          type: "text",
          name: "yearOfConstruction",
          placeholder: "Enter Year Of Construction",
          value: feData?.yearOfConstruction || "",
        },
        {
          label: "Area Of Plot Length",
          type: "text",
          name: "length",
          placeholder: "Enter Area Of Plot Length",
          value: feData?.length || "",
        },
        {
          label: "Area Of Plot Width",
          type: "text",
          name: "width",
          placeholder: "Enter Area Of Plot Width",
          value: feData?.width || "",
        },
        {
          label: "No. Of Floors",
          type: "text",
          name: "numberOfFloors",
          placeholder: "Enter No. Of Floors",
          value: feData?.numberOfFloors || "",
        },
        {
          label: "No. Of Basements",
          type: "number",
          name: "numberOfBasements",
          placeholder: "Enter No. Of Basements",
          value: feData?.numberOfBasements || "",
        },
        {
          label: "Height Of Complete Building",
          type: "text",
          name: "heightOfCompleteBuilding",
          placeholder: "Enter Height Of Complete Building",
          value: feData?.heightOfCompleteBuilding || "",
        },
        {
          label: "Use Of Ground Floor",
          type: "select",
          name: "useOfGroundFloor",
          options: [
            { key: 1, value: "partUnit", label: "Part Unit" },
            { key: 2, value: "partStilt", label: "Part Stilt" },
            { key: 3, value: "unit", label: "Unit" },
            { key: 4, value: "stilt", label: "Stilt" },
          ],
          value: feData?.useOfGroundFloor || "",
        },
        {
          label: "Height Of Stilt Floor",
          type: "text",
          name: "heightOfStiltFloor",
          placeholder: "Enter Use Of Stilt Floor",
          value: feData?.heightOfStiltFloor || "",
        },
        {
          label: "Area Of Parking",
          type: "text",
          name: "areaOfParking",
          placeholder: "Enter Area Of Parking",
          value: feData?.areaOfParking || "",
        },
        {
          label: "Number Of Units At Stilt Floor",
          type: "text",
          name: "numberOfUnitsAtStiltFloor",
          placeholder: "Enter Number Of Units",
          value: feData?.numberOfUnitsAtStiltFloor || "",
        },
        {
          label: "Total Units",
          type: "text",
          name: "totalUnits",
          placeholder: "Enter Total Units",
          value: feData?.totalUnits || "",
        },
        {
          label: "Roof Rights",
          type: "select",
          name: "roofRights",
          options: [
            { key: 1, value: true, label: "True" },
            { key: 2, value: false, label: "False" },
          ],
          value: feData?.roofRights || "",
        },
        {
          label: "Demarcation Of Plot",
          type: "select",
          name: "demarcationOfPlot",
          options: [
            { key: 1, value: true, label: "True" },
            { key: 2, value: false, label: "False" },
          ],
          value: feData?.demarcationOfPlot || "",
        },
      ],
    },

    // // Floors Info
    {
      title: "Floors Info",
      fields: floorsInfo || [],
    },
    // // Other Details
    {
      title: "Other Details",
      fields: [
        {
          label: "Value Of Property",
          type: "number",
          name: "valueOfProperty",
          placeholder: "Enter Value of Property",
          value: feData.valueOfProperty || "",
        },
        {
          label: "Remark",
          type: "text",
          name: "remarks",
          placeholder: "Enter Remarks",
          value: feData.remarks || "",
        },
      ],
    },
    // // Images
    {
      title: "Captured Photo",
      fields: feData.images || [],
    },
  ];

  const handleInputOnchange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Updating floors data
      setFieldExecutiveData((prevData) => {
        const updatedDetails = [...prevData.details];
        updatedDetails[index] = { ...updatedDetails[index], [name]: value };

        return { ...prevData, details: updatedDetails };
      });
    } else {
      // Updating basic fields
      setFieldExecutiveData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormUpdateUser = (e) => {
    e.preventDefault();
    console.log("FieldExecutiveData==>", feData);
  };

  useEffect(() => {
    if(fieldExecutiveId){
      dispatch(getCaseDataBySupervisor(accessToken, fieldExecutiveId));
    }
  }, [fieldExecutiveId]);

  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-5">
              Update FE Details
            </h2>
            <form onSubmit={handleFormUpdateUser}>
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"
                >
                  <div className="text-sm">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg text-left -mt-5">
                        {section.title}
                      </p>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 text-sm mt-5">
                        {section.title === "Captured Photo"
                          ? section.fields.map((field, idx) => (
                              <div key={idx}>
                                <img
                                  src={field}
                                  alt={field}
                                  className="h-40 w-full object-cover rounded-md shadow-md mt-2"
                                />
                              </div>
                            ))
                          : section.fields.map((field, idx) => (
                              <div key={idx}>
                                <label htmlFor={field.name}>
                                  {field.label}
                                </label>
                                {field.type === "select" ? (
                                  <select
                                    type={field?.type}
                                    name={field.name}
                                    id={field.name}
                                    value={field?.value}
                                    onChange={handleInputOnchange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  >
                                    {field?.options?.map((option, i) => (
                                      <option key={i} value={option?.value}>
                                        {option?.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={field.value}
                                    placeholder={field.placeholder}
                                    onChange={(e) =>
                                      field.index !== undefined
                                        ? handleInputOnchange(e, field.index)
                                        : handleInputOnchange(e)
                                    }
                                  />
                                )}
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-gray-200 hover:bg-blue-900 focus:z-10"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFieldExecutive;
