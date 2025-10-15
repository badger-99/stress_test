'use client';

import { useResults } from '@/providers/results-provider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Report } from '@/components/report';
import { useEffect } from 'react';

export default function Results() {
  const router = useRouter();
  const { results } = useResults();

  useEffect(() => {
		if (!results.latest || !results.history) {
			router.push('/');
		}
	}, [results, router]);

	// If redirecting, avoid rendering rest of component
	if (!results.latest || !results.history) {
		return null;
	}

  const latest = results.latest!

  return (
    <div className='flex-1 p-4'>
      Results displayed on this page.
      <Report data={latest}></Report>
    </div>
  )
}