export default {
	ring: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<circle cx="50" cy="50" fill="none" stroke="currentColor" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
			<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.1s" begin="0s" repeatCount="indefinite"></animateTransform>
		</circle>
	</svg>`,
	ripple: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<circle stroke="currentColor" cx="50" cy="50" r="0" fill="none" stroke-width="2">
			<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.1" keySplines="0 0.2 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
			<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.1" keySplines="0.2 0 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
		</circle>
		<circle stroke="currentColor" cx="50" cy="50" r="0" fill="none" stroke-width="2">
			<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.1" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate>
			<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.1" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate>
		</circle>
	</svg>`
}
