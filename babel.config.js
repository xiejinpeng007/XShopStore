module.exports = {
  //配置 babel 自动按需导入 component 
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  presets: [
    '@vue/app'
  ]

}
