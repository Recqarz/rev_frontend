import React from "react";

const CompareDisplay = () => {
  const coData1 = [
    { key: "Client Name:", value: "AAAA" },
    { key: "Bank Name:", value: "AAAA" },
    { key: "Bank Ref No:", value: "AAAAA" },
    { key: "Bank Report No:", value: "AAAAA" },
    { key: "Visit Date:", value: "02/22/25(MM/DD/YYYY)" },
    { key: "Client Address 1:", value: "Address1" },
    { key: "Client Address 2:", value: "Address2" },
    { key: "Client Contact No:", value: "8908" },
    { key: "Client Plot No:", value: "1DFLL" },
    { key: "Client Street Name:", value: "Street 1" },
    { key: "Client Land Mark:", value: "Land Mark 1" },
    { key: "State:", value: "Delhi" },
    { key: "District:", value: "ABCDEF" },
    { key: "Zone:", value: "East" },
    { key: "Pincode:", value: "13231" },
    { key: "Client Geo Location:", value: "Delhi Sector 22" },
  ];

  const data1 = [
    {
      name: "Basic Info",
      data: [
        { key: "Applicant Info:", value: "AAAA" },
        { key: "Applicant Mobile No:", value: "8908" },
        { key: "Bank Name:", value: "HDFC" },
      ],
    },

    {
      name: "Person Meet",
      data: [
        { key: "Person Meet At Site:", value: "AAAAA" },
        { key: "Person Meet Mobile No:", value: "8908" },
      ],
    },
    {
      name: "Property Details",
      data: [
        { key: "Electricity Meter No.:", value: "1232" },
        { key: "Street:", value: "Street 1" },
        { key: "Plot:", value: "Plot 1" },
        { key: "Land Mark:", value: "land Mark 1" },
        { key: "Pin code:", value: "761010" },
        { key: "Zone:", value: "Zone 1" },
        { key: "State:", value: "State 1" },
        { key: "City:", value: "City 1" },
        { key: "Sewarage Connection:", value: "Yes/No" },
      ],
    },
    {
      name: "Road Details",
      data: [
        { key: "Road width (Metres):", value: "20,000" },
        { key: "Primary Road Type:", value: "Primary 1" },
        { key: "Secondary Road Type:", value: "Secondary 1" },
        { key: "Road Widening Proposal:", value: "Yes/No" },
        { key: "Pin code:", value: "761010" },
        { key: "Zone:", value: "Zone 1" },
        { key: "State:", value: "State 1" },
        { key: "City:", value: "City 1" },
        { key: "Sewarage Connection:", value: "Yes/No" },
      ],
    },
    {
      name: "Property Identification",
      data: [
        { key: "Identification of property:", value: "AAAAA" },
        { key: "Location of property:", value: "Location 1" },
        { key: "Type of locality:", value: "Locality 1" },
        { key: "Type of area:", value: "AAAAA" },
        { key: "Neighbour area:", value: "AAAA" },
        { key: "Type of property:", value: "AAAAA" },
        { key: "Current use of property:", value: "AAAAA 1" },
        { key: "Occupancy status:", value: "AAAA" },
        { key: "Relation with loan applicant:", value: "Self/xyz" },
      ],
    },
    {
      name: "Rent Property Details",
      data: [
        { key: "Tenant Name:", value: "AAAAA" },
        { key: "Tenant Mobile No.:", value: "8908" },
        { key: "year of tenancy:", value: "12" },
        { key: "Monthly rent:", value: "12,000" },
      ],
    },
    {
      name: "Other Construction Info",
      data: [
        { key: "stage of construction:", value: "AAAAA" },
        { key: "Year of construction:", value: "10 years" },
        { key: "Area of plot length:", value: "12123" },
        { key: "Area of plot width:", value: "AAAAA" },
        { key: "No. of floors:", value: "10" },
        { key: "No of basements:", value: "22" },
        { key: "Height of complete building:", value: "22000000" },
        { key: "Use of ground Floor:", value: "AAAA" },
        { key: "Height of stilt Floor:", value: "1222" },
        { key: "Area of parking:", value: "23" },
        { key: "No. of units at stilt:", value: "43" },
        { key: "No. of units per floor:", value: "43" },
        { key: "TotalUnits:", value: "55" },
        { key: "Right roof:", value: "Yes/No" },
        { key: "Demacration of plot:", value: "Yes/No" },
      ],
    },
    {
      name: "FloorsInfo",
      data: [
        {
          floorName: "floor1",
          data: [
            { key: "Floor Name1:", value: "34" },
            { key: "Accomodation:", value: "Yes/No" },
            { key: "Builtup area:", value: "AAA" },
            { key: "Projection Area:", value: "AAA" },
          ],
        },
        {
          floorName: "floor2",
          data: [
            { key: "Floor Name2:", value: "341" },
            { key: "Accomodation:", value: "Yes/No" },
            { key: "Builtup area:", value: "AAAs" },
            { key: "Projection Area:", value: "AAAD" },
          ],
        },
      ],
    },
    {
      name: "Other Details",
      data: [
        { key: "Value of property:", value: "3,500,000,000" },
        { key: "Remark.:", value: "Good/Bad" },
      ],
    },
    {
      name: "CapturePhotos",
      data: [
        { key: "Image1:", value: "" },
        { key: "Image2:", value: "" },
        { key: "Image3:", value: "" },
        { key: "Image4:", value: "" },
        { key: "Image5:", value: "" },
      ],
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
                {coData1?.map((item, index) => (
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
              {data1?.map((item, i) => (
                <React.Fragment key={i + 1}>
                  {item?.name === "FloorsInfo" ? (
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
                                  {ele?.floorName}
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
                        {item?.data?.map((data, index) => (
                          <div
                            key={index + 1}
                            className=" w-full flex flex-col justify-center items-center gap-2"
                          >
                            <div className="border rounded-md shadow-md shadow-slate-400 h-44 w-44 ">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/45/WilderBuildingSummerSolstice.jpg"
                                alt=""
                                className="h-full w-full"
                              />
                            </div>
                            <div className="text-center">
                              <h1>{data?.key}</h1>
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
