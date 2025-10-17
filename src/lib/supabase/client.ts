import { createClient } from "@/utils/supabase/client";
import { Provider } from "@supabase/supabase-js";

export const oAuthSignIn = async (provider: Provider, origin:string) => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});
}