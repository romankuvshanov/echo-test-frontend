import BlockContainerComponent from "../reusableComponents/BlockContainerComponent/BlockContainerComponent";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PersonalAccountComponent({ name }) {
  const [hasError, setHasError] = useState(false);
  const { state } = useLocation();
  console.log(state);
  let userName = "False";

  useEffect(() => {
    userName = getUserNameByToken(state?.result?.token);
  }, [state]);

  return (
    <div>
      <BlockContainerComponent>
        <h1>Hello, {userName}!</h1>
        <button>Exit</button>
      </BlockContainerComponent>
    </div>
  );
}

function getUserNameByToken(token) {
  fetch("https://backend-front-test.dev.echo-company.ru/api/user", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((result) => {
      console.log("RES" + result);
      console.log(`${result?.first_name} ${result?.last_name}`);
      return `${result?.first_name} ${result?.last_name}`;
    });
}

// async function getUserNameByToken(token) {
//   let response = await fetch(
//     "https://backend-front-test.dev.echo-company.ru/api/user",
//     {
//       method: "GET",
//       headers: {
//         Authorization: token,
//       },
//     }
//   );
//   if (response.ok) {
//     let result = await response.json();
//     console.log(result);
//     console.log(`${result?.first_name} ${result?.last_name}`);
//     return `${result?.first_name} ${result?.last_name}`;
//   } else {
//   }
// }

PersonalAccountComponent.defaultProps = { name: "Name" };
