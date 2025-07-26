/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const CallbacksDrop = () => {
  const navigate = useNavigate();
  const {myInfo} = useContext(AuthContext)

  useEffect(() => {
    if(myInfo?.id){
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const errorDescription = params.get("error_description");
    console.log(code)
    console.log(error)

    if (error) {
      console.error("Error during OAuth:", error, errorDescription);
      // Stay on the callback page and display error for debugging if necessary
      return;
    }

    if (code) {
      console.log("Authorization code received:", code);
      exchangeCodeForTokens(code, myInfo?.id);
    } else {
      console.warn("No code or error found in the callback URL.");
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myInfo]);

  const exchangeCodeForTokens = async (code:any ,userId:any) => {
    try {
      const redirectUri = "http://localhost:3000/callbacksdrop";
  
      // console.log(userId,code)
      // Send the authorization code to the backend
      await axios.post("http://localhost:3001/dp-api-storages", {
        userId: userId,
        code: code,
        redirectUri:redirectUri,
      });
  
      // Optionally redirect to another page after successful backend processing
      navigate("/account?tab=2");
    } catch (error) {
      console.error("Error sending code to backend:", error);
      navigate("/account?tab=2");
    }
  };
  return (
    <div className="page-layout">
      <Typography variant="h1">Processing login...</Typography>
    </div>
  );
};

export default CallbacksDrop;
