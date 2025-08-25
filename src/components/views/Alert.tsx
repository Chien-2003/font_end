'use client';

import React, { useEffect, useState } from 'react';
import {
  TriangleAlert,
  CircleAlert,
  CircleCheckIcon,
} from 'lucide-react';

type AlertType = 'info' | 'error' | 'success';

interface AlertProps {
  type?: AlertType;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

const ICONS = {
  info: TriangleAlert,
  error: CircleAlert,
  success: CircleCheckIcon,
};

const COLORS = {
  info: {
    border: 'border-amber-500/50',
    text: 'text-amber-600',
  },
  error: {
    border: 'border-red-500/50',
    text: 'text-red-600',
  },
  success: {
    border: 'border-emerald-500/50',
    text: 'text-emerald-600',
  },
};

export default function Alert({
  type = 'info',
  message = '',
  duration = 3000,
  onClose,
}: AlertProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  const Icon = ICONS[type];
  const colorClasses = COLORS[type];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-md border px-4 py-3 ${colorClasses.border} ${colorClasses.text}`}
      role="alert"
    >
      <p className="text-sm flex items-center">
        <Icon
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={16}
          aria-hidden="true"
        />
        {message}
      </p>
    </div>
  );
}
