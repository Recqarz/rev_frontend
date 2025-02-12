
const LocationSearch = ({ data = ["abc", "def"], name, changeLocation }) => {
  return (
    <div>
      <span>{name}</span>
      <br />

      <select onChange={(e) => changeLocation(e.target.value)}>
        <option value={""}>Select</option>
        {data.map((location, index) => (
          <option key={index} value={location?._id}>
            {location?.name}
          </option>
        ))}
      </select>
      {data.length === 0 && <p className="text-red-500">No locations found.</p>}
      {data.length > 10 && <p>Displaying 10 of {data.length} locations.</p>}
    </div>
  );
};

export default LocationSearch;
