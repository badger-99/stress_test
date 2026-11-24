import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function AuxHeader() {
  return (
		<div className='absolute top-0 left-0 w-full pt-4 px-4 flex flex-row justify-between items-center'>
			<Link href='/'>
				<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white'>
					ST
				</div>
			</Link>
			<div>
				<ThemeToggle size={20} />
			</div>
		</div>
	);
}