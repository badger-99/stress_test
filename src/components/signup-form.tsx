'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { signup } from '@/lib/supabase/server';
import { useEffect, useState } from 'react';
import { oAuthSignIn } from '@/lib/supabase/client';
import { Provider } from '@supabase/supabase-js';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const [password, setPassword] = useState('');
	const [pwdConfirmation, setPwdConfimation] = useState('');
	const [valid, setValid] = useState(true);

	useEffect(() => {
		setValid(password == pwdConfirmation);
	}, [password, pwdConfirmation, setValid]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form_data = new FormData(event.currentTarget);
		await signup(form_data);
	}
	async function handleOAuth(provider: Provider, origin: string) {
		await oAuthSignIn(provider, origin)
	}
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Enter your information below to create your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Full Name</FieldLabel>
							<Input id='name' name='name' type='text' placeholder='John Doe' required />
						</Field>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input id='email' name='email' type='email' placeholder='m@example.com' required />
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Input
								id='password'
								name='password'
								type='password'
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FieldDescription>
								<span className={`${password.length > 7 && 'invisible'}`}>
									Must be at least 8 characters long.
								</span>
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
							<Input
								id='confirm-password'
								name='confirm-password'
								type='password'
								required
								disabled={password.length < 8}
								onChange={(e) => setPwdConfimation(e.target.value)}
							/>
							<FieldDescription>Please confirm your password.</FieldDescription>
							<div className={`text-destructive ${valid && 'invisible'}`}>
								Passwords don&apos;t match!
							</div>
						</Field>
						<FieldGroup>
							<Field>
								<Button disabled={!valid} type='submit'>
									Create Account
								</Button>
								<Button
									variant='outline'
									type='button'
									onClick={() => handleOAuth('google', origin)}
								>
									Sign up with Google
								</Button>
								<FieldDescription className='px-6 text-center'>
									Already have an account?{' '}
									<Link href='/auth/login' className=' text-blue-400'>
										Log in
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
