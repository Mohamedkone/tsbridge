/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Box, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

const Header = ({handleOpen, bText}:any) => {
const theme = useTheme()
  return (
    <Box display="flex" justifyContent="right" my={2}>
        <Button variant="contained" 
        color="warning"
        sx={{color:"#fff", 
        backgroundColor: theme.palette?.orange.dark,
        }}
        startIcon={<Add />}
        onClick={handleOpen}
        >
            {bText}
        </Button>
    </Box>
  );
};

export default Header;
