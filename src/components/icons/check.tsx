import { SVGProps } from "react";

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="M6.75 15h-.002a.75.75 0 0 1-.583-.281l-4-5a.749.749 0 1 1 1.171-.937l3.418 4.272 7.913-9.776a.75.75 0 1 1 1.166.944l-8.5 10.5A.75.75 0 0 1 6.75 15"
			className="nc-icon-wrapper"
		></path>
	</svg>
);
