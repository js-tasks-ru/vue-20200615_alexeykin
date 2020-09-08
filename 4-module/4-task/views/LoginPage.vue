<template>
  <form class="form" v-on:submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          class="form-control"
          v-model="email"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          class="form-control"
          v-model="password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта? <a href="register.html" class="link">Зарегистрируйтесь</a>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    submit() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (this.email && !this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      login(this.email, this.password).then((response) => {
        if (response.error) {
          alert('Неверные учетные данные');
        } else {
          alert(`${response.fullname}`);
        }
      });
    },
  },
};
</script>

<style scoped></style>
