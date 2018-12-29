// https://github.com/heavyy/vue-intersect

const NAME = 'vts-intersection'

export default {
	name: NAME,
	abstract: true,
	props: {
		threshold: {
			type: Array,
			required: false,
			default: () => [0, 0.2]
		},
		root: {
			type: String,
			required: false,
			default: () => null
		},
		rootMargin: {
			type: String,
			required: false,
			default: () => "0px 0px 0px 0px"
		}
	},
	created () {
		this.observer = new IntersectionObserver(
			entries => {
				if (!entries[0].isIntersecting) {
					this.$emit("leave", [entries[0]]);
				} else {
					this.$emit("enter", [entries[0]]);
				}

				this.$emit("change", [entries[0]]);
			},
			{
				threshold: this.threshold,
				root: this.root,
				rootMargin: this.rootMargin
			}
		);
	},
	mounted () {
		this.$nextTick(() => {
			if (this.$slots.default && this.$slots.default.length > 1) {
				warn(
					"[Vuetensils:Intersect] You may only wrap one element in a <intersect> component."
				);
			} else if (!this.$slots.default || this.$slots.default.length < 1) {
				warn(
					"[Vuetensils:Intersect] You must have one child inside a <intersect> component."
				);
				return;
			}

			this.observer.observe(this.$slots.default[0].elm);
		});
	},
	destroyed () {
		this.observer.disconnect();
	},
	render () {
		return this.$slots.default ? this.$slots.default[0] : null;
	}
};
