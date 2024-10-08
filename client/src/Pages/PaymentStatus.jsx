import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading.jsx";
import { Button } from "../components/Button.jsx";
import { useNavigation } from "react-router-dom";
import axios from "axios";

export function PaymentStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("paymentStatus");

  function handleLogOut() {
    axios
      .get("https://pay-pro-api.vercel.app/api/v1/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"))
      .catch(() => {
        navigate("/");
      });
  }

  return (
    <div className=" h-screen bg-slate-300 dark:bg-neutral-700 flex justify-center dark:text-white">
      <div className=" flex flex-col justify-center">
        <div className="rounded-lg w-90 h-max text-center p-2 px-4 bg-white dark:bg-neutral-600">
          <div>
            <Heading label={`Payment ${status}`} />
            <div className="flex justify-between mt-20">
              <div className="w-40 ">
                <Button label="Log out" onClick={handleLogOut} />
              </div>
              <div className="w-40">
                <Button
                  label="Go back"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
