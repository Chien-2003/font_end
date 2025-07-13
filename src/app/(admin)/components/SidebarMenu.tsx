'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Article as ArticleIcon,
  PostAdd as PostAddIcon,
  ArrowBack as ArrowBackIcon,
  Inventory2 as InventoryIcon,
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Bảng điều khiển',
    icon: <DashboardIcon />,
    href: '/admin',
  },
  {
    label: 'Đơn hàng',
    icon: <ShoppingCartIcon />,
    href: '/admin/orders',
  },
  {
    label: 'Tạo bài viết',
    icon: <ArticleIcon />,
    href: '/admin/blog',
  },
];

const productItems = [
  {
    label: 'Tạo sản phẩm',
    icon: <PostAddIcon />,
    href: '/admin/tao-san-pham',
  },
  {
    label: 'Danh sách sản phẩm',
    icon: <InventoryIcon />,
    href: '/admin/danh-sach-san-pham',
  },
];

export default function SidebarMenu() {
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
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

        <ListItemButton onClick={() => setOpenProduct(!openProduct)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Sản phẩm" />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {productItems.map((item) => (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      <Box sx={{ mt: 'auto', p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/">
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Quay lại Web" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
}
