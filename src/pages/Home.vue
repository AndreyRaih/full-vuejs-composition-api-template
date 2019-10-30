<template>
  <div :class="$style.home">
    <img alt="Vue logo" src="../public/logo.png">
    <Greeting :count="state.visitCounter" />
    <a :class="$style.link" @click="$router.push('compositionApi')">Go to Composition API page</a>
  </div>
</template>

<style module>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  height: calc(100vh - 110px);
}

.link {
  color: #41b883;
  opacity: 0.5;
  transition: 0.2s;
  cursor: pointer;
  margin: 8px;
}
.link:hover {
  color: #41b883;
  opacity: 1;
  transition: 0.2s;
}
</style>

<script lang="ts">
import { createComponent, onBeforeMount, reactive, SetupContext } from '@vue/composition-api';
import { AsyncDataContext } from '*.vue';

export default createComponent({
  title: 'Home Page App',
  name: 'Home',
  async asyncData (ctx: AsyncDataContext) {
    await ctx.store.dispatch('users/fetchData');
  },
  components: {
    Greeting: () => import('../components/Greeting.vue')
  },
  setup (props: any, ctx: SetupContext) {
    const state = reactive({
      visitCounter: null
    })
    onBeforeMount (() => {
      state.visitCounter = getVisitData();
      updateVisitData(state.visitCounter);
    })
    function getVisitData () {
      const savedValue = localStorage ? localStorage.getItem('visit') : null;
      return savedValue ? parseInt(savedValue) : 0;
    }
    function updateVisitData (count: number) {
      const visit = count + 1;
      localStorage.setItem('visit', visit.toString());
    }
    return {
      state
    }
  }
});
</script>
