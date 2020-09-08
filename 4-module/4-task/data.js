/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.json();
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function register(email, fullname, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    fullname,
    email,
    password,
  });
  return response.json();
}
