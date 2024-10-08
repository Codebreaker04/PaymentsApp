import { Heading } from "../components/Heading.jsx";
import { Description } from "../components/Description.jsx";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import { BottomLogin } from "../components/BottomLogin.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Warning } from "../components/Warning.jsx";
import { DarkThemeButton } from "../components/DarkThemeButton.jsx";

export function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  function handleWarningClose() {
    setOpen(false);
  }

  async function handleSignup() {
    setOpen(true);
    try {
      const response = await axios.post(
        "https://pay-pro-api.vercel.app/api/v1/user/signup",
        {
          username,
          password,
          firstName,
          lastName,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.msg);
    }
  }

  return (
    <div>
      <div className=" h-screen bg-slate-300 dark:bg-neutral-800 dark:text-white">
        <Navbar comp={<DarkThemeButton />} />
        <div className="relative">
          {error && open && (
            <Warning label={error} handleClose={handleWarningClose} />
          )}
        </div>
        <div className=" flex flex-col justify-center items-center">
          <div className="rounded-lg w-80 h-max text-center p-2 px-4 mt-10 bg-white dark:bg-neutral-700">
            <Heading label="Sign Up" />
            <Description info="Enter your information to create an account" />
            <InputField
              label="First Name"
              placeholder="john"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              placeholder="delvo"
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              label="Email"
              placeholder="xyz@gmail.com"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <Button
                label="Sign Up"
                onClick={handleSignup}
                skeleton="Signing Up...."
              />
              <BottomLogin
                label="Already have an account?"
                buttonText="Sign in"
                to="/signin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
