import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../features/token/tokenSlice";
import "./SignupComponent.scss";

export default function SignupComponent() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      console.log(JSON.stringify(Object.fromEntries(formData)));
      let response = await fetch(
        "https://backend-front-test.dev.echo-company.ru/api/user/registration",
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
        dispatch(update(result?.token));
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
      <h1>Registration</h1>
      {error ? (
        <ErrorComponent error={error}></ErrorComponent>
      ) : (
        <SignupFormContent onSubmit={handleSubmit}></SignupFormContent>
      )}
    </BlockContainerComponent>
  );
}

function SignupFormContent({ onSubmit }) {
  return (
    <form className={"signup-form"} onSubmit={onSubmit}>
      <label htmlFor={"first_name-input"}>First name: </label>
      <input
        id={"first_name-input"}
        name={"first_name"}
        type={"text"}
        required={true}
      />
      <label htmlFor={"last_name-input"}>Last name: </label>
      <input
        id={"last_name-input"}
        name={"last_name"}
        type={"text"}
        required={true}
      />
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
      <label htmlFor={"profile-picture"}>Profile picture: </label>
      <input id={"profile-picture"} type={"file"} accept={"image/*"} />
      <Link className={"signup-form__first-link"} to={"/"}>
        Authorization
      </Link>
      <button className={"signup-form__submit-button"} type={"submit"}>
        Sign up
      </button>
    </form>
  );
}
