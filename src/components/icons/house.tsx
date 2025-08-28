import { SVGProps } from "react";

export const HouseIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="m15.309 5.603-5.25-3.99a1.754 1.754 0 0 0-2.118 0l-5.25 3.99A1.76 1.76 0 0 0 2 6.996v7.254A2.75 2.75 0 0 0 4.75 17h3.5v-3.75a.75.75 0 0 1 1.5 0V17h3.5A2.75 2.75 0 0 0 16 14.25V6.996c0-.543-.258-1.064-.691-1.394Z"
			className="nc-icon-wrapper"
		></path>
	</svg>
);
