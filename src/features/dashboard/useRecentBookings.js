import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  //we get the stored no.of.days to filter value from the url
  const [searchParams] = useSearchParams();

  //if there is no filter value in the url then default is 7
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  //since api accept a date and not no.of.days we calculate the date based in the no.of.days from the url
  //subDays(currentdate,no.of.days need to subtract form currentDate)
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { isLoading, bookings };
}
