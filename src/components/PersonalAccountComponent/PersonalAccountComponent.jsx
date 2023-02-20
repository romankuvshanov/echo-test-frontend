import { Link } from "react-router-dom";
import FormContainerComponent from "../reusableComponents/FormContainerComponent/FormContainerComponent";

export default function PersonalAccountComponent({ name }) {
  return (
    <div>
      <FormContainerComponent>
        <h1>Hello, {name}!</h1>
        <button>Exit</button>
      </FormContainerComponent>
    </div>
  );
}

PersonalAccountComponent.defaultProps = { name: "Name" };
