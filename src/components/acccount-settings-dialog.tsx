import { useState } from 'react';
import { Button } from './ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { User } from '@supabase/supabase-js';
import { deleteUser } from '@/lib/db/elevated-queries';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AccountDialog({ user }: { user: User }) {
	const [input, setInput] = useState('');
  const text = 'I understand and wish to delete my account';
  const router = useRouter();

	const handleDeletion = async () => {
		try {
			// await ensures we only redirect on success
			await toast.promise(deleteUser(user.id), {
				loading: 'Deleting account...',
				success: (user_id) => `Account ${user_id} deleted successfully`,
				error: (err) => err.message ?? 'Failed to delete user',
			});

			// Runs ONLY on success
			router.push('/goodbye'); // or wherever you want to redirect
		} catch (error) {
			// No redirect on error — Sonner already shows the error toast.
			console.error('Failed to delete user:', error);
		}
	};
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete Your Account.</DialogTitle>
				<DialogDescription>
					Deleting your account will immediately erase all your data from our servers permanently
					and cannnot be reversed.
				</DialogDescription>
				<DialogDescription>
					Type <strong>I understand and wish to delete my account</strong> in the box below to
					delete your account.
				</DialogDescription>
			</DialogHeader>
			<Input className='border-foreground/50' onChange={(e) => setInput(e.target.value)} />
			<DialogFooter>
				<Button variant={'destructive'} disabled={text != input} onClick={handleDeletion}>
					Delete
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
