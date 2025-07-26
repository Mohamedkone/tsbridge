/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from '../../../../../store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }:any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state:any) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id:string) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id:string) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps:
  | {
      component: React.ForwardRefExoticComponent<
        React.PropsWithoutRef<any> & React.RefAttributes<HTMLAnchorElement>
      >;
    }
  | {
      component: 'a';
      href: string;
      target?: string;
    };

if (item?.external) {
  listItemProps = { component: 'a', href: item.url, target: itemTarget };
} else {
  listItemProps = {
    component: forwardRef<HTMLAnchorElement, any>((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
}


  const itemHandler = (id:string) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        display:"flex",
        flexDirection:"column",
        mb: 0.5,
        alignItems: 'center',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: {base:0, md:level > 1 ? 1 : 1.25},
        "&.Mui-selected":{
          background:"none"
        }
      }}
      selected={customization.isOpen.findIndex((id:string) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon 
        sx={{ 
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          justifyContent:'center',
          color: "#fff",
          background:customization.isOpen.findIndex((id:string) => id === item.id) > -1 ?"#fff":"",
          p:customization.isOpen.findIndex((id:string) => id === item.id) > -1 ?1:0,
          borderRadius:customization.isOpen.findIndex((id:string) => id === item.id) > -1 ?"20px":0
        }}
        style={{
        }}
      >{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={customization.isOpen.findIndex((id:string) => id === item.id) > -1 ? 'h5' : 'h6'}  color={customization.isOpen.findIndex((id:string) => id === item.id) > -1 ?"#fff":"#ccc"}>
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subtitle1 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />

    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
