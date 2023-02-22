import "./ErrorComponent.scss";

export default function ErrorComponent({ errors }) {
  console.log(errors);
  return (
    <>
      <h2 className={"error-headline"}>Something went wrong!</h2>
      <p className={"error-reload-message"}>
        Please, reload the page and try again
      </p>
      <p className={"error-errors-list-headline"}>List of errors:</p>
      {errors.map((error, index) => {
        return (
          <p className={"error-error-message"} key={index}>
            {error?.message}
          </p>
        );
      })}
    </>
  );
}

ErrorComponent.defaultProps = { errors: [new Error()] };
