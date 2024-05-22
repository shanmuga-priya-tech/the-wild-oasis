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

  //2)SORTING
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  //3)PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //fetching the data from api
  const {
    isLoading,
    data: { data: bookings, count } = {}, //to prevent undefined error we used empty{}
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //whenever the filter or sortBy changes the data will be refetched again
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { isLoading, error, bookings, count };
}
