module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin', // Deve vir antes ou sozinho dependendo da estrutura, mas precisa estar presente
  ],
};
 
