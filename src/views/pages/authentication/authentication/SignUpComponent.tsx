import { useState } from 'react';
import {
  Typography,
  Button,
  Divider,
  TextField,
  Container,
  Box,
  Paper,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { useSignUp } from '@clerk/clerk-react';
import { useTheme } from '@mui/material/styles';
import type { ClerkError } from '../../../../types';
import Logo from "../../../../assets/images/logo.svg";
import { FacebookIcon, GitHubIcon, GoogleIcon, MicrosoftIcon } from '../../../../assets/socialIcons';

// Define the OAuth strategies as string literals to match Clerk's expected values
type OAuthStrategy = 'oauth_google' | 'oauth_facebook' | 'oauth_microsoft';

interface SignUpComponentProps {
  isMobile: boolean;
  onSwitchToSignIn: () => void;
}

function SignUpComponent({ isMobile, onSwitchToSignIn }: SignUpComponentProps) {
  const theme = useTheme();
  const { isLoaded, signUp, setActive } = useSignUp();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');


  const socialStyle = {
    py: 1.5,
    borderColor: theme.palette.grey[300],
    color: theme.palette.grey[700],
    textTransform: 'none',
    borderRadius: 2,
    width: '80px'
  }

  // Handle email/password sign up form submission
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoaded) {
      return;
    }

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      setLoading(true);
      setError('');

      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      if (result.status === 'complete') {
        // Sign up was successful, user is signed in
        await setActive({ session: result.createdSessionId });
        window.location.replace('/'); // Navigate to the dashboard or home page
      } else if (result.status === 'missing_requirements') {
        // Need email verification
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setVerifying(true);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error during sign up:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        // This handles Clerk-specific errors
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || 'An error occurred during sign up. Please try again.');
      } else {
        setError('An error occurred during sign up. Please try again.');
      }
      setLoading(false);
    }
  };

  // Handle email verification
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoaded || !code) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');

      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        window.location.replace('/');
      } else {
        setError('Invalid verification code. Please try again.');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error during verification:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || 'Invalid verification code. Please try again.');
      } else {
        setError('Invalid verification code. Please try again.');
      }
      setLoading(false);
    }
  };

  // Handle SSO sign-up with providers
  const handleSSOSignUp = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      });
      
      // Note: The redirect will happen automatically, so we don't need to set loading to false
    } catch (err) {
      console.error(`Error signing up with ${strategy}:`, err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const clerkError = err as ClerkError;
        setError(clerkError.errors?.[0]?.message || `Failed to sign up with ${strategy}. Please try again.`);
      } else {
        setError(`Failed to sign up with ${strategy}. Please try again.`);
      }
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8F8F8',
        display: isMobile ? 'flex' : 'grid',
        gridTemplateColumns: isMobile ? 'none' : '2fr 1fr',
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
            gap: isMobile ? 2 : 6,
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
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: isMobile ? 2 : 4,
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
                        mb: 1
                    }}
                    >
                    Create your account
                    </Typography>
                    <Typography 
                    variant="body1" 
                    sx={{ 
                        fontSize: '16px',
                        color: theme.palette.text.secondary
                    }}
                    >
                    Sign up to get started with your account.
                    </Typography>
                </Box>
              
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <Typography variant="body2">
                  Already have an account?
                </Typography>
                <Link
                  component="button"
                  onClick={onSwitchToSignIn}
                  sx={{
                    color: '#009FE3',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign In
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Forms Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'transparent'
            }}
          >
            {!verifying ? (
              // Sign up form
              <Box>
                <Box component="form" onSubmit={handleEmailSignUp} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Box>

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
                      helperText="Password must be at least 8 characters long"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />

                    <TextField
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                        alignSelf:"end",
                        color:"#fff"
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
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
                    onClick={() => handleSSOSignUp("oauth_google")}
                    sx={socialStyle}
                  >
                    <GoogleIcon />
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignUp("oauth_microsoft")}
                    sx={socialStyle}
                  >
                    <MicrosoftIcon />
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignUp("oauth_facebook")}
                    sx={socialStyle}
                  >
                    <FacebookIcon />
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => handleSSOSignUp("oauth_facebook")}
                    sx={socialStyle}
                  >
                    <GitHubIcon />
                  </Button>
                </Box>
              </Box>
            ) : (
              // Email verification form
              <Box component="form" onSubmit={handleVerifyEmail}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                    Verify your email
                  </Typography>
                  
                  <Typography sx={{ textAlign: 'center', mb: 2, color: 'text.secondary' }}>
                    We've sent a verification code to <strong>{email}</strong>. 
                    Please enter the code below to complete your registration.
                  </Typography>
                  
                  <TextField
                    label="Verification Code"
                    variant="outlined"
                    fullWidth
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    placeholder="Enter 6-digit code"
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
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '18px',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </Button>

                  <Button
                    variant="text"
                    onClick={async () => {
                      try {
                        await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
                        setError('');
                      } catch {
                        setError('Failed to resend code. Please try again.');
                      }
                    }}
                    sx={{
                      mt: 1,
                      textTransform: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Resend verification code
                  </Button>
                </Box>
                
                <Button
                  variant="text"
                  onClick={() => {
                    setVerifying(false);
                    setError('');
                    setCode('');
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
                  Back to Sign Up
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUpComponent;