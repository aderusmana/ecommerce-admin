'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO create store
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);

      toast.success('Store created.');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={'Create Store'}
      description={'Add a New store to manage product and categories'}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name={'name'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={'E-Commerce'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant={'outline'}
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type={'submit'}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
