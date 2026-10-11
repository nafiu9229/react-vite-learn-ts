import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { type User } from "../services/user-service";

const useProductUser = () => {
  const [productUser, setProductUser] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const { request, cancelC } = userService.getAll<User>();
    request
      .then((res) => {
        console.log(res);
        setProductUser(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      })
      .finally(() => {
        if (!cancelC().signal.aborted) {
          setIsLoading(false);
        }
      });
    return () => cancelC().abort();
  }, []);

  return {productUser, error, isLoading, setProductUser, setIsLoading, setError}
};

export default useProductUser;
