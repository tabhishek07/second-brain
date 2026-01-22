import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import toast, { Toaster } from "react-hot-toast";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const Username = usernameRef.current?.value;
    const Password = passwordRef.current?.value;

    // api logic
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        username: Username,
        password: Password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong !");
      }
    }
  }
  return (
    <div>
      <Toaster />
      <div className="min-h-screen w-full relative">
        {/* Radial Gradient Background from Bottom */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
          }}
        />
        {/* Your Content/Components */}
        <div className="flex items-center justify-center w-screen h-screen relative z-40">
          <div className="flex flex-col p-4 gap-2 border border-slate-200 rounded-md transition duration-200 ease-in-out hover:-translate-x-px hover:shadow-lg">
            <h2 className="font-semibold flex items-center justify-center">
              Signin
            </h2>
            <Input placeholder="Username" reference={usernameRef} />
            <Input placeholder="Password" reference={passwordRef} />
            <div className="flex w-full items-center justify-center">
              <Button
                onClick={signin}
                variant="primary"
                text="Submit"
                fullWidth={true}
              />
            </div>
            <div>
              <p className="text-sm text-slate-500 flex items-center justify-center">
                Already have an account?{" "}
                <span
                  className="text-purple-600 cursor-pointer hover:underline ml-1"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
