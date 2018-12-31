import keycodes from '../../data/keycodes'
import "./styles.css";

const NAME = "vts-drawer";
const FOCUSABLE = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'button:not([disabled]):not([aria-hidden])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])'
]

export default {
	name: NAME,

	props: {
		showing: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: null
		}
	},
	model: {
		prop: "showing",
		event: "change"
	},

	methods: {
		show () {
			this.$emit('open')
			this.$emit('change', true)
		},
		hide () {
			this.$emit('close')
			this.$emit('change', false)
		},
		toggle () {
			const event = this.showing ? 'close' : 'open'
			this.$emit(event, !this.showing)
			this.$emit('change', !this.showing)
		},
		onKeydown (event) {
			if (event.keyCode === keycodes.ESC) {
				this.hide();
			}
			if (event.keyCode === keycodes.TAB) {
				const content = this.$refs.content;
				const focusable = Array.from(content.querySelectorAll(FOCUSABLE));

				if (this.visible && content && !content.contains(document.activeElement) && focusable) {
					event.preventDefault()
					focusable[0].focus();
				} else {
					const focusedItemIndex = focusable.indexOf(document.activeElement)

					if (event.shiftKey && focusedItemIndex === 0) {
						focusable[focusable.length - 1].focus()
						event.preventDefault()
					}

					if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
						focusable[0].focus()
						event.preventDefault()
					}
				}
			}
		}
	},

	watch: {
		showing: {
			handler: function (next, prev) {
				if (next === true && next != prev) {
					this.$nextTick(() => {
						this.$refs.content.focus();
					});
				}
			}
		}
	},

	render (create) {
		if (!this.showing) {
			return create(false)
		}

		const content = create("aside",
			{
				ref: "content",
				class: `${NAME}__content`,
				style: {
					width: this.width || null,
					maxWidth: this.maxWidth || null,
				},
				attrs: {
					tabindex: "-1"
					// 'aria-label': "submenu"
				}
			},
			[this.$slots.default]
		);

		const drawer = create("div",
			{
				class: NAME,
				on: {
					click: event => {
						if (event.target.classList.contains(`${NAME}`)) {
							this.hide();
						}
					},
					keydown: this.onKeydown
				}
			},
			[content]
		)

		return drawer;
	}
};
