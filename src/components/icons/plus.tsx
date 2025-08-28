import { SVGProps } from "react";

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<g fill="currentColor" className="nc-icon-wrapper">
			<path
				d="M14.75 9.75H3.25a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 0 1.5"
				data-color="color-2"
			></path>
			<path d="M9 15.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75"></path>
		</g>
	</svg>
);
