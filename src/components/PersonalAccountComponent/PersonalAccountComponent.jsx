import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { clear, selectToken } from "../../features/token/tokenSlice";

export default function PersonalAccountComponent({ name }) {
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { state } = useLocation();

  console.log(token);

  useEffect(() => {
    try {
      if (token) {
        fetch("https://backend-front-test.dev.echo-company.ru/api/user", {
          method: "GET",
          headers: {
            Authorization: token,
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
  }, [token]);

  function handleClickExit() {
    dispatch(clear());
    navigate("/", { replace: true });
  }

  return (
    <div>
      <BlockContainerComponent>
        {error ? (
          <ErrorComponent error={error}></ErrorComponent>
        ) : (
          <>
            <h1>Hello, {userName}!</h1>
            {token && <p>{token}</p>}
          </>
        )}
        <button onClick={handleClickExit}>Log out</button>
      </BlockContainerComponent>
    </div>
  );
}

PersonalAccountComponent.defaultProps = { name: "Name" };
