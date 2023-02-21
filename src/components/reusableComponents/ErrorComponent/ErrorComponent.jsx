import "./ErrorComponent.scss";

export default function ErrorComponent({ errorMessage }) {
  return (
    <>
      <h2 className={"error-headline"}>Something went wrong!</h2>
      <p>{errorMessage}</p>
    </>
  );
}

ErrorComponent.defaultProps = { errorMessage: "" };
