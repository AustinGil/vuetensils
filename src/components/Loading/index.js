import svgs from "../../data/svgs";

const NAME = "vts-loading";

export default {
	name: NAME,
	/**
	 * TODO
	 * size: width / height
	 * stroke: color / width / dasharray
	 * animation: timing
	 */
	props: {
		name: {
			type: String,
			default: 'ripple'
		}
	},
	render: function (create, context) {
		return create(
			"span",
			{
				class: NAME,
				domProps: {
					innerHTML: svgs[this.name]
				},
			}
		);
	}
};
