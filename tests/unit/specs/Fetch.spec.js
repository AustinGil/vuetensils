import { shallowMount } from "@vue/test-utils";
import Fetch from "@/components/Fetch";

describe("Fetch", () => {
	it("renders props.msg when passed", () => {
		const msg = "new message";
		const wrapper = shallowMount(Fetch, {
			propsData: { msg }
		});
		expect(wrapper.text()).toMatch(msg);
	});
});
