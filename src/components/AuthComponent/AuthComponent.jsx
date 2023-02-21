import "./AuthComponent.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";

export default function AuthComponent() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      let response = await fetch(
        "https://backend-front-test.dev.echo-company.ru/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        }
      );

      let result = await response.json();
      if (response.ok) {
        setError(null);
        console.log(result);
        navigate("/personal", {
          replace: true,
          state: { result: result },
        });
      } else {
        setError(new Error(result?.message));
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <BlockContainerComponent>
      <h1>Authorization</h1>
      {error ? (
        <ErrorComponent error={error}></ErrorComponent>
      ) : (
        <AuthFormContent onSubmit={handleSubmit}></AuthFormContent>
      )}
    </BlockContainerComponent>
  );
}

function AuthFormContent({ onSubmit }) {
  return (
    <form className={"auth-form"} onSubmit={onSubmit}>
      <label htmlFor={"phone-input"}>Phone: </label>
      <input
        id={"phone-input"}
        name={"phone"}
        type={"tel"}
        placeholder={"79999999999"}
        pattern={"7(\\d\\D*){10}"}
        minLength={11}
        maxLength={11}
        title={"Enter the phone in the following format: 7xxxxxxxxxx"}
        required={true}
      />
      <label htmlFor={"password-input"}>Password: </label>
      <input
        id={"password-input"}
        name={"password"}
        type={"password"}
        required={true}
      />
      <div>
        <label htmlFor={"remember-me-input"}>Remember me:</label>
        <input
          className={"auth-form__remember-me-input"}
          id={"remember-me-input"}
          type={"checkbox"}
        />
      </div>
      <Link to={"/reset"}>Forgot your password?</Link>
      <Link to={"/signup"}>Registration</Link>
      <button className={"auth-form__submit-button"} type={"submit"}>
        Sign in
      </button>
    </form>
  );
}
