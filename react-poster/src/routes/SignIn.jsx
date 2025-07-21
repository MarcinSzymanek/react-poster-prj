import classes from "./SignIn.module.css";
import { SignUp } from "../components/SignUp";

export function SignIn() {
  return (
    <div className={classes.container}>
      <SignUp />
      <h1>Login placeholder</h1>
    </div>
  );
}
