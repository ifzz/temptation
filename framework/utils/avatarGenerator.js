import fs from 'fs'
import avatarGen from 'avatar-generator'
import config from '../../config'

const IMAGE_MAGICK_PATH = config.image_magic_install_path

// avatar generator
const AVATAR = avatarGen({
  convert: IMAGE_MAGICK_PATH,
})

const PIXEL_SIZE = 90
const AVATAR_PATH = require('path').join(__dirname, '../../public/avatars/')

export default (keyword, gender = 'male') => new Promise((resolve, reject) => {
  let _filepath = `${AVATAR_PATH}${keyword}.png`
  let _fsstream = fs.createWriteStream(_filepath)

  _fsstream.on('close', resolve)
  _fsstream.on('error', reject)

  AVATAR(keyword, gender, PIXEL_SIZE)
    .stream()
    .pipe(_fsstream)
})
