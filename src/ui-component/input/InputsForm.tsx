/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { roles } from '../../store/constant';

interface InputsFormProps {
  formAccess: string;
  formFName: string;
  formLName: string;
  formRole: string;
  setFormAccess: (value: string) => void;
  setFormFName: (value: string) => void;
  setFormLName: (value: string) => void;
  setFormRole: (value: string) => void;
  email: string | undefined;
  myRole: string | undefined;
  role: string | undefined;
  isMyAccount: boolean;
}

export default function InputsForm({
  formAccess,
  formFName,
  formLName,
  formRole,
  setFormAccess,
  setFormFName,
  setFormLName,
  setFormRole,
  email,
  myRole,
  role,
  isMyAccount,
}: InputsFormProps) {

  const handleTextChange = (e: any, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  const handleSelectChange = (e: any, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="First Name"
          id="fname"
          defaultValue={formFName}
          variant="filled"
          onChange={(e) => handleTextChange(e, setFormFName)}
        />
        <TextField
          label="Last Name"
          id="lname"
          defaultValue={formLName}
          variant="filled"
          onChange={(e) => handleTextChange(e, setFormLName)}
        />
      </div>
      <div>
        <TextField
          disabled
          label="email"
          id="email"
          defaultValue={email}
          variant="filled"
        />

        <TextField
          id="filled-select-role"
          select
          label="Role"
          value={formRole}
          disabled={role === "Admin" && myRole !== "Owner" ? true : myRole === "User" ? true : false}
          helperText="You can change users role"
          variant="filled"
          onChange={(e) => handleSelectChange(e, setFormRole)}
        >
          {roles.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        {isMyAccount ? null : (
          <TextField
            id="filled-select-access"
            select
            value={formAccess}
            label="Access"
            helperText="Temporarely remove access"
            variant="filled"
            onChange={(e) => handleSelectChange(e, setFormAccess)}
          >
            {["Active", "Suspended"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </div>
    </Box>
  );
}