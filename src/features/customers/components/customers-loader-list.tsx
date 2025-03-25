import { Skeleton } from '@/shared/components/ui/skeleton';

const LoaderList = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='text-gray-500 text-center space-y-4'>
        <Skeleton className='w-[300px] h-[20px] rounded-full' />
        <Skeleton className='w-[300px] h-[20px] rounded-full' />
        <Skeleton className='w-[300px] h-[20px] rounded-full' />
      </div>
    </div>
  );
};
export { LoaderList };
