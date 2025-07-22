import useForm from "@/hooks/useForm";
import type { SignupFormValues } from "./types";
import SignupForm from "./SignupForm";
import { signup } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { getRedirect, makeURL } from "@/utils/url";
import CredentialsLayout from "@/layouts/CredentialsLayout";

function Signup() {
  const navigate = useNavigate();
  const redirect = getRedirect();
  const { values, setError, addError } = useForm<SignupFormValues>("signup", {
    email: "",
    password: "",
  });

  const handleGoogle = () => {
    // fill later
  };

  const handleSubmit = async () => {
    const response = await signup(values.email, values.password);
    if (response !== "success") {
      switch (response.code) {
        case "MISSING_FIELDS":
          setError({
            description: "username or password was not present",
            actionText: "Try again",
          });
          break;
        case "USER_EXISTS":
          setError({
            description: "Please try again or try to log in",
            actionText: "Try again",
          });
          break;
        case "SUPABASE_ERROR":
          setError({
            description: "An error on our side has occured",
            actionText: "Try again",
          });
          break;
      }
      return;
    }

    const url = makeURL({
      baseUrl: "/verify",
      queryParams: {
        redirect,
      },
    });

    navigate(url);
  };

  return (
    <CredentialsLayout>
      <SignupForm handleSubmit={handleSubmit} handleGoogle={handleGoogle} />
    </CredentialsLayout>
  );
}

export default Signup;
