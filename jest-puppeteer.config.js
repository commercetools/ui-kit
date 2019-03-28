module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  server: {
    command: 'yarn visual-testing-app:serve',
    port: 3001,
  },
};
