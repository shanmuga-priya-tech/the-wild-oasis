import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function FilterSortingCabin() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asec", label: "Sort By name(A-Z)" },
          { value: "name-dsec", label: "Sort By name(Z-A)" },
          { value: "regularPrice-asec", label: "Sort By price (low to high)" },
          { value: "regularPrice-desc", label: "Sort By price (high to low)" },
          { value: "maxCapacity-asec", label: "Sort By maxCapacity(lowFirst)" },
          {
            value: "maxCapacity-dsec",
            label: "Sort By maxCapacity(highFirst)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default FilterSortingCabin;
