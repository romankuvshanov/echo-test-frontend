import { Link } from "react-router-dom";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import "./ResetPasswordComponent.scss";
import { useState } from "react";
// TODO: Две формы

export default function ResetPasswordComponent() {
  const [hasError, setHasError] = useState(false);
  const [firstStepDone, setFirstStepDone] = useState(false);
  const [phone, setPhone] = useState("");
  const [smsPassword, setSmsPassword] = useState("");
  const [password, setPassword] = useState("");
  async function handleForgotStart(event) {
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

    if (response.ok) {
      setHasError(false);
      setFirstStepDone(true);
      let result = await response.json();
      console.log(result);
    } else {
      setHasError(true);
    }
  }

  async function handleForgotEnd(event) {
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

    if (response.ok) {
      setHasError(false);
      let result = await response.json();
      console.log(result);
    } else {
      setHasError(true);
    }
  }

  return (
    <BlockContainerComponent>
      <h1>Reset password</h1>
      <form className={"reset-password-form"}>
        <label htmlFor={"phone-input"}>Enter your phone first: </label>
        <input
          id={"phone-input"}
          type={"tel"}
          placeholder={"79999999999"}
          pattern={"7(\\d\\D*){10}"}
          maxLength={11}
          title={"Enter the phone in the following format: 7xxxxxxxxxx"}
          required={true}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className={"reset-password-form__submit-button"}
          onClick={handleForgotStart}
        >
          Reset
        </button>
        {firstStepDone && <p>Код подтверждения отправлен на телефон</p>}
        <label htmlFor={"sms-password-input"}>One-time SMS password: </label>
        <input
          id={"sms-password-input"}
          type={"text"}
          value={smsPassword}
          onChange={(e) => setSmsPassword(e.target.value)}
          required={true}
        />
        <label htmlFor={"new-password-input"}>New password: </label>
        <input
          id={"new-password-input"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button
          className={"reset-password-form__submit-button"}
          onClick={handleForgotEnd}
          type={"button"}
        >
          Confirm
        </button>
        <Link className={"reset-password-form__first-link"} to={"/"}>
          Remembered your password?
        </Link>
        <Link to={"/signup"}>Registration</Link>
      </form>
    </BlockContainerComponent>
  );

  function ResetPasswordStartFormContent() {
    return (
      <>
        <label htmlFor={"phone-input"}>Enter your phone first: </label>
        <input
          id={"phone-input"}
          type={"tel"}
          placeholder={"79999999999"}
          pattern={"7(\\d\\D*){10}"}
          maxLength={11}
          title={"Enter the phone in the following format: 7xxxxxxxxxx"}
          required={true}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className={"reset-password-form__submit-button"}
          onClick={handleForgotStart}
          type={"submit"}
        >
          Reset
        </button>
      </>
    );
  }

  function ResetPasswordEndFormContent() {
    return (
      <>
        {firstStepDone && <p>Код подтверждения отправлен на телефон</p>}
        <label htmlFor={"sms-password-input"}>One-time SMS password: </label>
        <input
          id={"sms-password-input"}
          type={"text"}
          value={smsPassword}
          onChange={(e) => setSmsPassword(e.target.value)}
          required={true}
        />
        <label htmlFor={"new-password-input"}>New password: </label>
        <input
          id={"new-password-input"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button
          className={"reset-password-form__submit-button"}
          onClick={handleForgotEnd}
          type={"submit"}
        >
          Confirm
        </button>
      </>
    );
  }
}
