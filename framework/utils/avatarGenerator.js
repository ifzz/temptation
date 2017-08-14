import fs from 'fs'
import avatarGen from 'avatar-generator'
import config from '../../config'

const IMAGE_MAGICK_PATH = config.image_magic_install_path

const AVATAR = avatarGen({
  convert: IMAGE_MAGICK_PATH,
})

const PIXEL_SIZE = 90
const AVATAR_PATH = require('path').join(__dirname, '../../public/avatars/')

export default (keyword, gender = 'male', callback) => {
  // 没有try catch 加上也没用 子进程里跑的生成头像 找不到imageMagick必然报错
  let _filepath = `${AVATAR_PATH}${keyword}.png`
  let _fsstream = fs.createWriteStream(_filepath)

  if (callback && typeof callback === 'function') {
    _fsstream.on('close', callback)
  }

  AVATAR(keyword, gender, PIXEL_SIZE)
    .stream()
    .pipe(_fsstream)
}
