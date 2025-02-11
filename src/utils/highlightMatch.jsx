export const highlightMatch = (text = "", query = "") => {
  console.log("text==>", text);
  console.log("query==>", query);
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text
    .toString()
    .split(regex)
    .map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
};
