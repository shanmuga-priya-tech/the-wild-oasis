import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("user logged in successfully");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLogging };
}

export default useLogin;
