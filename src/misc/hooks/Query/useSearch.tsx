import { FC } from "react";
import { useQuery } from "react-query";
import { searchUserApi } from "misc/api";

export const useSearch = (
  text: string | null,
  onSucess: (data: any) => void,
  options?: { enabled?: boolean; retry?: boolean }
) => {
  const query = useQuery(
    ["search_query", { text }],
    async ({ queryKey }) => {
      const { text } = queryKey[1] as { text: string };
      if (text) {
        const response = await searchUserApi(text);
        return response;
      }
    },
    {
      retry: options.retry || false,
      enabled: options?.enabled || false,
      onSuccess: onSucess,
    }
  );

  return query;
};
