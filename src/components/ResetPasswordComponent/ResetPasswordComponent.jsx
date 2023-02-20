import { Link } from "react-router-dom";
import FormContainerComponent from "../reusableComponents/FormContainerComponent/FormContainerComponent";

export default function ResetPasswordComponent() {
  return (
    <FormContainerComponent>
      <h1>Reset password</h1>
      <form className={"auth-form"}>
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
        <Link to={"/"}>Remembered your password?</Link>
        <Link to={"/signup"}>Registration</Link>
        <button className={"auth-form__submit-button"} type={"submit"}>
          Войти
        </button>
      </form>
    </FormContainerComponent>
  );
}
