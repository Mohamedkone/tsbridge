import { useTheme } from "@mui/material/styles";
import {
	Button,
	Grid,
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
	const { loginWithRedirect } = useAuth0();
	const theme = useTheme();
	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: "/",
			},
		});
	};

	return (
		<Grid container direction="column" justifyContent="center" spacing={2}>
			<Grid item xs={12}>
					<Button
						disableElevation
						fullWidth
						onClick={handleLogin}
						size="large"
						variant="outlined"
						sx={{
								color: "grey.700",
								backgroundColor: theme.palette.primary.light[50],
								borderColor: "#000000"
						}	}
					>
						Login
					</Button>
			</Grid>
		</Grid>
	);
};

export default AuthLogin;
