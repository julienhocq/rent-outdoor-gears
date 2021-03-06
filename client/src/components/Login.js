import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { OwnerContext } from "./context/Context";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  //for authentication purposes
  const { setOwner } = useContext(OwnerContext);

  const history = useHistory();

  //when owner submits login info, we make a fetch request to authenticate info
  //we get back authentication and set their username in state/context
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("/api/owner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await data.json();
      setLoginMessage(json.message);

      if (json.status === 201) {
        console.log("json.data", json.data.image);
        setOwner([json.data.username, json.data._id, json.data.image]);
        history.push("/");
      }
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <LoginContainer>
          <p>Log In</p>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleEmail(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handlePassword(e)}
            required
          />
          <button type="submit">Submit</button>
          <SignUpInfo>
            Not a member? <Link to="/sign-up">Sign up here.</Link>
          </SignUpInfo>
          <LoginMessage>{loginMessage}</LoginMessage>
        </LoginContainer>
      </Form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  padding: 20px;
  input {
    width: 250px;
    height: 40px;
    outline: none;
  }
  button {
    border: none;
  color: white;
  width: 250px;

  cursor: pointer;
  font-family: monospace;
  background-color: var(--color-secondary);
  border: 2px solid #e1f3f3;
  padding: 0.25em 0.5em;
  transition: background-color 2s ease-out;
  }

  p {
    font-size: 1.3rem;
  }
  a {
    color: var(--color-tertiary);
    text-decoration: none;
  }
  a:hover {
    color: pink;
  }
`;

const LoginContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
  width: 500px;
  height: 35vh;
  gap: 10px;

  button {
    margin: 20px;
    padding: 10px 20px;
    font-size: 1.4em;
    border: none;
    color: white;
    cursor: pointer;
    font-family: monospace;
    background-color: var(--color-secondary);
    border: 2px solid #e1f3f3;
    padding: 0.25em 0.5em;
    transition: background-color 2s ease-out;

    &:hover {
      background-color: var(--color-tertiary);
    }
  }
`;

const SignUpInfo = styled.div`
  font-size: 14px;
`;

const LoginMessage = styled.div`
  font-weight: 600;
  color: red;
`;
