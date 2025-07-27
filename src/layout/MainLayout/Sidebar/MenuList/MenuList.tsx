/* eslint-disable @typescript-eslint/no-explicit-any */
// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup/NavGroup";
import menuItem from "../../../../menu-items/index";
import { useState } from "react";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
	const [menu] = useState<any[]>([...menuItem.items])
	
	const navItems = menu.map((item) => {
		switch (item.type) {
			case "group":
				return <NavGroup key={item.id} item={item} />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return <>{navItems}</>;
};

export default MenuList;
