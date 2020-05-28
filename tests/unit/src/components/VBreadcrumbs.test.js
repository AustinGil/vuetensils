import { mount, RouterLinkStub } from "@vue/test-utils";

import VBreadcrumbs from "../../../../src/components/VBreadcrumbs/VBreadcrumbs.vue";

describe("VBreadcrumbs", () => {
  describe("Created", () => {
    const wrapperOptions = (propsData) => ({
      propsData,
      stubs: {
        "router-link": RouterLinkStub
      },
      mocks: {
        $route: {
          matched: []
        }
      }
    });

    test("Renders correctly without props", () => {
      const wrapper = mount(VBreadcrumbs, wrapperOptions());

      expect(wrapper)
        .toMatchSnapshot();
    });

    test("Renders 1 empty crumb", () => {
      const props = {
        breadcrumbs: [{}]
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(props));

      expect(wrapper)
        .toMatchSnapshot();
    });

    test("Renders 1 crumb", () => {
      const props = {
        breadcrumbs: [{
          text: "First",
          path: "/first"
        }]
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(props));

      expect(wrapper)
        .toMatchSnapshot();
    });

    test("Renders 3 crumbs", () => {
      const props = {
        breadcrumbs: [
          {
            text: "First",
            path: "/first"
          },
          {
            text: "Second",
            path: "/second"
          },
          {
            text: "Third",
            path: "/third"
          }
        ]
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(props));

      expect(wrapper)
        .toMatchSnapshot();
    });
  });

  describe("Crumbs from routes", () => {
    const wrapperOptions = (route) => ({
      stubs: {
        "router-link": RouterLinkStub
      },
      mocks: {
        $route: {
          matched: [],
          ...route
        }
      }
    });

    test("Dashboard defaults to home text", () => {
      const route = {
        fullPath: "/dashboard"
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

      expect(wrapper.find("li"))
        .toMatchSnapshot();
    });

    test("Prevent duplicate child routes", () => {
      const route = {
        matched: [
          {
            path: "test",
            parent: {
              path: "test"
            }
          }
        ]
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

      expect(wrapper)
        .toMatchSnapshot();
    });

    test("Prevent duplicate child routes (with trailing slash)", () => {
      const route = {
        matched: [
          {
            path: "test/",
            parent: {
              path: "test"
            }
          }
        ]
      };
      const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

      expect(wrapper)
        .toMatchSnapshot();
    });

    describe("Get text", () => {
      test("From meta title", () => {
        const route = {
          matched: [
            {
              meta: {
                title: "Title"
              }
            }
          ]
        };
        const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

        expect(wrapper)
          .toMatchSnapshot();
      });

      test("From name", () => {
        const route = {
          matched: [
            {
              name: "Name"
            }
          ]
        };
        const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

        expect(wrapper)
          .toMatchSnapshot();
      });

      test("From path", () => {
        const route = {
          matched: [
            {
              path: "records/"
            }
          ]
        };
        const wrapper = mount(VBreadcrumbs, wrapperOptions(route));

        expect(wrapper)
          .toMatchSnapshot();
      });
    });
  });
});
