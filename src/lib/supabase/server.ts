'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Loging in
export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

// Logging out
export async function logout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		redirect('/error')
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

// Signing up
export async function signup(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.name
      }
    }
  });

  if (error) {
    console.log(error)
		redirect('/error');
	}

	const cookieStore = await cookies();
	cookieStore.set({
		name: 'signup_email',
		value: data.email,
		httpOnly: true,
		path: '/',
		maxAge: 60 * 5, // 5 minutes
	});
	revalidatePath('/', 'layout');
	redirect('/auth/info');
}

// Checking User session
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    return null
  }

  return data.user;
}
