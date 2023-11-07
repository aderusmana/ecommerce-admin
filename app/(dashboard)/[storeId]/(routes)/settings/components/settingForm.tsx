'use client';
import React, { useState } from 'react';
import { Store } from '@prisma/client';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
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
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;
const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const params = useParams();
  const router = useRouter();

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store updated');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
    } catch (error) {
    } finally {
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className={'flex items-center justify-between'}>
        <Heading title={'Settings'} description={'Manage store preferences'} />
        <Button
          variant={'destructive'}
          size={'icon'}
          onClick={() => setOpen(true)}
        >
          <Trash className={'h-4 w-4'} />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'space-y-8 w-full'}
        >
          <div className={' grid grid-cols-3 gap-8'}>
            <FormField
              name={'name'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={'Store Name'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type={'submit'} className={'ml-auto'}>
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingForm;
