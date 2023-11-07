'use client';

import React, { useEffect, useState } from 'react';
import StoreModal from '@/components/modals/store-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    return () => {
      setIsMounted(true);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModal></StoreModal>;
};

export default ModalProvider;
