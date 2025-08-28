import { SVGProps } from "react";

export const ChevronExpandYIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<g fill="currentColor" className="nc-icon-wrapper">
			<path d="M9.53 2.22a.75.75 0 0 0-1.061 0l-3.5 3.5A.75.75 0 1 0 6.03 6.781L9 3.811l2.97 2.97a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.061z"></path>
			<path
				d="M11.97 11.22 9 14.19l-2.97-2.97a.75.75 0 1 0-1.061 1.061l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 1 0-1.061-1.061Z"
				data-color="color-2"
			></path>
		</g>
	</svg>
);
