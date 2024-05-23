import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingDetail() {
  //getting the booking id parameter from the URL
  const { bookingId } = useParams();

  const {
    isLoading,
    data: bookingDetail,
    error,
  } = useQuery({
    queryKey: ["bookingdetail"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, error, bookingDetail };
}
