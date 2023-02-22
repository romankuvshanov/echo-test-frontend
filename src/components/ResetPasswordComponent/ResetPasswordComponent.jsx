import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import "./ResetPasswordComponent.scss";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { useDispatch } from "react-redux";
import { clear } from "../../features/token/tokenSlice";

export default function ResetPasswordComponent() {
  const [errors, setErrors] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [firstStepDoneSuccessfully, setFirstStepDoneSuccessfully] =
    useState(false);
  const [secondStepDoneSuccessfully, setSecondStepDoneSuccessfully] =
    useState(false);

  const [phone, setPhone] = useState("");
  const [smsPassword, setSmsPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
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
        setFirstStepDoneSuccessfully(true);
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

  async function handleForgotEnd(event) {
    event.preventDefault();
    setSubmitButtonDisabled(true);

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
        setSecondStepDoneSuccessfully(true);
        dispatch(clear());
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
      <h1>Reset password</h1>

      {errors.length ? (
        <ErrorComponent errors={errors}></ErrorComponent>
      ) : secondStepDoneSuccessfully ? (
        <>
          <p className={"password-changed"}>Password changed successfully</p>
          <Link to={"/"}>Login</Link>
        </>
      ) : (
        <>
          <ResetPasswordStartFormContent
            phone={phone}
            onPhoneInputChange={(e) => setPhone(e.target.value)}
            handleForgotStart={handleForgotStart}
          />

          {firstStepDoneSuccessfully && (
            <ResetPasswordEndFormContent
              smsPassword={smsPassword}
              onSmsPasswordInputChange={(e) => setSmsPassword(e.target.value)}
              password={password}
              onPasswordInputChange={(e) => setPassword(e.target.value)}
              handleForgotEnd={handleForgotEnd}
              submitButtonDisabled={submitButtonDisabled}
            />
          )}
        </>
      )}
    </BlockContainerComponent>
  );
}

function ResetPasswordStartFormContent({
  phone,
  onPhoneInputChange,
  handleForgotStart,
}) {
  const [sendSmsButtonDisabled, setSendSmsButtonDisabled] = useState(false);
  const [sendSmsButtonText, setSendSmsButtonText] = useState(
    "Send SMS with one-time password"
  );
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSendSmsButtonText(
          `You can send another sms after ${secondsLeft - 1} seconds`
        );
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setSendSmsButtonDisabled(false);
      setSendSmsButtonText("Send SMS with one-time password");
    }
  }, [secondsLeft]);

  return (
    <form
      className={"reset-password-form"}
      onSubmit={(e) => {
        setSendSmsButtonDisabled(true);
        setSecondsLeft(20);
        setSendSmsButtonText(`You can send another sms after 20 seconds`);
        handleForgotStart(e);
      }}
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
        autoFocus={true}
      />
      <button
        className={"reset-password-form__submit-button"}
        type={"submit"}
        disabled={sendSmsButtonDisabled}
      >
        {sendSmsButtonText}
      </button>
    </form>
  );
}

function ResetPasswordEndFormContent({
  smsPassword,
  onSmsPasswordInputChange,
  password,
  onPasswordInputChange,
  handleForgotEnd,
  submitButtonDisabled,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      className={"reset-password-form"}
      onSubmit={(e) => handleForgotEnd(e)}
    >
      <p className={"reset-password-form__password-sent-message"}>
        The one-time sms password has been sent to your phone
      </p>
      <label htmlFor={"sms-password-input"}>One-time SMS password: </label>
      <input
        id={"sms-password-input"}
        type={"text"}
        value={smsPassword}
        onChange={onSmsPasswordInputChange}
        required={true}
        autoFocus={true}
      />
      <label htmlFor={"new-password-input"}>New password: </label>
      <input
        id={"new-password-input"}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={onPasswordInputChange}
        required={true}
      />
      <label className={"show-password-label"}>
        Show password:
        <input
          type={"checkbox"}
          value={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      <button
        className={"reset-password-form__submit-button"}
        type={"submit"}
        disabled={submitButtonDisabled}
      >
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
