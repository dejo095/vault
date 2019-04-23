const isEmail = [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
];

const isNotEmpty = [
    v => !!v || 'Must not be empty',
];

export {
  isEmail,
  isNotEmpty
}
