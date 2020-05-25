import { useAuth0 } from "../react-auth0-spa";
import { useGet, useMutate } from "restful-react";

function useAuth0Header() {
  const { getTokenSilently } = useAuth0();
  const getAuth0Header = () =>
    getTokenSilently().then((token) => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
  return { getAuth0Header };
}

export function useGetWithAuth0({ base, path, requestOptions, ...rest }) {
  const { getAuth0Header } = useAuth0Header();
  return useGet({
    base,
    path,
    requestOptions: () =>
      getAuth0Header().then((header) => ({ ...requestOptions, ...header })),
    ...rest,
  });
}

export function useMutateWithAuth0({ base, path, verb }) {
  const { getAuth0Header } = useAuth0Header();
  const { mutate, loading } = useMutate({ base, path, verb });
  const auth0Mutate = (body, requestOptions) =>
    getAuth0Header()
      .then((header) => ({ ...requestOptions, ...header }))
      .then((requestOptionsWithHeader) =>
        mutate(body, requestOptionsWithHeader)
      );
  return { mutate: auth0Mutate, loading };
}
