"use client";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

const mockNotifications = [
  {
    id: 1,
    title: "Đơn hàng của bạn đã được xác nhận",
    time: "2 giờ trước",
    icon: <MarkEmailUnreadIcon color="primary" />,
  },
  {
    id: 2,
    title: "Sản phẩm yêu thích sắp hết hàng!",
    time: "Hôm qua",
    icon: <NotificationsIcon color="secondary" />,
  },
  {
    id: 3,
    title: "Bạn vừa nhận được mã giảm giá 10%",
    time: "2 ngày trước",
    icon: <NotificationsIcon color="action" />,
  },
];

export default function NotificationPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Thông báo
      </Typography>

      <List>
        {mockNotifications.map((notification, index) => (
          <div key={notification.id}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>{notification.icon}</ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={notification.time}
              />
            </ListItem>
            {index < mockNotifications.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Container>
  );
}
