import { SVGProps } from "react";

export const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<path
			fill="currentColor"
			d="M14.75 9.75H3.25a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 0 1.5"
			className="nc-icon-wrapper"
		></path>
	</svg>
);
