import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isupdating } = useMutation({
    //mutationfn will accept only one arg so we pass the data and id as a single obj as arg
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("user updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isupdating, updateUser };
}
