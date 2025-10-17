// import { createClient, PostgrestResponse } from '@supabase/supabase-js';
// import { Result, Results } from '../types';

// const supabase = createClient(
// 	process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
// ); // Save results
// export async function saveResults(payload: Result) {
// 	const { data, error }: PostgrestResponse<Result> = await supabase
// 		.from('results')
// 		.insert([
// 			{
// 				user_id: payload.id,
// 				score: payload.score,
// 				answers: payload.answers,
// 				feedback: payload.feedback,
// 				created_at: new Date(payload.created_at).toISOString(),
// 			},
// 		])
// 		.select();
// 	if (error) {
// 		console.error('Error saving results:', error);
// 		throw error;
// 	}
// 	if (data && data[0]?.created_at) {
// 		data[0].created_at = new Date(data[0].created_at).getTime();
// 	}
// 	return data[0];
// }
// // Get results
// export async function getResults(id: string) {
// 	const { data: results, error } = await supabase
// 		.from('results')
// 		.select('*')
// 		.eq('user_id', id)
// 		.order('created_at', { ascending: false });
// 	// newest first
// 	if (error) throw error;
// 	// Convert created_at to Date.now() style timestamps
// 	const normalized = results.map((r) => ({ ...r, created_at: new Date(r.created_at).getTime() }));
// 	const data: Results = { history: normalized, latest: normalized[0] || null };
// 	return data;
// }
