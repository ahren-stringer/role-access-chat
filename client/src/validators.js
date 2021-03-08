export const required = value => (value || typeof value === 'number' ? undefined : 'Обязательное поле')

export const minLength = min => value =>
  value && value.length < min ? `Пароль должен содержать не мение ${min} символов` : undefined

export const minLength6 = minLength(6)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Некорректный e-mail адрес'
    : undefined

export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined