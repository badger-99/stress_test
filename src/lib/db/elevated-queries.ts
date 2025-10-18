import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import { Insight, Question } from '../types';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

// Get all questions
export async function getQuestions() {
	const { data: questions, error }: PostgrestResponse<Question> = await supabase
		.from('questions')
		.select('*');

	if (error) {
		console.error('Error fetching questions:', error);
		return [];
	}

	return questions ?? [];
}

// Get all insights
export async function getInsights() {
	const { data: insights, error }: PostgrestResponse<Insight> = await supabase
		.from('insights')
		.select('*');

	if (error) {
		console.error('Error fetching insights:', error);
		return [];
	}

	return insights ?? [];
}
