import Image from "next/image";

export function LogoMobile() {
	return (
		<div className="flex items-center justify-center relative overflow-hidden w-16 h-16 rounded-xl">
			<Image src="/bb-lagos-logo.png" alt="BB Lagos" width={60} height={60} />
		</div>
	);
}
