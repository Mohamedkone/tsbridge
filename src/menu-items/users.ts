// assets
import { IconAccessPoint, IconArrowsJoin } from "@tabler/icons-react";
import { IconDashboard, IconTransfer, IconUserHexagon } from "@tabler/icons-react";

// constant


// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const users = {
	id: "user",
	title: "user",
	type: "group",
	children: [
		{
			id: "admin",
			title: "Admin",
			type: "item",
			url: "/admin",
			icon: IconUserHexagon,
			breadcrumbs: false
		},
		{
			id: "default",
			title: "Dash",
			type: "item",
			url: "/",
			icon: IconDashboard,
			breadcrumbs: false
		},
		{
			id: "transfers",
			title: "Logs",
			type: "item",
			url: "/transfers",
			icon: IconTransfer,
			breadcrumbs: false
		},
		{
			id:"Bridge",
			title:"Bridge",
			type:"item",
			icon: IconAccessPoint,
			url:"/bridge",
			breadcrumbs: false
		},
		{
			id:"vault",
			title:"vault",
			type:"item",
			icon: IconArrowsJoin,
			url:"/vault",
			breadcrumbs: false
		},
	]
};

export default users;
