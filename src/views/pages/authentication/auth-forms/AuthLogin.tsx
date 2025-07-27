// src/views/pages/authentication/auth-forms/AuthLogin.tsx
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Button,
    TextField,
    Grid,
    Alert,
    Box,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { IconEye, IconEyeOff, IconMail, IconLock } from "@tabler/icons-react";

const AuthLogin = () => {
    const theme = useTheme();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading] = useState(false);
    const [error] = useState("");


    return (
        <Box component="form" sx={{ mt: 1 }}>
            <Typography variant="h4" gutterBottom align="center">
                Sign In
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconMail size="1.25rem" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconLock size="1.25rem" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <IconEyeOff /> : <IconEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.5,
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthLogin;