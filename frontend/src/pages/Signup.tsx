import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const Username = usernameRef.current?.value;
    console.log(Username);
    const Password = passwordRef.current?.value;

    // api req
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: Username,
        password: Password,
      });
      toast.success("Signup successful !");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("somethimg wrong with server!");
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
              Signup
            </h2>
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex w-full items-center justify-center">
              <Button
                onClick={signup}
                variant="primary"
                text="Submit"
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
