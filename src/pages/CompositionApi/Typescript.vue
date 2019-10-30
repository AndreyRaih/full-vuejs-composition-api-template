<template>
  <div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">All values</div>
      <div>Last user: {{state.lastUser}}</div>
      <div>Users count: {{state.usersCount}}</div>
    </div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">Vuex actions and methods</div>
      <div>
        <a :class="$style.link" @click="revertLastUserInList">Revert last user in list</a>
      </div>
    </div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">Still watcher's side effect</div>
      <div>Increment method was making: {{state.sideEffectCount}}</div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.actionsItem {
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.link {
  color: #41b883;
  opacity: 0.5;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transition: 0.2s;
  }
}
</style>

<script lang="ts">
import { reactive, computed, watch, createComponent, SetupContext, Ref } from "@vue/composition-api";

interface IState {
  sideEffectCount: number,
  lastUser: Ref<string>,
  usersCount: Ref<number>
}

export default createComponent({
  setup(props: any, ctx: SetupContext) {
    const $store = ctx.root.$store;
    const state = reactive({
      sideEffectCount: 0,
      lastUser: computed(() => $store.getters['users/usersCountStr']),
      usersCount: computed(() => $store.state.users.users.length)
    } as IState);
    watch(() => state.lastUser, () => {
      state.sideEffectCount++;
    }, { deep: true });
    function revertLastUserInList() {
      $store.dispatch('users/changeUserNameInGetter');
    }
    return {
      state,
      revertLastUserInList
    }
  }
});
</script>