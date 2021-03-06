import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { OwnerContext } from "./context/Context";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [secondPassword, setSecondPassword] = useState(null);

  const { setOwner } = useContext(OwnerContext);

  const history = useHistory();

//Sign up form
//store some owner data to the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("/api/owner/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          secondPassword: secondPassword,
        }),
      });
      const json = await data.json();
      setSignUpMessage(json.message);
      console.log("json", json);
      if (json.status === 201) {
        console.log("json.data", json.data);
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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSecondPassword = (e) => {
    setSecondPassword(e.target.value);
  };

  return (
    <Wrapper>
      <SignupForm onSubmit={(e) => handleSubmit(e)}>
        <p>Sign Up</p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => handleUsername(e)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => handleEmail(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e)}
          minlength="6"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => handleSecondPassword(e)}
          minlength="6"
          required
        />
        <button type="submit">Submit</button>
        <SignUpInfo>
          Already a member? <Link to="/login">Login here.</Link>
        </SignUpInfo>
        <SignUpMessage>{signUpMessage}</SignUpMessage>
      </SignupForm>
    </Wrapper>
  );
};
export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 60px 20px;

`;

const SignupForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
  width: 500px;
  height: 50vh;
  gap: 10px;
  p {
    font-size: 1.3rem;
  }
  input {
    width: 250px;
    height: 40px;
    outline: none;
  }
  button {
    padding: 10px 10px;
    font-size: 1.6em;
    width: 250px;
    border: none;
    color: white;
    cursor: pointer;
    font-family: monospace;
    background-color: var(--color-secondary);
    border: 2px solid #e1f3f3;
    transition: background-color 2s ease-out;
  }
  a {
    color: var(--color-tertiary);
    text-decoration: none;
  }
  a:hover {
    color: pink;
  }
`;

const SignUpInfo = styled.div`
  font-size: 14px;
`;

const SignUpMessage = styled.div`
  font-weight: bold;
  color: red;
`;
