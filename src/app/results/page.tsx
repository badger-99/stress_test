'use client';

import { useResults } from '@/providers/results-provider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Report } from '@/components/report';

export default function Results() {
  const router = useRouter();
  const { results } = useResults();

  if (!results.latest || !results.history) {
    router.push('/');
  }

  const latest = results.latest!

  return (
    <div className='flex-1 p-4'>
      Results displayed on this page.
      <Report data={latest}></Report>
    </div>
  )
}