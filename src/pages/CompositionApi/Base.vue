<template>
  <div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">State values</div>
      <div>Count: {{state.count.toString()}}</div>
    </div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">Computed values</div>
      <div>Double count: {{state.double.toString()}}</div>
    </div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">Methods</div>
      <div>
        <a :class="$style.link" @click="increment">Increment</a>
      </div>
    </div>
    <div :class="$style.actionsItem">
      <div :class="$style.title">Watcher's side effect</div>
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

<script>
import { reactive, computed, watch } from "@vue/composition-api";
export default {
  setup() {
    const state = reactive({
      sideEffectCount: 0,
      count: 0,
      double: computed(() => state.count * 2)
    });
    watch(
      () => state.count,
      () => {
        state.sideEffectCount++;
      }
    );
    function increment() {
      state.count++;
    }
    return {
      state,
      increment
    }
  }
};
</script>