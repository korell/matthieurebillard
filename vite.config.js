import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import basicSsl from '@vitejs/plugin-basic-ssl'
console.log(process.env.NODE_ENV);

const config = {
  plugins: [
    vue(),
  ]
}

if(process.env.NODE_ENV === 'development') {
  config.server = {
    https: {
      key: fs.readFileSync('/Users/hyperclub/ca/certificat.key'),
      cert: fs.readFileSync('/Users/hyperclub/ca/certificat.crt')
    }
  }
  //config.plugins.push(basicSsl())
}

// https://vitejs.dev/config/
export default defineConfig(config)
