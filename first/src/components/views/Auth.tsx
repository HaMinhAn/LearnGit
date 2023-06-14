import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";

const Auth = (authRoute: any) => {
  return (
    <>
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </>
  );
};

export default Auth;
