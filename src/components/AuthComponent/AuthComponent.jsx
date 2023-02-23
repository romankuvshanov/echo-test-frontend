import "./AuthComponent.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { useDispatch } from "react-redux";
import { update } from "../../features/token/tokenSlice";
import { BACKEND_BASE_URL } from "../../common/constants";
import MaskedPhoneInput from "../reusableComponents/MaskedPhoneInput/MaskedPhoneInput";

export default function AuthComponent() {
  const [errors, setErrors] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitButtonDisabled(true);

    try {
      const formData = new FormData(event.target);
      let response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.get("phone").replace(/\D/g, ""),
          password: formData.get("password"),
        }),
      });

      let result = await response.json();
      if (response.ok) {
        if (formData.get("remember-me-input"))
          localStorage.setItem("token", result?.token);
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
      <h1>Authorization</h1>
      {errors.length ? (
        <ErrorComponent errors={errors}></ErrorComponent>
      ) : (
        <AuthFormContent
          onSubmit={handleSubmit}
          submitButtonDisabled={submitButtonDisabled}
        ></AuthFormContent>
      )}
    </BlockContainerComponent>
  );
}

function AuthFormContent({ onSubmit, submitButtonDisabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(
    localStorage.getItem("auth-form_phone") || ""
  );

  return (
    <form className={"auth-form"} onSubmit={onSubmit}>
      <label htmlFor={"phone-input"}>Phone: </label>
      <MaskedPhoneInput
        id={"phone-input"}
        name={"phone"}
        required={true}
        autoFocus={true}
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          localStorage.setItem("auth-form_phone", e.target.value);
        }}
      ></MaskedPhoneInput>
      <label htmlFor={"password-input"}>Password: </label>
      <input
        id={"password-input"}
        name={"password"}
        type={showPassword ? "text" : "password"}
        required={true}
      />
      <label className={"auth-form__show-password-label"}>
        Show password:
        <input
          type={"checkbox"}
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      <button
        className={"auth-form__submit-button"}
        type={"submit"}
        disabled={submitButtonDisabled}
      >
        Sign in
      </button>
      <div className={"auth-form__remember-me-container"}>
        <label htmlFor={"remember-me-input"}>Remember me:</label>
        <input
          className={"auth-form__remember-me-input"}
          id={"remember-me-input"}
          name={"remember-me-input"}
          type={"checkbox"}
        />
      </div>
      <Link to={"/reset"}>Forgot your password?</Link>
      <Link to={"/signup"}>Registration</Link>
    </form>
  );
}
