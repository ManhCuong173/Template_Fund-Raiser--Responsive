document.addEventListener('DOMContentLoaded', function() {
    const AND_imgs = document.querySelectorAll('.AND_imgs img');
    const IOS_imgs = document.querySelectorAll('.IOS_imgs img');
    const title_imgsDiv = document.getElementsByClassName('title_imgs')[0];
    let slidePosition = 0;
    let maxTwoAlbumLength = AND_imgs.length+ IOS_imgs.length;

    setInterval(() => {
        slidePosition += 1;
        if(slidePosition <= AND_imgs.length) {
            title_imgsDiv.innerHTML = 'Android'
            for (let indexAnd = 0; indexAnd < AND_imgs.length; indexAnd++) {
                AND_imgs[indexAnd].classList.remove('toNextSlide');
            }
            // Index start with 0
            AND_imgs[slidePosition - 1].classList.add('toNextSlide');
        } else {
            title_imgsDiv.innerHTML = 'IOS'
            if(slidePosition <= maxTwoAlbumLength) {
                for (let indexIos = 0; indexIos < IOS_imgs.length; indexIos++) {
                    IOS_imgs[indexIos].classList.remove('toNextSlide');
                }
                IOS_imgs[slidePosition - AND_imgs.length - 1].classList.add('toNextSlide');
            } else slidePosition = 0;
        }
    }, 4000);
}, false);