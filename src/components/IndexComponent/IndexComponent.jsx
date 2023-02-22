import { useSelector } from "react-redux";
import { selectToken } from "../../features/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IndexComponent() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/personal", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [navigate, token]);

  return <></>;
}
