const galleryImageModal = document.querySelector('.gallery-image-modal')
const galleryBtClose = galleryImageModal.querySelector('.bt-close')
const galleryBtNext = galleryImageModal.querySelector('.bt-next')
const galleryBtPrev = galleryImageModal.querySelector('.bt-prev')
const galleryContent = galleryImageModal.querySelector('.content')
const imgs = document.querySelectorAll('.gallery img')

let nextImg = null
let prevImg = null


galleryBtClose.addEventListener('click', () => {
  galleryImageModal.close()
})

galleryBtNext.addEventListener('click', () => {
  galleryImageModal.close()
  if (nextImg) {
    nextImg.click()
  }
})

galleryBtPrev.addEventListener('click', () => {
  galleryImageModal.close()
  if (prevImg) {
    prevImg.click()
  }
})

imgs.forEach(img => {
  img.addEventListener('click', () => {

    nextImg = img.parentNode.nextElementSibling 
      ? img.parentNode.nextElementSibling.querySelector('img') 
      : null

    prevImg = img.parentNode.previousElementSibling 
      ? img.parentNode.previousElementSibling.querySelector('img') 
      : null

    galleryContent.innerHTML = `<img src="${img.src}">`
    galleryImageModal.showModal()
  })
})
