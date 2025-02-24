import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  getCaseDataBySupervisor,
  updateCaseDataBySupervisor,
} from "../../redux/supervisor/supervisorAction";

const UpdateFieldExecutive = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("fieldExecutiveId");

  const { accessToken } = useSelector((store) => store?.authReducer);
  const fieldExecutiveDataById = useSelector(
    (store) => store?.supervisorReducer
  );
  const caseAllData =
    fieldExecutiveDataById?.data?.individualCompareData?.PropertyDetails;

  const propertyId = caseAllData?._id;

  const [feData, setFeData] = useState({
    bankName: "",
    applicantName: "",
    mobileNo: "",
    personMetAtSite: "",
    personMetAtSiteMobileNo: "",
    electricityMeterNo: "",
    street: "",
    plotNo: "",
    landmark: "",
    pinCode: "",
    zone: "",
    city: "",
    state: "",
    sewerageConnection: "",
    roadWidth: "",
    primaryRoadType: "",
    secondaryRoadType: "",
    roadWideningProposal: "",
    identificationOfProperty: "",
    locationOfProperty: "",
    typesOfLocality: "",
    typesOfArea: "",
    neighbourhood: "",
    typesOfProperty: "",
    currentUseOfProperty: "",
    occupancyStatus: "",
    relationWithLoanApplicant: "",
    nameOfTenant: "",
    mobileNo: "",
    yearsOfTenancy: "",
    monthlyRent: "",
    stageOfConstruction: "",
    yearOfConstruction: "",
    length: "",
    width: "",
    numberOfFloors: "",
    numberOfBasements: "",
    heightOfCompleteBuilding: "",
    useOfGroundFloor: "",
    heightOfStiltFloor: "",
    areaOfParking: "",
    numberOfUnitsAtStiltFloor: "",
    totalUnits: "",
    roofRights: "",
    demarcationOfPlot: "",
    floorName: "",
    accommodation: "",
    builtupArea: "",
    projectionArea: "",
    valueOfProperty: "",
    remarks: "",
    images: [],
  });

  useEffect(() => {
    if (caseAllData) {
      setFeData({
        bankName: caseAllData?.bankName,
        applicantName: caseAllData?.applicantName,
        mobileNo: caseAllData?.mobileNo,
        personMetAtSite: caseAllData?.personMetAtSite,
        personMetAtSiteMobileNo: caseAllData?.personMetAtSiteMobileNo,
        electricityMeterNo: caseAllData?.electricityMeterNo,
        street: caseAllData?.propertyAddress?.street,
        plotNo: caseAllData?.propertyAddress?.plotNo,
        landmark: caseAllData?.propertyAddress?.landmark,
        pinCode: caseAllData?.propertyAddress?.pinCode,
        zone: caseAllData?.propertyAddress?.zone,
        city: caseAllData?.propertyAddress?.city,
        state: caseAllData?.propertyAddress?.state,
        sewerageConnection: caseAllData?.sewerageConnection,
        roadWidth: caseAllData?.roadPropertySubject?.roadWidth,
        primaryRoadType: caseAllData?.roadPropertySubject?.primaryRoadType,
        secondaryRoadType: caseAllData?.roadPropertySubject?.secondaryRoadType,
        roadWideningProposal:
          caseAllData?.roadPropertySubject?.roadWideningProposal,
        identificationOfProperty: caseAllData?.identificationOfProperty,
        locationOfProperty: caseAllData?.locationOfProperty,
        typesOfLocality: caseAllData?.typesOfLocality,
        typesOfArea: caseAllData?.typesOfArea,
        neighbourhood: caseAllData?.neighbourhood,
        typesOfProperty: caseAllData?.typesOfProperty,
        currentUseOfProperty: caseAllData?.currentUseOfProperty,
        occupancyStatus: caseAllData?.occupancyStatus,
        relationWithLoanApplicant: caseAllData?.relationWithLoanApplicant,
        nameOfTenant: caseAllData?.detailsOfRentedProperty?.nameOfTenant,
        mobileNo: caseAllData?.detailsOfRentedProperty.mobileNo,
        yearsOfTenancy: caseAllData?.detailsOfRentedProperty?.yearsOfTenancy,
        monthlyRent: caseAllData?.detailsOfRentedProperty?.monthlyRent,
        stageOfConstruction: caseAllData?.stageOfConstruction,
        yearOfConstruction: caseAllData?.yearOfConstruction,
        length: caseAllData?.areaOfPlot?.length,
        width: caseAllData?.areaOfPlot?.width,
        numberOfFloors: caseAllData?.structureOfBuilding?.numberOfFloors,
        numberOfBasements: caseAllData?.structureOfBuilding?.numberOfBasements,
        heightOfCompleteBuilding:
          caseAllData?.structureOfBuilding?.heightOfCompleteBuilding,
        useOfGroundFloor: caseAllData?.groundFloorDetails?.useOfGroundFloor,
        heightOfStiltFloor: caseAllData?.groundFloorDetails?.heightOfStiltFloor,
        areaOfParking: caseAllData?.groundFloorDetails?.areaOfParking,
        numberOfUnitsAtStiltFloor:
          caseAllData?.dwellingUnits?.numberOfUnitsAtStiltFloor,
        totalUnits: caseAllData?.dwellingUnits?.totalUnits,
        roofRights: caseAllData?.structureOfBuilding?.roofRights,
        demarcationOfPlot: caseAllData?.demarcationOfPlot,
        details:
          caseAllData?.details?.map((item) => ({
            floorName: item?.floorName || "",
            accommodation: item?.accommodation || "",
            builtupArea: item?.builtupArea || "",
            projectionArea: item?.projectionArea || "",
          })) || [],
        valueOfProperty: caseAllData?.valueOfProperty,
        remarks: caseAllData?.remarks,
        images: caseAllData?.images,
      });
    }
  }, [caseAllData]);

  useEffect(() => {
    if (id) {
      dispatch(getCaseDataBySupervisor(accessToken, id));
    }
  }, [dispatch, accessToken, id]);

  const floorsInfo = feData?.details?.length
    ? feData.details.flatMap((floor, index) => [
        {
          label: `Floor ${index + 1} Name`,
          type: "text",
          name: "floorName",
          value: floor.floorName || "",
          index,
        },
        {
          label: `Floor ${index + 1} Accommodation`,
          type: "text",
          name: "accommodation",
          value: floor.accommodation || "",
          index,
        },
        {
          label: `Floor ${index + 1} Builtup Area`,
          type: "text",
          name: "builtupArea",
          value: floor.builtupArea || "",
          index,
        },
        {
          label: `Floor ${index + 1} Projection Area`,
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
          value: feData?.bankName || "",
        },
        {
          label: "Applicant Name",
          type: "text",
          name: "applicantName",
          placeholder: "Enter Applicant Name",
          value: feData?.applicantName || "",
        },
        {
          label: "Mobile Number",
          type: "number",
          name: "mobileNo",
          placeholder: "Enter Mobile Number",
          value: feData?.mobileNo || "",
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
          value: feData?.personMetAtSite || "",
        },
        {
          label: "Person Met Mobile No",
          type: "number",
          name: "personMetAtSiteMobileNo",
          placeholder: "Enter Person Mobile Number",
          value: feData?.personMetAtSiteMobileNo || "",
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
          value: feData?.electricityMeterNo || "",
        },
        {
          label: "Street",
          type: "text",
          name: "street",
          placeholder: "Enter Street",
          value: feData?.street || "",
        },
        {
          label: "Plot",
          type: "text",
          name: "plotNo",
          placeholder: "Enter Plot",
          value: feData?.plotNo || "",
        },
        {
          label: "Landmark",
          type: "text",
          name: "landmark",
          placeholder: "Enter Landmark",
          value: feData?.landmark || "",
        },
        {
          label: "Pin Code",
          type: "number",
          name: "pinCode",
          placeholder: "Enter Pin Code",
          value: feData?.pinCode || "",
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
          value: feData?.zone,
        },
        {
          label: "City",
          type: "text",
          name: "city",
          placeholder: "Enter City",
          value: feData?.city || "",
        },
        {
          label: "State",
          type: "text",
          name: "state",
          placeholder: "Enter State",
          value: feData?.state || "",
        },
        {
          label: "Sewerage Connection",
          type: "select",
          name: "sewerageConnection",
          options: [
            { key: 1, value: true, label: "True" },
            { key: 2, value: false, label: "False" },
          ],
          value: feData?.sewerageConnection || "",
        },
      ],
    },
    // // Road Details
    {
      title: "Road Details",
      fields: [
        {
          label: "Road Width(Meters)",
          type: "text",
          name: "roadWidth",
          placeholder: "Enter Road Width",
          value: feData?.roadWidth || "",
        },
        {
          label: "Primary road type",
          type: "select",
          name: "primaryRoadType",
          options: [
            { key: 1, value: "mainRoad", label: "Main Road" },
            { key: 2, value: "innerRoad", label: "Inner Road" },
          ],
          value: feData?.primaryRoadType || "",
        },
        {
          label: "Secondary road type",
          type: "select",
          name: "secondaryRoadType",
          options: [
            { key: 1, value: "pakkaRoad", label: "Pakka Road" },
            { key: 2, value: "kachaRoad", label: "Kacha Road" },
          ],
          value: feData?.secondaryRoadType || "",
        },
        {
          label: "Road Widening Proposal",
          type: "select",
          name: "roadWideningProposal",
          options: [
            { key: 1, value: true, label: "Yes" },
            { key: 2, value: false, label: "No" },
          ],
          value: feData?.roadWideningProposal || "",
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
          value: feData?.identificationOfProperty || "",
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
          value: feData?.locationOfProperty || "",
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
          value: feData?.typesOfLocality || "",
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
          value: feData?.typesOfArea || "",
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
          value: feData?.neighbourhood || "",
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
          value: feData?.typesOfProperty || "",
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
          value: feData?.currentUseOfProperty || "",
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
          value: feData?.occupancyStatus || "",
        },
        {
          label: "Relation with loan application",
          type: "text",
          name: "relationWithLoanApplicant",
          placeholder: "Enter Relationship with loan application",
          value: feData?.relationWithLoanApplicant || "",
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
          type: "text",
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
          type: "number",
          name: "yearOfConstruction",
          placeholder: "Enter Year Of Construction",
          value: feData?.yearOfConstruction || "",
        },
        {
          label: "Area Of Plot Length",
          type: "number",
          name: "length",
          placeholder: "Enter Area Of Plot Length",
          value: feData?.length || "",
        },
        {
          label: "Area Of Plot Width",
          type: "number",
          name: "width",
          placeholder: "Enter Area Of Plot Width",
          value: feData?.width || "",
        },
        {
          label: "No. Of Floors",
          type: "number",
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
          type: "number",
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
          type: "number",
          name: "heightOfStiltFloor",
          placeholder: "Enter Use Of Stilt Floor",
          value: feData?.heightOfStiltFloor || "",
        },
        {
          label: "Area Of Parking",
          type: "number",
          name: "areaOfParking",
          placeholder: "Enter Area Of Parking",
          value: feData?.areaOfParking || "",
        },
        {
          label: "Number Of Units At Stilt Floor",
          type: "number",
          name: "numberOfUnitsAtStiltFloor",
          placeholder: "Enter Number Of Units",
          value: feData?.numberOfUnitsAtStiltFloor || "",
        },
        {
          label: "Total Units",
          type: "number",
          name: "totalUnits",
          placeholder: "Enter Total Units",
          value: feData?.totalUnits || "",
        },
        {
          label: "Roof Rights",
          type: "select",
          name: "roofRights",
          options: [
            { key: 1, value: true, label: "Yes" },
            { key: 2, value: false, label: "No" },
          ],
          value: feData?.roofRights || "",
        },
        {
          label: "Demarcation Of Plot",
          type: "select",
          name: "demarcationOfPlot",
          options: [
            { key: 1, value: true, label: "Yes" },
            { key: 2, value: false, label: "No" },
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
          value: feData?.valueOfProperty || "",
        },
        {
          label: "Remark",
          type: "text",
          name: "remarks",
          placeholder: "Enter Remarks",
          value: feData?.remarks || "",
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
      setFeData((prevData) => {
        const updatedDetails = [...prevData.details];
        updatedDetails[index] = { ...updatedDetails[index], [name]: value };

        return { ...prevData, details: updatedDetails };
      });
    } else {
      // Updating basic fields
      setFeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormUpdateUser = (e) => {
    e.preventDefault();

    const formattedData = {
      bankName: feData.bankName,
      applicantName: feData.applicantName,
      mobileNo: feData.mobileNo,
      personMetAtSite: feData.personMetAtSite,
      personMetAtSiteMobileNo: feData.personMetAtSiteMobileNo,
      electricityMeterNo: feData.electricityMeterNo,
      propertyAddress: {
        street: feData.street,
        plotNo: feData.plotNo,
        landmark: feData.landmark,
        pinCode: feData.pinCode,
        zone: feData.zone,
        city: feData.city,
        state: feData.state,
      },
      sewerageConnection: feData.sewerageConnection,
      roadPropertySubject: {
        roadWidth: feData.roadWidth,
        primaryRoadType: feData.primaryRoadType,
        secondaryRoadType: feData.secondaryRoadType,
        roadWideningProposal: feData.roadWideningProposal,
      },
      identificationOfProperty: feData.identificationOfProperty,
      locationOfProperty: feData.locationOfProperty,
      typesOfLocality: feData.typesOfLocality,
      typesOfArea: feData.typesOfArea,
      neighbourhood: feData.neighbourhood,
      typesOfProperty: feData.typesOfProperty,
      currentUseOfProperty: feData.currentUseOfProperty,
      occupancyStatus: feData.occupancyStatus,
      relationWithLoanApplicant: feData.relationWithLoanApplicant,
      detailsOfRentedProperty: {
        nameOfTenant: feData.nameOfTenant,
        mobileNo: feData.mobileNo,
        yearsOfTenancy: feData.yearsOfTenancy,
        monthlyRent: feData.monthlyRent,
      },
      stageOfConstruction: feData.stageOfConstruction,
      yearOfConstruction: feData.yearOfConstruction,
      areaOfPlot: {
        length: feData.length,
        width: feData.width,
      },
      structureOfBuilding: {
        numberOfFloors: feData.numberOfFloors,
        numberOfBasements: feData.numberOfBasements,
        heightOfCompleteBuilding: feData.heightOfCompleteBuilding,
        roofRights: feData.roofRights,
      },
      groundFloorDetails: {
        useOfGroundFloor: feData.useOfGroundFloor,
        heightOfStiltFloor: feData.heightOfStiltFloor,
        areaOfParking: feData.areaOfParking,
      },
      dwellingUnits: {
        numberOfUnitsAtStiltFloor: feData.numberOfUnitsAtStiltFloor,
        totalUnits: feData.totalUnits,
      },
      demarcationOfPlot: feData.demarcationOfPlot,
      details: feData.details || [],
      valueOfProperty: feData.valueOfProperty,
      remarks: feData.remarks,
      images: feData.images || [],
    };
console.log(formattedData, "formattedData")
    const formData = new FormData();

    Object.keys(formattedData).forEach((key) => {
      if (
        typeof formattedData[key] === "object" &&
        formattedData[key] !== null
      ) {
        formData.append(key, JSON.stringify(formattedData[key]));
      } else {
        formData.append(key, formattedData[key]);
      }
    });

    // Append images correctly
    if (feData.images && feData.images.length > 0) {
      feData.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image); // Use "images" to match your backend
        }
      });
    }

    dispatch(updateCaseDataBySupervisor(accessToken, propertyId, formData))
      .then(() => {
        dispatch(getCaseDataBySupervisor(accessToken, id));
      })
      .catch((error) => {
        console.error("Error updating case:", error);
      });
  };

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
