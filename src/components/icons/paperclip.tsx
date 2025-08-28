import { SVGProps } from "react";

export const PaperclipIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="M13.75 4.25A.75.75 0 0 0 13 5v6.75c0 2.068-1.682 3.75-3.75 3.75S5.5 13.818 5.5 11.75v-7c0-1.241 1.009-2.25 2.25-2.25S10 3.509 10 4.75v7a.75.75 0 0 1-1.5 0V5A.75.75 0 0 0 7 5v6.75C7 12.991 8.009 14 9.25 14s2.25-1.009 2.25-2.25v-7C11.5 2.682 9.818 1 7.75 1S4 2.682 4 4.75v7C4 14.645 6.355 17 9.25 17s5.25-2.355 5.25-5.25V5a.75.75 0 0 0-.75-.75"
			className="nc-icon-wrapper"
		></path>
	</svg>
);
