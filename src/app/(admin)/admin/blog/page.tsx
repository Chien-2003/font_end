'use client';

import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import SimpleEditor from '../../components/SimpleEditor';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {};

  return (
    <Container maxWidth="md" className="py-10" sx={{ p: 0 }}>
      <Typography variant="h4" gutterBottom>
        Tạo bài viết
      </Typography>

      <TextField
        fullWidth
        label="Tiêu đề"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <SimpleEditor onChange={(val) => setContent(val)} />

      <div className="mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Đăng bài
        </Button>
      </div>
    </Container>
  );
}
