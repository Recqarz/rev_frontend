const LocationSearch = ({ data = [], name, changeLocation }) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        Select {name}
      </label>

      <select
        name
        id={name}
        required
        onChange={(e) => changeLocation(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
      >
        <option value={""}>Select {name}</option>
        {data.map((location, index) => (
          <option key={index + 1} value={location?._id}>
            {location?.name}
          </option>
        ))}
      </select>
      {data.length === 0 && (
        <p className="text-red-500 text-sm">No {name} found.</p>
      )}
      {/* {data.length > 10 && <p>Displaying 10 of {data.length} locations.</p>} */}
    </div>
  );
};

export default LocationSearch;
