import React, { useEffect, useRef } from "react";

declare global {
	interface Window {
		iFrameResize: (options: object, element: HTMLElement) => void;
	}
}

export default function ResponsiveInsta() {
	const iframeRef = useRef(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js";
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const handleIframeLoad = () => {
		if (window.iFrameResize && iframeRef.current) {
			window.iFrameResize({}, iframeRef.current);
		}
	};

	return (
		<div className="h-full w-full relative">
			<iframe
				ref={iframeRef}
				onLoad={handleIframeLoad}
				src="https://4cf65b313bd14d028f9d1929f568dafe.elf.site"
				title="Instagram Feed"
				className="h-full w-full border-0"
				style={{ width: "100%", border: "0", overflow: "hidden" }}
			/>
			<div className="w-full h-10 absolute bottom-0 left-0 bg-[#fff9f5] z-10" />
		</div>
	);
}
