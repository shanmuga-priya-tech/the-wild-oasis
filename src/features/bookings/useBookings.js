import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { numResultsPerPage } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

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

  //PRE-FETCHING the next page or prev page data inorder to avoid loading data
  const pageCount = Math.ceil(count / numResultsPerPage);

  //prefetching the next page data
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], //whenever the filter or sortBy changes the data will be refetched again
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], //whenever the filter or sortBy changes the data will be refetched again
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
