'use server';

import { createClient } from '@/utils/supabase/server';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Result, Results } from '@/lib/types';

export async function saveResults(result: Result) {
	const supabase = await createClient();

	const { data, error }: PostgrestResponse<Result> = await supabase
		.from('results')
		.insert([
			{
				user_id: result.id,
				score: result.score,
				answers: result.answers,
				feedback: result.feedback,
				created_at: new Date(result.created_at).toISOString(),
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error saving results:', error);
		throw new Error(error.message);
	}

	return data;
}

export async function getResults() {
	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return { history: [], latest: null };
	}

	const { data: results, error } = await supabase
		.from('results')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	if (error) throw new Error(error.message);

	const normalized = results.map((r) => ({
		...r,
		created_at: new Date(r.created_at).getTime(),
	}));

	const data: Results = {
		history: normalized,
		latest: normalized[0] || null,
	};

	return data;
}
