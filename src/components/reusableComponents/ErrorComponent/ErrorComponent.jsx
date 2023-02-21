import "./ErrorComponent.scss";

export default function ErrorComponent({ error }) {
  return (
    <>
      <h2 className={"error-headline"}>Something went wrong!</h2>
      <p>Please, reload the page and try again</p>
      <p>{error.message}</p>
    </>
  );
}

ErrorComponent.defaultProps = { errorMessage: new Error() };
