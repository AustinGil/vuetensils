export default {
  bars: `<rect y="30" height="40" x="15" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="35" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.4s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="55" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.2s"   repeatCount="indefinite"></animate>
	</rect>
	<rect y="30" height="40" x="75" width="10">
		<animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="0s"   repeatCount="indefinite"></animate>
	</rect>`,
  // blocks: `<rect x="19" y="19" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="40" y="19" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="61" y="19" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="19" y="40" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="61" y="40" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="19" y="61" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="40" y="61" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s"   calcMode="discrete"></animate>
  // </rect>
  // <rect x="61" y="61" width="20" height="20">
  //   <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s"   calcMode="discrete"></animate>
  // </rect>`,
  // cube: `<g transform="translate(25,25)">
  // 	<rect x="-20" y="-20" width="40" height="40" transform="scale(1.02422 1.02422)">
  // 		<animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.5;1" keyTimes="0;1" dur="1s" keySplines="0 0.5 0.5 1"   begin="-0.3s" repeatCount="indefinite"></animateTransform>
  // 	</rect>
  // </g>
  // <g transform="translate(75,25)">
  // 	<rect x="-20" y="-20" width="40" height="40" transform="scale(1.0456 1.0456)">
  // 		<animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.5;1" keyTimes="0;1" dur="1s" keySplines="0 0.5 0.5 1"   begin="-0.2s" repeatCount="indefinite"></animateTransform>
  // 	</rect>
  // </g>
  // <g transform="translate(25,75)">
  // 	<rect x="-20" y="-20" width="40" height="40" transform="scale(1.10786 1.10786)">
  // 		<animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.5;1" keyTimes="0;1" dur="1s" keySplines="0 0.5 0.5 1"   begin="0s" repeatCount="indefinite"></animateTransform>
  // 	</rect>
  // </g>
  // <g transform="translate(75,75)">
  // 	<rect x="-20" y="-20" width="40" height="40" transform="scale(1.07307 1.07307)">
  // 		<animateTransform attributeName="transform" type="scale" calcMode="spline" values="1.5;1" keyTimes="0;1" dur="1s" keySplines="0 0.5 0.5 1"   begin="-0.1s" repeatCount="indefinite"></animateTransform>
  // 	</rect>
  // </g>`,
  // infinity: `<path d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" stroke-width="7" stroke-dasharray="159.08513549804687 97.50379272460938">
  // 	<animate attributeName="stroke-dashoffset" calcMode="linear" values="0;256.58892822265625" keyTimes="0;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
  // </path>`,
  // gear: `<g transform="translate(50 50)">
  // 	<g transform="rotate(40.9596)">
  // 		<animateTransform attributeName="transform" type="rotate" values="0;360" keyTimes="0;1" dur="4.1s" repeatCount="indefinite"></animateTransform>
  // 		<path d="M37.43995192304605 -6.5 L47.43995192304605 -6.5 L47.43995192304605 6.5 L37.43995192304605 6.5 A38 38 0 0 1 35.67394948182593 13.090810836924174 L35.67394948182593 13.090810836924174 L44.33420351967032 18.090810836924174 L37.83420351967032 29.34914108612188 L29.17394948182593 24.34914108612188 A38 38 0 0 1 24.34914108612188 29.17394948182593 L24.34914108612188 29.17394948182593 L29.34914108612188 37.83420351967032 L18.090810836924184 44.33420351967032 L13.090810836924183 35.67394948182593 A38 38 0 0 1 6.5 37.43995192304605 L6.5 37.43995192304605 L6.500000000000001 47.43995192304605 L-6.499999999999995 47.43995192304606 L-6.499999999999996 37.43995192304606 A38 38 0 0 1 -13.09081083692417 35.67394948182593 L-13.09081083692417 35.67394948182593 L-18.09081083692417 44.33420351967032 L-29.34914108612187 37.834203519670325 L-24.349141086121872 29.173949481825936 A38 38 0 0 1 -29.17394948182592 24.34914108612189 L-29.17394948182592 24.34914108612189 L-37.83420351967031 29.349141086121893 L-44.33420351967031 18.0908108369242 L-35.67394948182592 13.090810836924193 A38 38 0 0 1 -37.43995192304605 6.5000000000000036 L-37.43995192304605 6.5000000000000036 L-47.43995192304605 6.500000000000004 L-47.43995192304606 -6.499999999999993 L-37.43995192304606 -6.499999999999994 A38 38 0 0 1 -35.67394948182593 -13.090810836924167 L-35.67394948182593 -13.090810836924167 L-44.33420351967032 -18.090810836924163 L-37.834203519670325 -29.34914108612187 L-29.173949481825936 -24.34914108612187 A38 38 0 0 1 -24.349141086121893 -29.17394948182592 L-24.349141086121893 -29.17394948182592 L-29.349141086121897 -37.834203519670304 L-18.0908108369242 -44.334203519670304 L-13.090810836924195 -35.67394948182592 A38 38 0 0 1 -6.500000000000005 -37.43995192304605 L-6.500000000000005 -37.43995192304605 L-6.500000000000007 -47.43995192304605 L6.49999999999999 -47.43995192304606 L6.499999999999992 -37.43995192304606 A38 38 0 0 1 13.090810836924149 -35.67394948182594 L13.090810836924149 -35.67394948182594 L18.090810836924142 -44.33420351967033 L29.349141086121847 -37.83420351967034 L24.349141086121854 -29.17394948182595 A38 38 0 0 1 29.17394948182592 -24.349141086121893 L29.17394948182592 -24.349141086121893 L37.834203519670304 -29.349141086121897 L44.334203519670304 -18.0908108369242 L35.67394948182592 -13.090810836924197 A38 38 0 0 1 37.43995192304605 -6.500000000000007 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" >
  // 		</path>
  // 	</g>
  // </g>`,
  ring: `<circle cx="50" cy="50" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
		<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.1s" begin="0s" repeatCount="indefinite"></animateTransform>
	</circle>`,
  ripple: `<circle cx="50" cy="50" r="0" stroke-width="2">
		<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.1" keySplines="0 0.2 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.1" keySplines="0.2 0 0.8 1" begin="-1.05s" repeatCount="indefinite"></animate>
	</circle>
	<circle cx="50" cy="50" r="0" stroke-width="2">
		<animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="2.1" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate>
		<animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2.1" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate>
	</circle>`,
  "dual-ring": `<circle cx="50" cy="50" stroke-linecap="round" r="40" stroke-width="4" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(45.5694 50 50)">
		<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="2.5s" begin="0s" repeatCount="indefinite"></animateTransform>
	</circle>`
  // spin: `<g transform="translate(80,50)">
  // 	<g transform="rotate(0)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="1" transform="scale(1.09611 1.09611)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"       repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
  // 		</circle>
  // 	</g>
  // </g>
  // <g transform="translate(71.21320343559643,71.21320343559643)">
  // 	<g transform="rotate(45)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.875" transform="scale(1.00861 1.00861)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(50,80)">
  // 	<g transform="rotate(90)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.75" transform="scale(1.02111 1.02111)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(28.786796564403577,71.21320343559643)">
  // 	<g transform="rotate(135)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.625" transform="scale(1.03361 1.03361)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(20,50.00000000000001)">
  // 	<g transform="rotate(180)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.5" transform="scale(1.04611 1.04611)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(28.78679656440357,28.786796564403577)">
  // 	<g transform="rotate(225)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.375" transform="scale(1.05861 1.05861)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(49.99999999999999,20)">
  // 	<g transform="rotate(270)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.25" transform="scale(1.07111 1.07111)">
  // 			<animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
  // 		</circle>
  // 	</g>
  // 	</g><g transform="translate(71.21320343559643,28.78679656440357)">
  // 	<g transform="rotate(315)">
  // 		<circle cx="0" cy="0" r="10" fill-opacity="0.125" transform="scale(1.08361 1.08361)">
  // 			<animateTransform attributeName="transform" type="scale" begin="0s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s"     repeatCount="indefinite"></animateTransform>
  // 			<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
  // 		</circle>
  // 	</g>
  // </g>`
}
