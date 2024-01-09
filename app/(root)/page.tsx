'use client';

import { UserButton } from '@clerk/nextjs';
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);



  return <div className={'p-4'}>Root Page</div>;
}
