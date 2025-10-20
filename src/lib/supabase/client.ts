import { createClient } from "@/utils/supabase/client";
import { Provider, User } from "@supabase/supabase-js";

export async function oAuthSignIn(provider: Provider, origin:string) {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});
}

export async function getSession (user: User | null) {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		return null
	}

	if (data.session?.user != user) {
		return null
	}

	return data.session
}