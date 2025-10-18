import Header from "@/components/header";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pt-10">
      <Header />
      {children}
		</div>
	);
}