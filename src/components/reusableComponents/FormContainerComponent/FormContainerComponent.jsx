import "./FormContainerComponent.scss";

export default function FormContainerComponent({ children }) {
  return <form className={"form"}>{children}</form>;
}
