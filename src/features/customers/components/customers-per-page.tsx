import { useQueryString } from '@/shared/hooks/use-query-string';
import { FindCustomersRequest } from '../models/find-customers-request';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const CustomersPerPage = () => {
  const [query, setQuery] = useQueryString<FindCustomersRequest>();

  return (
    <div className='text-sm text-gray-700 flex items-center gap-2'>
      <span>Clientes por página:</span>
      <Select
        value={String(query.take)}
        onValueChange={(value) => setQuery({ ...query, take: Number(value) })}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Selecione um valor' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='8'>8</SelectItem>
            <SelectItem value='12'>12</SelectItem>
            <SelectItem value='16'>16</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='30'>30</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export { CustomersPerPage };
