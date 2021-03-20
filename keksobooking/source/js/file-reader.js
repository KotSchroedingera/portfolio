'use strict'

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const checkFile = (file, types) => {
  for (let type of types) {
    if (file.name.match(type)) {
      return true
    }
  }
  return false;
}

const previewAvatar = config => {
  const {chooser, preview} = config;
  const image = chooser.files[0];
  if (checkFile(image, FILE_TYPES)) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
  }
}

const avatarConfig = {
  chooser: document.querySelector('#avatar'),
  preview: document.querySelector('.ad-form-header__preview img'),
}

avatarConfig.chooser.addEventListener('change', previewAvatar.bind(null, avatarConfig));

const photosConfig = {
  chooser: document.querySelector('#images'),
  preview: document.querySelector('.ad-form__photo'),
}

const previewPhotos = config => {
  const {chooser, preview} = config;
  const photos = chooser.files;
  for (let photo of photos) {
    if (checkFile(photo, FILE_TYPES)) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.addEventListener('load', () => {
        preview.style.width = 'inherit';
        preview.style.display = 'contents';
        preview.insertAdjacentHTML('beforeend',
          `<img style='
          margin-right: 10px;
          margin-bottom: 10px;
          display: inline-block;
          background-color: #e4e4de;
          border-radius: 5px;'
          src='${reader.result}'
          width='70'
          height='70'>`);
      });
    }
  }
}

photosConfig.chooser.addEventListener('change', previewPhotos.bind(null, photosConfig));