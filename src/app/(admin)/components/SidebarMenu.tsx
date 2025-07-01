"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  Layers as LayersIcon,
  ExpandLess,
  ExpandMore,
  Article as ArticleIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    label: "Bảng điều khiển",
    icon: <DashboardIcon />,
    href: "/admin",
  },
  {
    label: "Đơn hàng",
    icon: <ShoppingCartIcon />,
    href: "/admin/orders",
  },
  {
    label: "Bài viết",
    icon: <ArticleIcon />,
    href: "/admin/blog",
  },
];

const reportItems = [
  {
    label: "Sales",
    icon: <DescriptionIcon />,
    href: "/admin/reports/sales",
  },
  {
    label: "Traffic",
    icon: <DescriptionIcon />,
    href: "/admin/reports/traffic",
  },
];

export default function SidebarMenu() {
  const [openReports, setOpenReports] = useState(false);

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.href} disablePadding>
          <ListItemButton component={Link} href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}

      <Divider sx={{ my: 1 }} />

      <ListItemButton onClick={() => setOpenReports(!openReports)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        {openReports ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openReports} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {reportItems.map((item) => (
            <ListItemButton key={item.href} component={Link} href={item.href} sx={{ pl: 4 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
