const LocationSearch = ({ data = [], name, changeLocation }) => {
  return (
    <div className="p-2 m-2">
      <span>Select {name}</span>
      <br />

      <select
        required
        onChange={(e) => changeLocation(e.target.value)}
        className="border p-2 rounded-md "
      >
        <option value={""}>Select</option>
        {data.map((location, index) => (
          <option key={index} value={location?._id} name>
            {location?.name}
          </option>
        ))}
      </select>
      {data.length === 0 && <p className="text-red-500">No {name} found.</p>}
      {/* {data.length > 10 && <p>Displaying 10 of {data.length} locations.</p>} */}
    </div>
  );
};

export default LocationSearch;
