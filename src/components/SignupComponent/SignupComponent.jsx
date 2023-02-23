import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../features/token/tokenSlice";
import { BACKEND_BASE_URL } from "../../common/constants";
import "./SignupComponent.scss";
import MaskedPhoneInput from "../reusableComponents/MaskedPhoneInput/MaskedPhoneInput";

export default function SignupComponent() {
  const [errors, setErrors] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitButtonDisabled(true);

    try {
      const formData = new FormData(event.target);
      console.log(JSON.stringify(Object.fromEntries(formData)));
      let response = await fetch(`${BACKEND_BASE_URL}/api/user/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.get("phone").replace(/\D/g, ""),
          password: formData.get("password"),
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
        }),
      });

      let result = await response.json();
      if (response.ok) {
        dispatch(update(result?.token));
        navigate("/personal", { replace: true });
      } else {
        let tempErrorsArray = [...errors, new Error(result?.message)];
        if (result?.errors)
          result?.errors.forEach(
            (error) =>
              (tempErrorsArray = [...tempErrorsArray, new Error(error?.msg)])
          );
        setErrors(tempErrorsArray);
      }
    } catch (error) {
      setErrors([...errors, error]);
    }
  }

  return (
    <BlockContainerComponent>
      <h1>Registration</h1>
      {errors.length ? (
        <ErrorComponent errors={errors}></ErrorComponent>
      ) : (
        <SignupFormContent
          onSubmit={handleSubmit}
          submitButtonDisabled={submitButtonDisabled}
        ></SignupFormContent>
      )}
    </BlockContainerComponent>
  );
}

function SignupFormContent({ onSubmit, submitButtonDisabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("signup-form_first-name") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("signup-form_last-name") || ""
  );
  const [phone, setPhone] = useState(
    localStorage.getItem("signup-form_phone") || ""
  );

  return (
    <form className={"signup-form"} onSubmit={onSubmit}>
      <label htmlFor={"first_name-input"}>First name: </label>
      <input
        id={"first_name-input"}
        name={"first_name"}
        type={"text"}
        required={true}
        autoFocus={true}
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          localStorage.setItem("signup-form_first-name", e.target.value);
        }}
      />
      <label htmlFor={"last_name-input"}>Last name: </label>
      <input
        id={"last_name-input"}
        name={"last_name"}
        type={"text"}
        required={true}
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          localStorage.setItem("signup-form_last-name", e.target.value);
        }}
      />
      <label htmlFor={"phone-input"}>Phone: </label>
      <MaskedPhoneInput
        id={"phone-input"}
        name={"phone"}
        required={true}
        autoFocus={true}
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          localStorage.setItem("signup-form_phone", e.target.value);
        }}
      ></MaskedPhoneInput>
      <label htmlFor={"password-input"}>Password: </label>
      <input
        id={"password-input"}
        name={"password"}
        type={showPassword ? "text" : "password"}
        required={true}
      />
      <label className={"show-password-label"}>
        Show password:
        <input
          type={"checkbox"}
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      <label htmlFor={"profile-picture"}>Profile picture: </label>
      <input id={"profile-picture"} type={"file"} accept={"image/*"} />
      <button
        className={"signup-form__submit-button"}
        type={"submit"}
        disabled={submitButtonDisabled}
      >
        Sign up
      </button>
      <Link className={"signup-form__first-link"} to={"/"}>
        Authorization
      </Link>
    </form>
  );
}
