'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '../Toaster/use-toast';
import { Icon, GoogleSignin } from '@/components'

const FormSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        username: z.string().min(1, 'Username is required').max(20, 'Username must be less than 20 characters'),
        password: z.string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
        })

        if (response.ok) {
            router.push('/sign-in')
        } else {
            toast({
                title: 'Error',
                description: 'Oops! Something went wrong!',
                variant: 'destructive',
            })
        }
    };


    return (
        <div className='w-full min-w-[320px] flex flex-col gap-6'>
            <div>
                <h2 className='text-2xl font-semibold mb-2'>Get started</h2>
                <p className='text-sm'>Create a new account</p>
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
                    <label className='mb-2 block text-sm'>Username</label>
                    <Input
                        variant="bordered"
                        radius='sm'
                        type="text"
                        placeholder="username"
                        labelPlacement="outside"
                        isInvalid={!!form.formState.errors.username}
                        errorMessage={form.formState.errors.username?.message}
                        {...form.register('username')}
                    />
                </div>
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
                <div>
                    <label className='mb-2 block text-sm'>Confirm Password</label>
                    <Input
                        variant="bordered"
                        radius='sm'
                        type='password'
                        placeholder="●●●●●●●●"
                        labelPlacement="outside"
                        isInvalid={!!form.formState.errors.confirmPassword}
                        errorMessage={form.formState.errors.confirmPassword?.message}
                        {...form.register('confirmPassword')}
                    />
                </div>
                <Button
                    className='mt-4'
                    color='primary'
                    onClick={form.handleSubmit(onSubmit)}>Sign Up</Button>

                <p className='text-sm text-center mt-4'>Have an account? <Link href={'/sign-in'} className='text-primary'>Sign In Now</Link></p>
            </form>
        </div>
    );
};

export default SignUpForm;