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

