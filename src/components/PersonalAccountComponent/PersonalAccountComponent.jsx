import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorComponent from "../reusableComponents/ErrorComponent/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { clear, selectToken } from "../../features/token/tokenSlice";

export default function PersonalAccountComponent() {
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("Name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

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
                let tempErrorsArray = (errors) => [
                  ...errors,
                  new Error(result?.message),
                ];
                if (result?.errors)
                  result?.errors.forEach(
                    (error) =>
                      (tempErrorsArray = [
                        ...tempErrorsArray,
                        new Error(error?.msg),
                      ])
                  );
                setErrors(tempErrorsArray);
                return result;
              });
            }
          })
          .then((result) => {
            setUserName(`${result?.first_name} ${result?.last_name}`);
          })
          .catch((error) => {
            setErrors((errors) => [...errors, error]);
          });
      }
    } catch (error) {
      setErrors((errors) => [...errors, error]);
    }
  }, [token]);

  function handleClickExit() {
    dispatch(clear());
    navigate("/", { replace: true });
  }

  return (
    <div>
      <BlockContainerComponent>
        {errors.length ? (
          <ErrorComponent errors={errors}></ErrorComponent>
        ) : (
          <h1>Hello, {userName}!</h1>
        )}
        <button onClick={handleClickExit}>Log out</button>
      </BlockContainerComponent>
    </div>
  );
}
