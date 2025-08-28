import { SVGProps } from "react";

export const TasksIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 18 18"
		{...props}
	>
		<g fill="currentColor" className="nc-icon-wrapper">
			<path d="M14.25 4.5h-7A2.75 2.75 0 0 0 4.5 7.25v7A2.75 2.75 0 0 0 7.25 17h7A2.75 2.75 0 0 0 17 14.25v-7a2.75 2.75 0 0 0-2.75-2.75m-.398 4.452-3.397 4.5a.754.754 0 0 1-1.11.097l-1.609-1.5a.75.75 0 0 1 1.022-1.098l1.001.933 2.896-3.836a.751.751 0 0 1 1.197.905Z"></path>
			<path
				d="M2.8 12.748a.75.75 0 0 1-.741-.64L1.03 5.184a2.753 2.753 0 0 1 2.315-3.125l6.924-1.029a2.74 2.74 0 0 1 2.954 1.689.75.75 0 0 1-1.391.561 1.246 1.246 0 0 0-1.343-.767l-6.923 1.03a1.25 1.25 0 0 0-1.053 1.42l1.029 6.924a.75.75 0 0 1-.742.86Z"
				data-color="color-2"
			></path>
		</g>
	</svg>
);
