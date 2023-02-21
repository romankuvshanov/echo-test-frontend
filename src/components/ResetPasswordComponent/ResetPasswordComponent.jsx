import { Link } from "react-router-dom";
import { useState } from "react";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import "./ResetPasswordComponent.scss";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";

export default function ResetPasswordComponent() {
  const [error, setError] = useState(null);
  const [firstStepDoneSuccessfully, setFirstStepDoneSuccessfully] =
    useState(false);
  const [secondStepDoneSuccessfully, setSecondStepDoneSuccessfully] =
    useState(false);
  const [phone, setPhone] = useState("");
  const [smsPassword, setSmsPassword] = useState("");
  const [password, setPassword] = useState("");
  async function handleForgotStart(event) {
    event.preventDefault();

    try {
      let response = await fetch(
        "https://backend-front-test.dev.echo-company.ru/api/user/forgot-start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: phone }),
        }
      );

      let result = await response.json();
      if (response.ok) {
        setError(null);
        setFirstStepDoneSuccessfully(true);
        console.log(result);
      } else {
        setError(new Error(result?.message));
      }
    } catch (error) {
      setError(error);
    }
  }

  async function handleForgotEnd(event) {
    event.preventDefault();

    try {
      let response = await fetch(
        "https://backend-front-test.dev.echo-company.ru/api/user/forgot-end",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone,
            code: smsPassword,
            password: password,
          }),
        }
      );

      let result = await response.json();
      if (response.ok) {
        setError(null);
        setSecondStepDoneSuccessfully(true);
        console.log(result);
      } else {
        setError(new Error(result?.message));
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <BlockContainerComponent>
      <h1>Reset password</h1>

      {/*TODO: Сделать чище и понятнее*/}
      {error ? (
        <ErrorComponent error={error}></ErrorComponent>
      ) : firstStepDoneSuccessfully ? (
        secondStepDoneSuccessfully ? (
          <p>Password changed successfully</p>
        ) : (
          <ResetPasswordEndFormContent
            smsPassword={smsPassword}
            onSmsPasswordInputChange={(e) => setSmsPassword(e.target.value)}
            password={password}
            onPasswordInputChange={(e) => setPassword(e.target.value)}
            handleForgotEnd={handleForgotEnd}
          />
        )
      ) : (
        <ResetPasswordStartFormContent
          phone={phone}
          onPhoneInputChange={(e) => setPhone(e.target.value)}
          handleForgotStart={handleForgotStart}
        />
      )}
    </BlockContainerComponent>
  );
}

function ResetPasswordStartFormContent({
  phone,
  onPhoneInputChange,
  handleForgotStart,
}) {
  return (
    <form
      className={"reset-password-form"}
      onSubmit={(e) => handleForgotStart(e)}
    >
      <label htmlFor={"phone-input"}>Enter your phone first: </label>
      <input
        id={"phone-input"}
        type={"tel"}
        placeholder={"79999999999"}
        pattern={"7(\\d\\D*){10}"}
        minLength={11}
        maxLength={11}
        title={"Enter the phone in the following format: 7xxxxxxxxxx"}
        required={true}
        value={phone}
        onChange={onPhoneInputChange}
      />
      <button className={"reset-password-form__submit-button"} type={"submit"}>
        Send SMS with one-time password
      </button>
      <FormLinks></FormLinks>
    </form>
  );
}

function ResetPasswordEndFormContent({
  smsPassword,
  onSmsPasswordInputChange,
  password,
  onPasswordInputChange,
  handleForgotEnd,
}) {
  return (
    <form
      className={"reset-password-form"}
      onSubmit={(e) => handleForgotEnd(e)}
    >
      <p>Код подтверждения отправлен на телефон</p>
      <label htmlFor={"sms-password-input"}>One-time SMS password: </label>
      <input
        id={"sms-password-input"}
        type={"text"}
        value={smsPassword}
        onChange={onSmsPasswordInputChange}
        required={true}
      />
      <label htmlFor={"new-password-input"}>New password: </label>
      <input
        id={"new-password-input"}
        type={"password"}
        value={password}
        onChange={onPasswordInputChange}
        required={true}
      />
      <button className={"reset-password-form__submit-button"} type={"submit"}>
        Confirm
      </button>
      <FormLinks></FormLinks>
    </form>
  );
}

function FormLinks() {
  return (
    <>
      <Link className={"reset-password-form__first-link"} to={"/"}>
        Remembered your password?
      </Link>
      <Link to={"/signup"}>Registration</Link>
    </>
  );
}
