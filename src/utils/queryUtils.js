import { useQuery, useMutation, useQueryClient } from "react-query";
import { errorNotify, successNotify } from "./notification";

function useQueryTable(queryKey, apiFunc, renderFunc, params) {
  return useQuery([queryKey, params], () => apiFunc(params), {
    onSuccess: (response) => {
      renderFunc(response);
    },
    keepPreviousData: true,
  });
}

function useUpdateTable(queryKey, apiFunc, afterFunc) {
  const queryClient = useQueryClient();
  return useMutation((updates) => apiFunc(updates), {
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      successNotify("Cập nhật thành công");
      if (afterFunc) {
        afterFunc();
      }
    },
    onError: (error) => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey);
      }
      errorNotify("Cập nhật thất bại");
    },
  });
}

export { useQueryTable, useUpdateTable };
