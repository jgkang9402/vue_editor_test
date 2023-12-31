// import Vue from "vue";
// import App from "./App.vue";

// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");
import Vue from "vue";
import App from "./App.vue";

import Vue2Editor from "vue2-editor";

import ElementTiptapPlugin from "element-tiptap";
import "element-tiptap/lib/index.css";
import ElementUI, {
  Button,
  // layout
  Container,
  Footer,
  Header,
  Main,
} from "element-ui";

// Vue.use(vuedraggable);
Vue.use(Vue2Editor);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Button);
Vue.use(ElementUI);
// Vue.use(ElementTiptapPlugin);
Vue.use(ElementTiptapPlugin, {
  lang: "ko",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

// import Vue from "vue";
// import App from "./App.vue";
// import ElementUI from "element-ui";
// import ElementTiptapPlugin from "element-tiptap";

// import "element-ui/lib/theme-chalk/index.css";
// import "element-tiptap/lib/style.css";

// Vue.use(ElementUI);
// Vue.use(ElementTiptapPlugin);

// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");
