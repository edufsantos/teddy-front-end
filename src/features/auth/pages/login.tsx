import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/mutations/use-login';
import { LoginRequest } from '../models/login-request';
import { LoginFormValues, useLoginFormSchema } from '../schemas/login-schema';

const useLoginHandler = () => {
  const { mutate, isPending } = useLogin();

  const { state } = useLocation();
  const navigate = useNavigate();

  const handleError = () => {
    toast.warning('Dados de acesso inválidos.');
  };

  const handleSuccess = (): void => {
    const from = state?.from || '/';
    return void navigate(from, { replace: true });
  };

  const onSubmit = (data: LoginFormValues) => {
    const request = new LoginRequest(data.name);

    mutate(request, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { onSubmit, isPending };
};

const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(useLoginFormSchema()),
  });
  const { isPending, onSubmit } = useLoginHandler();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-[2rem] font-bold mb-4'>Olá, seja bem-vindo!</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Digite o seu nome:' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            size='sm'
            className='bg-orange-500 text-white w-full'
            isLoading={isPending}
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { LoginPage };
