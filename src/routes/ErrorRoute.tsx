import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function ErrorPage() {
	const navigate = useNavigate()
  useEffect(() => {
	const refreshError = setTimeout(()=>{
    // if(!isLoading && !isAuthenticated) window.location.href = "/"
    // else{

      navigate('/', {replace:true})
    // }
	}, 1000)

	return ()=>clearTimeout(refreshError)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <p style={{ fontWeight: "bold", fontSize: "30px" }}>404 Page Not Found</p>
    </Box>
  );
}
