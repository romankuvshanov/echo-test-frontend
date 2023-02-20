import { Link } from "react-router-dom";
import FormContainerComponent from "../reusableComponents/FormContainerComponent/FormContainerComponent";
import "./AuthComponent.scss";

export default function AuthComponent() {
  return (
    <FormContainerComponent>
      <h1>Authorization</h1>
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
        <label htmlFor={"password-input"}>Password: </label>
        <input id={"password-input"} type={"password"} required={true} />
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
          Войти
        </button>
      </form>
    </FormContainerComponent>
  );
}
