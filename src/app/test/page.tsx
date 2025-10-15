import Link from "next/link";
import { stress_test } from "@/lib/questions";
import QuestionCard from "@/components/question";

export default function Test() {
  const suite = stress_test.questions;
  return (
		<div className='flex-1 p-4'>
			<p className='text-2xl font-semibold'>StressTest</p>
			<p>
				Emotional Well-Being Check-In: Quick, friendly self-assessment of perceived stress and
				emotional balance.
			</p>
			<div className='w-full flex flex-col p-2 items-center justify-center gap-6'>
				<p className='text-sm'>
					Answer how much each statement applied to you today (0 = Not at all, 4 = Extremely).
        </p>
        <div className="flex flex-col gap-4">
          {Object.keys(suite).map((question) => {
            return <QuestionCard key={suite[`${question}`].id} question={suite[`${question}`]} />;
        })}
        </div>
			</div>
			<Link href={'/results'}>see results</Link>
		</div>
	);
}
