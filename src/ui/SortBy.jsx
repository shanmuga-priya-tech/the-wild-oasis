import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  //setting a sort state in url
  const [searchParams, setSearchParams] = useSearchParams();
  //we get the sorted value to stay in the same query even when page refresh
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={sortBy}
      type="white"
    />
  );
}

export default SortBy;
