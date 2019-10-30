<template>
  <div :class="$style.container">
    <div :class="$style.greeting">
      <h1>{{greetingStr}}</h1>
    </div>
    <div :class="$style.visits">It's your {{state.count}} visit</div>
    <div :class="$style.users">
      {{usersCountStr}}
      <div>
        <a :class="$style.link" @click="changeUserNameInGetter()">Change user name</a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  flex-wrap: nowrap

.users, .visits
  text-align: center;
  margin: 8px

.link
  color: #41b883;
  opacity: 0.5;
  transition: 0.2s;
  cursor: pointer;
  margin: 8px;
  &:hover
    color: #41b883;
    opacity: 1;
    transition: 0.2s;

</style>

<script lang="ts">
import { reactive, computed, watch, createComponent, SetupContext } from "@vue/composition-api";

interface IGreetingState {
  firstName: string,
  lastName: string,
  count: number
}

interface IGreetingProps {
  count: number
}

export default createComponent({
  props: {
    count: {
      default: 0
    }
  },
  setup(props: IGreetingProps, ctx: SetupContext) {
    const store = ctx.root.$store;
    const state = reactive({
      firstName: store.state.firstName,
      lastName: store.state.firstName,
      count: props.count
    } as IGreetingState);
    const usersCountStr = computed(() => store.getters['users/usersCountStr'])
    const greetingStr = computed(() => `Hello, ${state.firstName} ${state.lastName}!`)
    const changeUserNameInGetter = () => {
      store.dispatch('users/changeUserNameInGetter')
    }
    return {
      state,
      changeUserNameInGetter,
      greetingStr,
      usersCountStr
    }
  }
});
</script>
