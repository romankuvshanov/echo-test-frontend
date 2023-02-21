import { Link } from "react-router-dom";
import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import "./ResetPasswordComponent.scss";

export default function ResetPasswordComponent() {
  return (
    <BlockContainerComponent>
      <h1>Reset password</h1>
      <form className={"reset-password-form"}>
        <label htmlFor={"phone-input"}>Phone: </label>
        <input
          id={"phone-input"}
          type={"tel"}
          placeholder={"79999999999"}
          pattern={"7(\\d\\D*){10}"}
          title={"Enter the phone in the following format: 7xxxxxxxxxx"}
          required={true}
        />
        <label htmlFor={"password-input"}>One-time SMS password: </label>
        <input id={"password-input"} type={"text"} required={true} />
        <Link className={"reset-password-form__first-link"} to={"/"}>
          Remembered your password?
        </Link>
        <Link to={"/signup"}>Registration</Link>
        <button
          className={"reset-password-form__submit-button"}
          type={"submit"}
        >
          Reset
        </button>
      </form>
    </BlockContainerComponent>
  );
}
