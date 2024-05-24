import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("user logged out successfully");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoggingOut };
}

export default useLogout;
