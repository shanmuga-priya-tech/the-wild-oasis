import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1)LOAD THE AUTHENTICATED USER
  const { isLoading, isAuthenticated } = useUser();

  //2)IF NO AUTHENTICATED USER REDIRECT TO LOGIN PAGE
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3)SHOW SPINNER WHILE LOADING
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  //4)IF THERE IS USER,Render a app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
