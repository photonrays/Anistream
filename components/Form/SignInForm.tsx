'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../Toaster/use-toast';
import { Icon, GoogleSignin } from '@/components'

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (signInData?.error) {
            toast({
                title: 'Error',
                description: 'Oops! Something went wrong!',
                variant: 'destructive',

            })
        } else {
            router.push('/')
        }
    };

    return (
        <div className='w-full min-w-[320px] flex flex-col gap-6'>
            <div>
                <h2 className='text-2xl font-semibold mb-2'>Welcome back</h2>
                <p className='text-sm'>Sign in to your account</p>
            </div>

            <div className='w-full'>
                <GoogleSignin />
            </div>

            <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-2 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <label className='mb-2 block text-sm'>Email</label>
                    <Input
                        variant="bordered"
                        radius='sm'
                        type="email"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        isInvalid={!!form.formState.errors.email}
                        errorMessage={form.formState.errors.email?.message}
                        {...form.register('email')}
                    />
                </div>

                <div>
                    <label className='mb-2 block text-sm'>Password</label>
                    <Input
                        variant="bordered"
                        radius='sm'
                        placeholder="●●●●●●●●"
                        labelPlacement="outside"
                        isInvalid={!!form.formState.errors.password}
                        errorMessage={form.formState.errors.password?.message}
                        {...form.register('password')}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon icon="ph:eye-slash-fill" className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <Icon icon="ph:eye-fill" className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                </div>
                <Button
                    className='mt-4'
                    color='primary'
                    onClick={form.handleSubmit(onSubmit)}>Sign In</Button>

                <p className='text-sm text-center mt-4'>Don&apos;t have an account? <Link href={'/sign-up'} className='text-primary'>Sign Up Now</Link></p>
            </form>
        </div>
    );
};

export default SignInForm;