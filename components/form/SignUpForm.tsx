'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, user } from '@nextui-org/react';
import { useState } from 'react';
import Icon from '../Icon';
import { useRouter } from 'next/navigation';

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
            console.error('Failed to sign up')
        }
    };


    return (
        <form className='grid grid-cols-1 grid-rows-[auto_1fr] gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <Input
                isRequired
                variant="bordered"
                radius='sm'
                size='sm'
                type="text"
                label="Username"
                placeholder="username"
                labelPlacement="outside"
                isInvalid={!!form.formState.errors.username}
                errorMessage={form.formState.errors.username?.message}
                {...form.register('username')}
            />
            <Input
                isRequired
                variant="bordered"
                radius='sm'
                size='sm'
                type="email"
                label="Email"
                placeholder="you@example.com"
                labelPlacement="outside"
                isInvalid={!!form.formState.errors.email}
                errorMessage={form.formState.errors.email?.message}
                {...form.register('email')}
            />

            <Input
                isRequired
                variant="bordered"
                radius='sm'
                size='sm'
                label="Password"
                placeholder="password"
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

            <Input
                isRequired
                variant="bordered"
                radius='sm'
                size='sm'
                type='password'
                placeholder="password"
                label="Confirm Password"
                labelPlacement="outside"
                isInvalid={!!form.formState.errors.confirmPassword}
                errorMessage={form.formState.errors.confirmPassword?.message}
                {...form.register('confirmPassword')}
            />
            <Button color='primary' onClick={form.handleSubmit(onSubmit)}>Sign Up</Button>
        </form>
    );
};

export default SignUpForm;