import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  //importing custom hook
  const { isLoading, cabins } = useCabins();

  //getting the filtered state from the url
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //if there is a  filtered option else set it to all
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabin;

  if (filteredValue === "all") filteredCabin = cabins;
  if (filteredValue === "no-discount") {
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filteredValue === "with-discount") {
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {" "}
        {/* we are specifying role as table to tell the browser that this html ele
      should be table but we used div to create this styled component */}
        <Table.Header>
          {/* we are specifying role as row to tell the browser that this html ele
        should be table but we used header to create this styled component */}
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* Render prop pattern */}
        <Table.Body
          //data={cabins}
          data={filteredCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
