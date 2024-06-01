'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import Icon from '../Icon';
import { signIn } from 'next-auth/react';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
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
        });
        console.log(signInData)
    };

    return (
        <form className='grid grid-cols-1 grid-rows-[auto_1fr] gap-2' onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button color='primary' onClick={form.handleSubmit(onSubmit)}>Sign In</Button>
        </form>
    );
};

export default SignInForm;