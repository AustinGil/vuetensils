export default {
  bars: `<rect y="30" height="40" x="15" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.5" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="35" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.5" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.4s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="55" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.5" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.2s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="75" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1.5" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="0s"   repeatCount="indefinite"></animate>
  </rect>`,
  //   dots: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
  //   <circle transform="translate(8 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  //   <circle transform="translate(16 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  //   <circle transform="translate(24 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  // </svg>`,
  ring: `<circle cx="50" cy="50" stroke-width="5" r="45" stroke-dasharray="164.93361431346415 56.97787143782138">
		<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5" begin="0s" repeatCount="indefinite"></animateTransform>
	</circle>`,
  ripple: `<circle cx="50" cy="50" r="0" stroke-width="2">
		<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2" keySplines="0 0.2 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2" keySplines="0.2 0 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
	</circle>
	<circle cx="50" cy="50" r="0" stroke-width="2">
		<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate>
	</circle>`,
  "dual-ring": `<circle cx="50" cy="50" stroke-linecap="round" r="40" stroke-width="4" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(45.5694 50 50)">
		<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5" begin="0s" repeatCount="indefinite"></animateTransform>
  </circle>`
  //   spin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
  //   <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
  //   <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
  //     <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
  //   </path>
  // </svg>`
}
