import { SVGProps } from "react";

export const ArrowOutIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<g fill="currentColor" className="nc-icon-wrapper">
			<path d="M11.75 11.5a.75.75 0 0 0-.75.75v2.5a.25.25 0 0 1-.25.25H5.448l1.725-1.069A1.74 1.74 0 0 0 8 12.444V5.557c0-.609-.31-1.166-.827-1.487L5.448 3.001h5.302a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0V3.25c0-.965-.785-1.75-1.75-1.75h-6.5c-.965 0-1.75.785-1.75 1.75v11.5c0 .965.785 1.75 1.75 1.75h6.5c.965 0 1.75-.785 1.75-1.75v-2.5a.75.75 0 0 0-.75-.75"></path>
			<path
				d="m17.78 8.47-2.75-2.75a.75.75 0 1 0-1.061 1.061l1.47 1.47H11.25a.75.75 0 0 0 0 1.5h4.189l-1.47 1.47a.75.75 0 0 0 1.06 1.061l2.75-2.75a.75.75 0 0 0 0-1.061Z"
				data-color="color-2"
			></path>
		</g>
	</svg>
);
