'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadsProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUploads: React.FC<ImageUploadsProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
 

  const onUploads = (result: any) => {
    onChange(result.info.secure_url);
  };

 
  return (
    <div>
      <div className={'mb-4 flex items-center gap-4'}>
        {value.map((url) => (
          <div
            key={url}
            className={
              'relative w-[200px] h-[200px] rounded-md overflow-hidden'
            }
          >
            <div className={'z-10 absolute top-2 right-2'}>
              <Button
                type={'button'}
                onClick={() => onRemove(url)}
                variant={'destructive'}
                size={'icon'}
              >
                <TrashIcon className={'h-4 w-4'} />
              </Button>
            </div>
            <Image
              fill
              className={'object-cover'}
              src={url}
              alt={'image'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUploads} uploadPreset={'cb3gzei0'}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type={'button'}
              variant={'secondary'}
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className={'h-4 w-4 mr-2'} /> Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploads;
