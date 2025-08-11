export const Gmail = ({ size }: { size?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height={size ?? "1em"}
		width={size ?? "1em"}
		viewBox="52 42 88 66"
	>
		<g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
			<path fill="currentColor" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
			<path fill="currentColor" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
			<path
				fill="currentColor"
				d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
			/>
			<path fill="currentColor" d="M72 74V48l24 18 24-18v26L96 92" />
			<path
				fill="currentColor"
				d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
			/>
		</g>
	</svg>
);
