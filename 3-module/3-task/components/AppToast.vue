<template>
  <div class="toasts">
    <div
      v-for="message in messageList"
      :key="message.key"
      :class="{
        toast: message.type,
        toast_success: message.type === 'SUCCESS',
        toast_error: message.type === 'ERROR',
      }"
    >
      <app-icon
        v-if="message.type"
        :icon="message.type === 'SUCCESS' ? 'check-circle' : 'alert-circle'"
      />
      <span v-if="message.type">{{ message.text }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data() {
    return {
      defaultList: [],
    };
  },

  computed: {
    messageList() {
      return this.defaultList;
    },
  },

  methods: {
    error(message) {
      const newMessageList = [
        ...this.defaultList,
        {
          type: 'ERROR',
          text: message,
          key: this.defaultList.length,
        },
      ];
      this.defaultList = newMessageList;
      this.hideMessage(newMessageList.length - 1);
    },

    success(message) {
      const newMessageList = [
        ...this.defaultList,
        {
          type: 'SUCCESS',
          text: message,
          key: this.defaultList.length,
        },
      ];
      this.defaultList = newMessageList;
      this.hideMessage(newMessageList.length - 1);
    },

    hideMessage(index) {
      const self = this;
      setTimeout(function () {
        const newDefaultList = [...self.defaultList];
        newDefaultList[index] = {
          ...newDefaultList[index],
          type: '',
        };
        self.defaultList = newDefaultList;
      }, DELAY);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
