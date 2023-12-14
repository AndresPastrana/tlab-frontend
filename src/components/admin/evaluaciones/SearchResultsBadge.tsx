// Total items , search results
const SearchResultsBadge = ({
  total,
  results,
}: {
  total: number;
  results: number;
}) => {
  const noSerachResult = results >= 1;
  if (!noSerachResult) {
    return (
      <p className="flex justify-between w-[300px] py-1 px-4  bg-gray-100 text-gray-500  rounded-2xl items-center">
        <p>Mostrando todos los resultados:</p>
        <span className="text-gray-700 font-medium badge">{total}</span>
      </p>
    );
  }

  return (
    <p className=" flex justify-between w-[300px] py-1 px-4  bg-gray-100 text-gray-500  rounded-2xl items-center">
      Resultados filtrados:{" "}
      <span className="text-gray-700 font-medium badge">{results}</span>
    </p>
  );
};

export default SearchResultsBadge;
