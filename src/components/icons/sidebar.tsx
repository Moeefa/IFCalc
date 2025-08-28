import { SVGProps } from "react";

export const SidebarIcon = (props: SVGProps<SVGSVGElement>) => (
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
			fillRule="evenodd"
			d="M16.5 11.25v-5.5A2.75 2.75 0 0 0 13.75 3h-10A2.75 2.75 0 0 0 1 5.75v5.5A2.75 2.75 0 0 0 3.75 14h10a2.75 2.75 0 0 0 2.75-2.75m-1.5 0c0 .689-.561 1.25-1.25 1.25H7.5v-8h6.25c.689 0 1.25.561 1.25 1.25z"
			clipRule="evenodd"
		></path>
	</svg>
);
