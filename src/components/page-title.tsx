import { AnimatedUnderlineText } from '@/components/animated-underline';

interface Props {
	title: string;
	subtitle?: React.ReactNode;
}

// The title's underline: a thin line that fades out at both ends, with a glow
// along its shape like the answer buttons. It draws outward from the centre
// once when the page loads.
const underline: React.CSSProperties = {
	bottom: '-0.5rem',
	backgroundImage: 'linear-gradient(to right, transparent, #3b82f6, transparent)',
	filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))',
};

// Shared page heading for Test, Results and History. Every page renders it as
// its first element with no extra top spacing of its own, so titles sit at the
// same height on every page; pt-16 clears the sidebar toggle in the corner.
export function PageTitle({ title, subtitle }: Props) {
	return (
		<header className='flex w-full flex-col items-center gap-5 px-4 pt-16 pb-8 text-center'>
			<h1 className='px-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
				<AnimatedUnderlineText trigger='mount' underlineColor='transparent' underlineStyle={underline}>
					{title}
				</AnimatedUnderlineText>
			</h1>
			{subtitle && <p className='max-w-2xl text-sm text-muted-foreground sm:text-base'>{subtitle}</p>}
		</header>
	);
}
