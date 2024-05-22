import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  //reading the filter value from the url
  const [searchParams] = useSearchParams();
  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "price", value: 5000, operation: "gte" };

  //fetching the data from api
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter], //whenever the filter changes the data will be refetched again
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, error, bookings };
}
