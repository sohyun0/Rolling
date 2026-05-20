import { useNavigate } from "react-router";
import createRecipient from "../../../service/Post/createRecipient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const usePostSubmit = (createPostData, resetName) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => createRecipient(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
      navigate(`/post/${result.id}`, { replace: true });
    },
    onError: (error) => {
      console.error("Post 요청 실패:", error);
    },
    onSettled: () => {
      resetName(); // 입력값 초기화
    },
  });

  const handleSubmit = async (validateFn) => {
    if (!validateFn()) return;
    await mutation.mutateAsync(createPostData);
  };

  return { handleSubmit, isSubmitting: mutation.isPending };
};

export default usePostSubmit;
