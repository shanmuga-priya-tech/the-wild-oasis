import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //as soon as looged in the user data will be available in cache in that case we dont need to refetch it again,
      //we only need to refetch the data whenever the page reloads so we are setting the same query in the useUser hook which is used to refetch the user data whenever page loads here to avoid refetching when logged in
      queryClient.setQueriesData(["user"], user);

      toast.success("user logged in successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLogging };
}

export default useLogin;
