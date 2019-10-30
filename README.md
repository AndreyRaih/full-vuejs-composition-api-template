# Full VueJS template with Vue Composition Api

This template received base realization from this project: https://github.com/AndreyRaih/simple-vue-ssr-ts-template

But I added several examples, which were appropriate for the base template.
In this repo, you can see the main ideas of a new approach to organization Vue components with last updates of Vue Composition API, and new options from types definition, without decorators.

More information about Vue Composition API RFC: https://vue-composition-api-rfc.netlify.com

So, I decided to create this boilerplate from developers to developers.
I hope that it will be helpful for somebody.

It includes:

### Server-side rendering (SSR)

It helps to user to receive content faster. Also, it improves SEO.
You can read official docs, if you need use SSR: https://ssr.vuejs.org/

### SSR Prefetch Data with asyncData 

The template has augmentation asyncData for preload data before sending a view to the client.
ATTENTION: asyncData is not lifecycle hook 

### Extented vue-property-decorators with asyncData hooks, title and etc

In this template, you have some fixes with prefetch features in components, which worked with troubles in Vue + Vuex + TypeScript realizations without Nuxt.js.

You have extensions in `vue-shims.d.ts` file:

```
declare module "*.vue" {
  import Vue, { ComponentOptions } from "vue";
  import { Store } from "vuex";
  import { Route } from 'vue-router';
  export interface AsyncDataContext {
    store?: Store<any>,
    route?: Route
  }
  module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
      asyncData?: (context: AsyncDataContext) => Promise<any>;
      title?: string
    }
  }
  export default Vue
}
```

And register new hooks in `utils/class-components-augumentation.ts`:

```
Component.registerHooks([
  'asyncData',
  'beforeRouteUpdate'
]);
```


### Single page application

In this boilerplate, we use Vue-Router for routing without full reload pages.
Official docs: https://router.vuejs.org/

### Vuex state management

State management pattern. Represents centralized store for all the components in an application. 

More: https://vuex.vuejs.org

### CSS/Stylus modules

System for modularizing and composing CSS. You can use it as:
```html
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

```html

And remember, that you can use `Stylus`!
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>
```

And result class will be shown like `.red_<hash>`.

More: https://vue-loader.vuejs.org/guide/css-modules.html#usage

### Code-splitting

In this boilerplate you doesn't have one huge js bundle, 
but you have one main bundle a few small bundles for each page.
It allows not to load unnecessary code for current page.

What about TS support:
Code-splitting will be work correctly, only with property `module: esNext` in tsconfig.json

For example:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "esNext",
    ...
  }
  ...
}
```

### Easy and customizable build for local development and production

Boilerplate has a base webpack config and different configs for client and server.
Production build has minified css and js bundles with hash in name for caching static in browser.

Also, there is a convenient html template where you can put your common html code.


## How to use it

To start environment for local development, use:
```
yarn run dev
```
**If you run it the first time, you'll get error, that server bundle wasn't found. 
It's normal. Just re-run this task.**

To production build, use (assets will be served from `dist` folder):
```
yarn run build
```

To run server side, use:
```
yarn run start
```

Application will be available on http://localhost:8080/ 

___

Thank you and good luck!
