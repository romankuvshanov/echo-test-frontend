import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import { Link } from "react-router-dom";
import "./SignupComponent.scss";

export default function SignupComponent() {
  return (
    <BlockContainerComponent>
      <h1>Registration</h1>
      <form className={"signup-form"}>
        <label htmlFor={"name-input"}>Name: </label>
        <input id={"name-input"} type={"text"} required={true} />
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
        <label htmlFor={"profile-picture"}>Profile picture: </label>
        <input id={"profile-picture"} type={"file"} accept={"image/*"} />
        <Link className={"signup-form__first-link"} to={"/"}>
          Authorization
        </Link>
        <button className={"signup-form__submit-button"} type={"submit"}>
          Sign up
        </button>
      </form>
    </BlockContainerComponent>
  );
}
