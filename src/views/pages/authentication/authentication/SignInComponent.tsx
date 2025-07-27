import { useState } from 'react';
import {
  Typography,
  Button,
  Divider,
  TextField,
  Container,
  Box,
//   Grid,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useSignIn } from '@clerk/clerk-react';
import { useTheme } from '@mui/material/styles';
import type { ClerkError } from '../../../../types';
import Logo from "../../../../assets/images/logo.svg";
import { FacebookIcon, GitHubIcon, GoogleIcon, MicrosoftIcon } from '../../../../assets/socialIcons';

// Define the OAuth strategies as string literals to match Clerk's expected values
type OAuthStrategy = 'oauth_google' | 'oauth_facebook' | 'oauth_microsoft' | 'oauth_github';


interface SignInComponentProps {
  isMobile: boolean;
  onSwitchToSignUp: () => void;
}

function SignInComponent({ isMobile, onSwitchToSignUp }: SignInComponentProps) {
  const theme = useTheme();
  const { isLoaded, signIn, setActive } = useSignIn();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);


  const socialStyle = {
    py: 1.5,
    borderColor: theme.palette.grey[300],
    color: theme.palette.grey[700],
    textTransform: 'none',
    borderRadius: 2,
    width: '80px'
  }
  // Handle email/password sign in form submission
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoaded) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        // Sign in was successful
        await setActive({ session: result.createdSessionId });
        window.location.replace('/'); // Navigate to the dashboard or home page
      } else {
        // Sign in requires additional steps, such as 2FA
        setError('Additional verification required. Please contact support.');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error during sign in:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        // This handles Clerk-specific errors
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || 'Invalid email or password. Please try again.');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }
  };

  // Handle SSO sign-in with providers
  const handleSSOSignIn = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      });
      
      // Note: The redirect will happen automatically, so we don't need to set loading to false
    } catch (err) {
      console.error(`Error signing in with ${strategy}:`, err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || `Failed to sign in with ${strategy}. Please try again.`);
      } else {
        setError(`Failed to sign in with ${strategy}. Please try again.`);
      }
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoaded || !resetEmail) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Start by creating a sign-in attempt with the email
      const signInAttempt = await signIn.create({
        identifier: resetEmail,
      });
      
      // Get the first email address from the sign-in attempt
      if (signInAttempt.supportedFirstFactors) {
        const emailFactor = signInAttempt.supportedFirstFactors.find(
          factor => factor.strategy === 'email_code' || factor.strategy === 'email_link'
        );
        
        if (emailFactor && 'emailAddressId' in emailFactor) {
          // Now we can prepare the reset with the correct emailAddressId
          await signIn.prepareFirstFactor({
            strategy: "reset_password_email_code",
            emailAddressId: emailFactor.emailAddressId
          });
          
          setResetSent(true);
        } else {
          setError('Could not find an email address for this account.');
        }
      } else {
        setError('This email is not registered or does not support password reset.');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error sending password reset:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || 'Failed to send reset email. Please try again.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8F8F8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Main Content */}
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 2 : 2,
            py: 6,
            px: 3,
            justifyContent: 'center',
            minHeight: '100vh'
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column' ,
                alignItems: 'center',
                gap: 2,
                width: '100%'
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="Noyack Logo"
                sx={{
                  width: 80,
                  height: 80
                }}
              />

              <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: '39px', 
                    fontWeight: 'bold',
                  }}
                >
                  Welcome back
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '16px',
                    color: theme.palette.text.secondary,
                    textAlign:"center"
                  }}
                >
                  Sign in to access your account.
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?
                </Typography>
                <Button
                  onClick={onSwitchToSignUp}
                  sx={{
                    color: '#009FE3',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Welcome Text */}


          {/* Forms Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'transparent'
            }}
          >
            {!showForgotPassword ? (
              // Sign in form
              <Box>
                <Box component="form" onSubmit={handleEmailSignIn} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                    
                    <TextField
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                    
                    {error && (
                      <Alert severity="error" sx={{ mt: 1 }}>
                        {error}
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color='myBlue'
                      disabled={loading}
                      sx={{
                        fontSize: '18px',
                        borderRadius: 2,
                        textTransform: 'none',
                        width:"20ch",
                        alignSelf:"flex-end",
                        color:"#fff"
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Button
                        variant="text"
                        color="info"
                        onClick={() => setShowForgotPassword(true)}
                        sx={{
                          textTransform: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                  <Divider sx={{ flexGrow: 1 }} />
                  <Typography sx={{ px: 2, color: 'text.secondary' }}>
                    or
                  </Typography>
                  <Divider sx={{ flexGrow: 1 }} />
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap:"wrap", gap: 2, justifyContent:"center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignIn("oauth_google")}
                    sx={socialStyle}
                  >
                    <GoogleIcon />
                    </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignIn("oauth_microsoft")}
                    fullWidth
                    sx={socialStyle}
                  >
                    <MicrosoftIcon />
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignIn("oauth_facebook")}
                    fullWidth
                    sx={socialStyle}
                  >
                    <FacebookIcon />
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignIn("oauth_github")}
                    fullWidth
                    sx={socialStyle}
                  >
                    <GitHubIcon />
                  </Button>
                </Box>
              </Box>
            ) : (
              // Forgot password form
              <Box component="form" onSubmit={handleForgotPassword}>
                {!resetSent ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center', mb: 2 }}>
                      Enter your email address and we'll send you instructions to reset your password.
                    </Typography>
                    
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                    
                    {error && (
                      <Alert severity="error">
                        {error}
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color='myBlue'
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '18px',
                        borderRadius: 2,
                        textTransform: 'none',
                        width:"20ch",
                        alignSelf:"end",
                        color:"#FFF"
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Sending...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Check your email! We've sent instructions to reset your password.
                    </Alert>
                  </Box>
                )}
                
                <Button
                  variant="text"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                    setError('');
                  }}
                  sx={{
                    mt: 2,
                    color: theme.palette.primary.main,
                    textTransform: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Back to Sign In
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default SignInComponent;