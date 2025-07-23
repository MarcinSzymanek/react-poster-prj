import classes from "./SignUp.module.css";
import Button from "./core/Button";
import { useRef } from "react";

export function SignUp() {
  const formRef = useRef(null);
  const subButtonRef = useRef(null);

  function handleSignUp(event) {
    event.preventDefault();
    const entries = formRef.current.elements;
    if (entries.email !== entries.repeat_email) {
      console.log("Password must match repeat password field");
      //   return;
    }
    let signUpData = {
      email: entries.email.value,
      username: entries.username.value,
      password: entries.password.value,
    };

    console.log(signUpData);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form ref={formRef} className={classes.form} onSubmit={handleSignUp}>
        <input
          name="email"
          className={classes.textinput}
          type="textbox"
          placeholder="Email"
        ></input>
        <input
          name="username"
          className={classes.textinput}
          type="textbox"
          placeholder="Name"
        ></input>
        <input
          name="password"
          className={classes.textinput}
          type="password"
          placeholder="Password"
        ></input>
        <input
          name="repeat_password"
          className={classes.textinput}
          type="password"
          placeholder="Repeat password"
        ></input>
        <button ref={subButtonRef} type="submit">
          Sign up
        </button>
      </form>
    </>
  );
}
