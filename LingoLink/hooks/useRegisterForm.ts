import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AuthService} from "@/src/services/auth.service";

export function useRegisterForm() {
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  const handleRegister = async ({username, email, password, passwordConfirm}: any) => {
    //setLoading(true);
    //setError(null);

    console.log({username, email, password, passwordConfirm});

    try {
      if (password !== passwordConfirm) {
        throw new Error("Passwords do not match");
      }

      const {isPending, error, data, isFetching} = useQuery({queryKey: ['register'], queryFn: AuthService.register});

      if (isPending) return 'Loading...'

      if (error) return 'An error has occurred: ' + error.message
      
      // Simulate an API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("User registered:", {username, email, password});
    } catch (error) {
      //setError(error.message);
    } finally {
      //setLoading(false);
    }
  };

  return {
    //loading,
    //error,
    handleRegister,
  };
}
