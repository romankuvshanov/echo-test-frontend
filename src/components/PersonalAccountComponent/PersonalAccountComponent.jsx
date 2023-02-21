import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";

export default function PersonalAccountComponent({ name }) {
  return (
    <div>
      <BlockContainerComponent>
        <h1>Hello, {name}!</h1>
        <button>Exit</button>
      </BlockContainerComponent>
    </div>
  );
}

PersonalAccountComponent.defaultProps = { name: "Name" };
