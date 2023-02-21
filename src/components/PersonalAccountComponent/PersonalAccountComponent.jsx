import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";

export default function PersonalAccountComponent({ name }) {
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Name");
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);

  useEffect(() => {
    try {
      if (state) {
        fetch("https://backend-front-test.dev.echo-company.ru/api/user", {
          method: "GET",
          headers: {
            Authorization: state?.result?.token,
          },
        })
          .then((response) => {
            if (response.ok) return response.json();
            else {
              response.json().then((result) => {
                setError(new Error(result?.message));
                return result;
              });
            }
          })
          .then((result) => {
            console.log("RES" + result);
            console.log(`${result?.first_name} ${result?.last_name}`);
            setUserName(`${result?.first_name} ${result?.last_name}`);
            setError(null);
          })
          .catch((error) => {
            setError(error);
          });
      }
    } catch (error) {
      setError(error);
    }
  }, [state]);

  function handleClick() {
    navigate("/", { replace: true });
  }

  return (
    <div>
      <BlockContainerComponent>
        {error ? (
          <ErrorComponent error={error}></ErrorComponent>
        ) : (
          <h1>Hello, {userName}!</h1>
        )}
        <button onClick={handleClick}>Exit</button>
      </BlockContainerComponent>
    </div>
  );
}

PersonalAccountComponent.defaultProps = { name: "Name" };
