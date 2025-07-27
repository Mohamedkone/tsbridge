import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Avatar,
	Box,
	ClickAwayListener,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popper,
	Stack,
	Typography,
	Card,
	CardContent,
	Grow,
	Paper
} from "@mui/material";

// assets
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { AuthContext } from "../../../../context/AuthContext";
import { useAuth } from "@clerk/clerk-react";

// TypeScript interfaces
interface UserData {
	uName: string;
	uRole: string;
	uAvatar: string;
}

interface ProfileSectionProps {
	userData: UserData;
}

// ==============================|| NEW PROFILE MENU ||============================== //

const ProfileSection: React.FC<ProfileSectionProps> = ({ userData }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { signOut } = useAuth();

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [open, setOpen] = useState<boolean>(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	// Handle closing the menu
	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
			return;
		}
		setOpen(false);
	};

	// Handle menu item clicks
	const handleListItemClick = (
		event: React.MouseEvent<HTMLDivElement>, 
		index: number, 
		route?: string
	) => {
		setSelectedIndex(index);
		handleClose(event);

		if (route) {
			navigate(route);
		}
	};

	// Toggle menu open/close
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	// Focus management
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			if (anchorRef.current) {
				anchorRef.current.focus();
			}
		}
		prevOpen.current = open;
	}, [open]);

	return (
		<>
			{/* Profile Avatar Button */}
			<Avatar
				src={userData.uAvatar}
				sx={{
					cursor: "pointer",
					width: 40,
					height: 40,
					border: "1px solid #000",
					transition: "all 0.2s ease-in-out",
					"&:hover": {
						transform: "scale(1.05)",
						boxShadow: theme.shadows[4]
					}
				}}
				ref={anchorRef}
				aria-controls={open ? "profile-menu" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			/>

			{/* Menu Popper */}
			<Popper
				id="profile-menu"
				open={open}
				anchorEl={anchorRef.current}
				placement="bottom-end"
				transition
				disablePortal
				sx={{ zIndex: 1300 }}
				modifiers={[
					{
						name: "offset",
						options: {
							offset: [0, 14]
						}
					}
				]}
			>
				{({ TransitionProps }) => (
					<Grow
						{...TransitionProps}
						timeout={200}
						style={{
							transformOrigin: "top right"
						}}
					>
						<Paper elevation={8}>
							<ClickAwayListener onClickAway={handleClose}>
								<Card
									sx={{
										minWidth: 300,
										maxWidth: 350,
										border: "none",
										boxShadow: theme.shadows[8],
										borderRadius: 2
									}}
								>
									{/* User Info Header */}
									<CardContent sx={{ p: 2, pb: 1 }}>
										<Stack spacing={1}>
											<Stack direction="row" spacing={1} alignItems="center">
												<Typography 
													variant="h6" 
													sx={{ 
														fontWeight: 500,
														color: theme.palette.text.primary
													}}
												>
													{userData.uName}
												</Typography>
											</Stack>
											<Typography 
												variant="body2" 
												sx={{ 
													color: theme.palette.text.secondary,
													fontSize: "0.875rem"
												}}
											>
												{userData.uRole}
											</Typography>
										</Stack>
									</CardContent>

									{/* Menu Items */}
									<Box sx={{ px: 1, pb: 1 }}>
										<List component="nav" sx={{ py: 0 }}>
											{/* Account Settings - Only show if not guest */}
												<ListItemButton
													sx={{
														borderRadius: 1,
														mx: 1,
														mb: 0.5,
														"&:hover": {
															backgroundColor: theme.palette.action.hover
														},
														"&.Mui-selected": {
															backgroundColor: theme.palette.action.selected
														}
													}}
													selected={selectedIndex === 0}
													onClick={(event) => handleListItemClick(event, 0, "account")}
												>
													<ListItemIcon sx={{ minWidth: 36 }}>
														<IconSettings 
															stroke={1.5} 
															size="1.25rem" 
															color={theme.palette.text.secondary}
														/>
													</ListItemIcon>
													<ListItemText 
														primary={
															<Typography variant="body2">
																Account Settings
															</Typography>
														} 
													/>
												</ListItemButton>

											{/* Logout */}
											<ListItemButton
												sx={{
													borderRadius: 1,
													mx: 1,
													color: theme.palette.error.main,
													"&:hover": {
														backgroundColor: theme.palette.error.light + "20"
													}
												}}
												onClick={() => signOut()}
											>
												<ListItemIcon sx={{ minWidth: 36 }}>
													<IconLogout 
														stroke={1.5} 
														size="1.25rem" 
														color={theme.palette.error.main}
													/>
												</ListItemIcon>
												<ListItemText 
													primary={
														<Typography 
															variant="body2"
															sx={{ color: theme.palette.error.main }}
														>
															Logout
														</Typography>
													} 
												/>
											</ListItemButton>
										</List>
									</Box>
								</Card>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default ProfileSection;