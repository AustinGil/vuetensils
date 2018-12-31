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

	model: {
		prop: "showing",
		event: "change"
	},
	props: ['showing'],

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
		onEsc (event) {
			if (event.keyCode === keycodes.ESC) {
				this.hide();
			}
		},
		trapFocus (event) {
			if (event.keyCode === 9) {
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

	mounted () {
		document.addEventListener("keydown", this.onEsc);

	},

	destroyed () {
		document.removeEventListener("keydown", this.onEsc);
	},

	render (create) {
		const overlay = create(
			'span',
			{
				class: `${NAME}__overlay`,
				on: {
					click: () => {
						this.hide();
					},
				}
			}
		)

		const content = create(
			"div",
			{
				ref: "content",
				class: `${NAME}__content`,
				attrs: {
					tabindex: "-1"
					// 'aria-label': "submenu"
				},
				on: {
					keydown: this.trapFocus
				}
			},
			[this.$slots.default]
		);

		let drawer = create(false)
		if (this.showing) {
			drawer = create(
				"aside",
				{
					class: NAME
				},
				[overlay, content]
			)
		}

		return drawer;
	}
};
