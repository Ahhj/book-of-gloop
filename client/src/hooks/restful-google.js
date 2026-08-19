import { useGoogleOAuth } from "../react-google-oauth";
import { useGet, useMutate } from "restful-react";

function useGoogleAuthHeader() {
  const { getToken } = useGoogleOAuth();
  const getAuthHeader = async () => {
    const token = await getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  return { getAuthHeader };
}

export function useGetWithGoogleAuth({ base, path, requestOptions, ...rest }) {
  const { getAuthHeader } = useGoogleAuthHeader();
  return useGet({
    base,
    path,
    requestOptions: async () => {
      const header = await getAuthHeader();
      return { ...requestOptions, ...header };
    },
    ...rest,
  });
}

export function useMutateWithGoogleAuth({ base, path, verb }) {
  const { getAuthHeader } = useGoogleAuthHeader();
  const { mutate, loading } = useMutate({ base, path, verb });
  const googleMutate = async (body, requestOptions) => {
    const header = await getAuthHeader();
    const requestOptionsWithHeader = { ...requestOptions, ...header };
    return mutate(body, requestOptionsWithHeader);
  };
  return { mutate: googleMutate, loading };
}
