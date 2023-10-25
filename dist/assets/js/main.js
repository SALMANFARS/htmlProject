tippy('.h-dropdown', {
    trigger: 'click',
    
    arrow: false,
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    allowHTML: true,

   
});


tippy('.q-lang-container', {
    trigger: 'mouseenter',
    
    placement: 'right-start',
    arrow: true,
    
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    allowHTML: true,

   
});



let activeTippy;
let filterList, filterWrapperList;
const tippyClosePanel = document.querySelector('.tippy-close-panel');
const tippyCloseBtn = document.querySelector('.tippy-close-btn');
const tippyTemplateContainer = document.querySelector('.tippy-templates');
const mobQuickResetFilters = document.querySelector('.q-filter-reset-all');




if (mobQuickResetFilters){
    mobQuickResetFilters.addEventListener('click', function(){
        activeTippy.forEach( tippy => {
            tippy.hide();
        } )

        const filterResetButtons = document.querySelectorAll('.filter-products__btn-reset');

        if (filterResetButtons.length){
            filterResetButtons.forEach( reset => {
                reset.click();
            } )
        }
    });
}

qFilterBtns = document.querySelectorAll('.q-tippy-filter');
if ( qFilterBtns.length ){
    qFilterBtns.forEach(btn => {
        btn.addEventListener('click', function(){
            activeTippy.forEach( tippy => {
                tippy.hide();
            } )
        })
    })
}


tippyCloseBtn.addEventListener('click', function(){
    activeTippy.forEach( tippy => {
        tippy.hide();
    } )
})



activeTippy = tippy('.q-tippy-filter', {
    trigger: 'click',
    hideOnClick: false,
    arrow: false,
    placement: 'bottom-start',
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    allowHTML: true,

    onShow(instance) {    
        
        activeTippy.forEach( tippy => {
            tippy.hide();
        } )

        linkToList  = instance.reference.getAttribute('data-list');
        filterWrapperList = document.getElementById(linkToList);
        filterList = filterWrapperList.querySelector('ul');
        const popperContainer = instance.popper.querySelector('.filters-tippy');
        popperContainer.append(tippyClosePanel);
        popperContainer.append(filterList);
        
    },
    onHide(instance){
        filterWrapperList.append(filterList);
        tippyTemplateContainer.append(tippyClosePanel);
        
    }
});


tippy('[data-template=profile-drop-list]', {
    trigger: 'click',
    arrow: false,
    content(reference) {
        const id = reference.getAttribute('data-template');
        const template = document.getElementById(id);
        return template.innerHTML;
      },
      placement: 'top-end',
      offset: [10, 10],
    allowHTML: true,

    onShow(instance) {
        let container = instance.reference;
        container.classList.add('active');
        
        document.body.style.maxWidth = document.documentElement.clientWidth + 'px';
        document.body.classList.add('no-scroll');
        
        
    },
    onHide(instance) {
        let container = instance.reference;
        container.classList.remove('active');
        document.body.style.maxWidth = '';
        document.body.classList.remove('no-scroll');
    },
})

  

document.addEventListener('click', function(event){
    if ( event.target.classList.contains('header-drop-list__item') ) {
        let value = event.target.innerHTML;
        let parent = event.target.closest('.header-drop-list');
        let targetDropLink = parent.getAttribute('data-target');
        
        
        let targetDropBtns = document.querySelectorAll('[data-type="'+targetDropLink+'"]');
        if ( targetDropBtns.length ){

            targetDropBtns.forEach( dropBtn => {
                dropBtn.querySelector('.h-dropdown__current').innerHTML = value;
            } );

        }

        switch ( targetDropLink ){            

            case "currency":             
                document.dispatchEvent(new CustomEvent("changeCurrency", {
                    detail: { name: value }
                }));
            
            break;

            case "lang": 
                document.dispatchEvent(new CustomEvent("changeLang", {
                    detail: { name: value }
                })); 
            
            break;
        }


    }
})


document.addEventListener('changeCurrency', function(event){
    console.log(event.detail)
})
document.addEventListener('changeLang', function(event){
    console.log(event.detail)
})


const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mob-menu');
const closeMobMenu = document.querySelector('.mob-menu__close');
const btnAlert = document.querySelector('.user-alert');
const alertMessages = document.querySelector('.alert-messages');
const header = document.querySelector('.header');

/*******************/

const searchFormWithHint = document.querySelector('.h-search-form');
const searchInputWithHint = document.querySelector('.h-search-form__input');
const searchHintsList = document.querySelector('.search-hints');
const searchHints = document.querySelectorAll('.search-hint');
const searchNoResult = document.querySelector('.search-hints .search-no-result');

function mobMenuSetActive(){
    mobMenu.classList.add('active');
    alertHide();
    document.body.classList.add('no-scroll');
    
}
function mobMenuHide(){
    mobMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}
function alertSetActive(){
    btnAlert.classList.add('active');

    let rect = btnAlert.getBoundingClientRect();
    
    alertMessages.style.left = rect.left + btnAlert.offsetWidth + 'px';

    alertMessages.style.top = (header.offsetHeight + 8) +  'px'


    mobMenuHide();
    

    document.body.style.maxWidth = document.documentElement.clientWidth + 'px';

    document.body.classList.add('no-scroll');
    
}
function alertHide(){
    btnAlert.classList.remove('active');
    document.body.style.maxWidth = '';
    document.body.classList.remove('no-scroll');
}

hamburger.addEventListener('click', mobMenuSetActive);
closeMobMenu.addEventListener('click', mobMenuHide)





btnAlert.addEventListener('click', function(event){
    if ( !this.classList.contains('active') ){
        alertSetActive();
    } else{

        let test = event.target.closest('.alert-messages');
        

        if ( !test  ){
            alertHide();
        } else{
            let closeBtnTest = event.target.closest('.alert-messages__hide');
            if ( closeBtnTest ) alertHide();
        }
        
        
    }
});


window.addEventListener('resize', function(){
    if ( btnAlert.classList.contains('active') ){
        let rect = btnAlert.getBoundingClientRect();
    
        alertMessages.style.left = rect.left + btnAlert.offsetWidth + 'px';

        alertMessages.style.top = (header.offsetHeight + 8) +  'px'
    }
})


function showSearchHintsList(){
    searchHintsList.classList.add('active');
    searchFormWithHint.classList.add('active');

    if ( !document.body.classList.contains('no-scroll') ){
        document.body.style.maxWidth = document.documentElement.clientWidth + 'px';
    }
    
    document.body.classList.add('no-scroll');


    
}

function hideSearchHintsList(){
    searchHintsList.classList.remove('active');
    searchFormWithHint.classList.remove('active');
    document.body.style.maxWidth = '';
    document.body.classList.remove('no-scroll');
}

if ( searchInputWithHint && searchHintsList ){
    searchInputWithHint.addEventListener('focus', function(){

        let searchString = this.value;
        let regexp = new RegExp(`${searchString}`, 'i')
        if ( searchString.length > 2 ){
            let searchCount = 0;

            searchHints.forEach( hint => {
                let searchVariants = hint.innerHTML;

                if ( regexp.test(searchVariants) ){
                    hint.classList.add('active');
                    searchCount++;
                } else{
                    hint.classList.remove('active');
                }
            })
            showSearchHintsList();
            

            if ( searchCount < 1 ){
                searchNoResult.classList.add('active')
            } else{
                searchNoResult.classList.remove('active');
            }
        }
        

    })
    searchInputWithHint.addEventListener('blur', function(){

        setTimeout(() => {
            hideSearchHintsList(); 
        }, 300);
        
    })
    searchInputWithHint.addEventListener('input', function(){
        
        let searchString = this.value;
        let regexp = new RegExp(`${searchString}`, 'i')


        



        if ( searchString.length > 2 ){

            let searchCount = 0;

            searchHints.forEach( hint => {
                let searchVariants = hint.innerHTML;
                console.log(searchVariants);
                if ( regexp.test(searchVariants) ){
                    hint.classList.add('active');
                    searchCount++;
                } else{
                    hint.classList.remove('active');
                }
            })

            showSearchHintsList();

            if ( searchCount < 1 ){
                searchNoResult.classList.add('active')
            } else{
                searchNoResult.classList.remove('active');
            }

        } else{
            hideSearchHintsList();
        }


    })


    searchHints.forEach( hint => {
        hint.addEventListener('click', function(){
            let value = this.innerHTML;
            searchHintsList.classList.remove('active');
            searchFormWithHint.classList.remove('active');
            searchInputWithHint.value = value

        })
    })
}



/* Инициализация слайдеров на карточках товара */

let productCardGalleries = document.querySelectorAll('.product-card-gallery');




if ( productCardGalleries.length ){
    console.log(productCardGalleries);


  productCardGalleries.forEach(itemSlider => {
    const slider = new Swiper(itemSlider, {
      
      spaceBetween: 10,
  
      pagination: {
        el: itemSlider.querySelector('.product-card-gallery__pagination'),
        clickable: true,
      },
    });
    itemSlider.addEventListener('mousemove', function(event){
      
        if (this.classList.contains('moved')) return false;
        
        
        const xPosition = event.offsetX==undefined?event.layerX:event.offsetX

        const current = slider.activeIndex;
        const count = slider.slides.length;
        const step =  100 / count;
        
        
        const position  = (xPosition / this.offsetWidth) * 100;
        
        const movePosition = Math.trunc(position / step);
        
        if ( movePosition > count ) return false;
        if ( movePosition < 0 ) return false;

        if ( movePosition === current ) return false
        
        slider.slideTo(movePosition, 0, function(){})
        this.classList.add('moved');
        setTimeout(()=>{
          this.classList.remove('moved');
        }, 50)
      

    }, {capture: true})
  });

 

}

const filterProducts = document.querySelector('.filter-products');
const filterAccorderonButtons = document.querySelectorAll('.filter-products__accordeon-btn');
const filterResetButtons = document.querySelectorAll('.filter-products__btn-reset');
const defaultFilterCheckboxes = document.querySelectorAll("input[type = 'checkbox'][data-role = 'default']");
const no__DefaultFilterCheckboxes = document.querySelectorAll("input[type = 'checkbox']:not([data-role='default'])");
const btnRollBlock = document.querySelectorAll('.filter-roll-block__btn');



function deploySpoiler(group, content, h, dur = 500){
    anime({
        targets: content,
        height: h,
        duration: dur,
        delay: 0,
        easing: 'linear',
        begin: function(anim) {
            group.setAttribute('data-state', 'animated-deploy'); 
        },
        complete: function(anim) {
            group.setAttribute('data-state', 'deploy'); 
            content.style.height = 'auto';
        }
    });
}

function rollFilterAccordeon(group, content, dur = 500){
    anime({
        targets: content,
        height: 0,
        duration: dur,
        delay: 0,
        easing: 'linear',
        begin: function(anim) {
            group.setAttribute('data-state', 'animated-rolled');            
        },
        complete: function(anim) {
            group.setAttribute('data-state', 'rolled');           
            
        }
    });
}


if ( filterAccorderonButtons.length && filterResetButtons.length ){
    
    filterAccorderonButtons.forEach( btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();
            
            
            let group = this.closest('.filter-p-group');
            
            let groupBody = group.querySelector('.filter-p-group__body');
            let groupBodyInner = group.querySelector('.filter-p-group__body--inner');
            

            if (  group.getAttribute('data-state') === 'rolled' ){
                let height = groupBodyInner.offsetHeight;
                deploySpoiler(group, groupBody, height)
            } else if (  group.getAttribute('data-state') === 'animated-rolled' || group.getAttribute('data-state') === 'animated-deploy'){
                return false;
            } else{
                let height = groupBodyInner.offsetHeight;
                groupBody.style.height = height + 'px';
                rollFilterAccordeon(group, groupBody);
            }
            
        })
    } )


    filterResetButtons.forEach(  btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();
            
            let target = this.getAttribute('data-target');

           switch ( target ){
                case 'all': 
                    defaultFilterCheckboxes.forEach( cb  => {
                        if ( !cb.checked) {
                            cb.checked = true;
                        }
                    });
                    
                    no__DefaultFilterCheckboxes.forEach( ndefaultCB => {
                        ndefaultCB.checked = false;
                    } );
                break; 
                case 'group':   
                    let parent = this.closest('.filter-p-group');
                    let defaultCheckbox = parent.querySelector("input[type = 'checkbox'][data-role='default']");
                    defaultCheckbox.checked = true;
                    let noDefaultCheckbox = parent.querySelectorAll("input[type = 'checkbox']:not([data-role='default'])");
                    noDefaultCheckbox.forEach( ndefaultCB => {
                        ndefaultCB.checked = false;
                    } )
                break; 
           }
        })
    } )
}





if ( defaultFilterCheckboxes.length &&  no__DefaultFilterCheckboxes.length ){
    
    
    defaultFilterCheckboxes.forEach( cb => {
        cb.addEventListener('change',  function(){
            if ( this.checked ) {
                let parent = this.closest('.filter-checkbox-list');
                let noDefaultCheckbox = parent.querySelectorAll("input[type = 'checkbox']:not([data-role='default'])");
                noDefaultCheckbox.forEach( ndefaultCB => {
                    ndefaultCB.checked = false;
                } )
            }
        })
    } );


    no__DefaultFilterCheckboxes.forEach( cb => {
        cb.addEventListener('change',  function(){
            let parent = this.closest('.filter-checkbox-list');
            let defaultCheckbox = parent.querySelector("input[type = 'checkbox'][data-role='default']");
            if ( this.checked ) {
                
                
                defaultCheckbox.checked = false;
            } else {
                let checkedCheckboxes = parent.querySelectorAll("input[type = 'checkbox']:checked");
                if ( checkedCheckboxes.length === 0){
                    defaultCheckbox.checked = true;
                }
            }
        })
    })

}

if ( btnRollBlock.length ){

    btnRollBlock.forEach( btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();
            let parent =  this.closest('.filter-roll-block');

            let content  = parent.querySelector('.filter-roll-block__content');
            let contentInner = parent.querySelector('.filter-roll-block__content');
            


            let state = parent.getAttribute('data-state')
            if (!state || state === "rolled") {
                let height = contentInner.offsetHeight;
                content.style.height  = "0px";
                deploySpoiler(parent, content, height)
            } else{
                let height = contentInner.offsetHeight;
                content.style.height = height + 'px';
                rollFilterAccordeon(parent, content);
            }
        });
    } )

}

const filterPrices = document.querySelector('#filter-prices');
const sliderMinTextValue = document.querySelector('.slider-range-values__min');
const sliderMaxTextValue = document.querySelector('.slider-range-values__max');


const sliderImageWidth = document.querySelector('#image-width');
const imageWidthValue = document.querySelector('#image-width-value');

const sliderImageHeight = document.querySelector('#image-height');
const imageHeightValue = document.querySelector('#image-height-value');

const sliderImageScale = document.querySelector('#image-scale');
const imageScaleValue = document.querySelector('#image-scale-value');

const sliderImageSteps = document.querySelector('#image-steps');
const imageStepsValue = document.querySelector('#image-steps-value');



if ( sliderImageWidth ){
    let _min = Number( sliderImageWidth.getAttribute('data-min') );
    let _max = Number( sliderImageWidth.getAttribute('data-max')) ;

    let imageWidth = noUiSlider.create(sliderImageWidth, {
        start: [_min],
        connect: [true, false] ,
        step: 1,
        range: { min: _min, max: _max },
    
    });

    imageWidth.on('update', function () { 
        let range = this.get('range');
        document.querySelector('#input-image-width').value = Math.trunc(range);
        imageWidthValue.innerHTML = Math.trunc(range) + 'px';

    });
}

if ( sliderImageHeight ){
    let _min = Number( sliderImageHeight.getAttribute('data-min') );
    let _max = Number( sliderImageHeight.getAttribute('data-max')) ;

    let imageHeight = noUiSlider.create(sliderImageHeight, {
        start: [_min],
        connect: [true, false] ,
        step: 1,
        range: { min: _min, max: _max },
    
    });

    imageHeight.on('update', function () { 
        let range = this.get('range');
        document.querySelector('#input-image-height').value = Math.trunc(range);
        imageHeightValue.innerHTML = Math.trunc(range) + 'px';

    });
}

if ( sliderImageScale ){
    let _min = Number( sliderImageScale.getAttribute('data-min') );
    let _max = Number( sliderImageScale.getAttribute('data-max')) ;

    let imageScale = noUiSlider.create(sliderImageScale, {
        start: [_min],
        connect: [true, false] ,
        step: 0.1,
        range: { min: _min, max: _max },
    
    });

    imageScale.on('update', function () { 
        let range = this.get('range');
        document.querySelector('#input-image-scale').value = range.toFixed(1);
        imageScaleValue.innerHTML =  range.toFixed(1);

    });
}

if ( sliderImageSteps ){
    let _min = Number( sliderImageSteps.getAttribute('data-min') );
    let _max = Number( sliderImageSteps.getAttribute('data-max')) ;

    let imageSteps = noUiSlider.create(sliderImageSteps, {
        start: [_min],
        connect: [true, false] ,
        step: 1,
        range: { min: _min, max: _max },
    
    });

    imageSteps.on('update', function () { 
        let range = this.get('range');
        document.querySelector('#input-image-steps').value = range.toFixed(0);
        imageStepsValue.innerHTML =  range.toFixed(0);

    });
}


if (filterPrices){

    let _min = Number( filterPrices.getAttribute('data-min') );
    let _max = Number( filterPrices.getAttribute('data-max')) ;

    let filterPriceSlider = noUiSlider.create(filterPrices, {
        start: [_min, _max],
        connect: true,
        step: 1,
        range: { min: _min, max: _max },
        
        
       
    });

    filterPriceSlider.on('update', function () { 
        let range = this.get('range');

        sliderMinTextValue.innerHTML = Math.trunc(range[0]);
        sliderMaxTextValue.innerHTML = Math.trunc(range[1]);
    });
}

const showMobFilter = document.querySelector('.show-products-filter');
const hideFilterProducts =  document.querySelector('.filter-products__hide');
if ( showMobFilter ){
    showMobFilter.addEventListener('click', function(){
        document.body.classList.add('no-scroll');
        filterProducts.classList.add('active')
    })

    hideFilterProducts.addEventListener('click', function(event){
        event.preventDefault();
        document.body.classList.remove('no-scroll');
        filterProducts.classList.remove('active')
    })
}


let productSlider = new Swiper(".products-slider", {
    speed: 1000,
    
    slidesPerView: 1.5,
    spaceBetween: 8,
    
    
    navigation: {
        nextEl: '.products-slider__next',
        prevEl: '.products-slider__prev',
    },
    breakpoints: {
        380: {
            slidesPerView: 2,
            spaceBetween: 8
        },

        480: {
            slidesPerView: 3,
            spaceBetween: 8
        },


        800: {
            slidesPerView: 4,
            spaceBetween: 24
        },

        1200: {
            slidesPerView: 5,
            spaceBetween: 24
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 62
        }
    }
})

let sliderBrands = new Swiper(".slider-brands", {
    speed: 1000,
   /*autoplay: {
        delay: 6000,
    },*/
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    
    breakpoints: {
        
        480: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 32
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 60
        }
    }
})


const quickQueries = document.querySelectorAll('.h-form__qq');
if ( quickQueries.length ){
    quickQueries.forEach( btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();

            let form = this.closest('form');
            let input = form.querySelector('input');

            input.value = this.innerText;

            form.submit();
        })
    } )
}


let spoilerHeaders = document.querySelectorAll('.spoiler__header');

if ( spoilerHeaders.length ){
    spoilerHeaders.forEach( sh => {
        sh.addEventListener('click', function(){
            let spoiler = this.closest('.spoiler');
            
            let spoilerBody = spoiler.querySelector('.spoiler__body');
            let spoilerContent = spoiler.querySelector('.spoiler__content');

            if (  spoiler.getAttribute('data-state') === 'rolled' ){
                let height = spoilerContent.offsetHeight;
                deploySpoiler(spoiler,spoilerBody, height, 300)
            } else if (  spoiler.getAttribute('data-state') === 'animated-rolled' || spoiler.getAttribute('data-state') === 'animated-deploy'){
                return false;
            } else{
                let height = spoilerContent.offsetHeight;
                spoilerBody.style.height = height + 'px';
                rollFilterAccordeon(spoiler, spoilerBody, 300);
            }
        })
    } ) 


}
let bigSingleProductSlider = new Swiper(".sp-big-slider.swiper", {
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 2,
    pagination: {
        el: '.swiper-c-pagination',
        clickable: true,
    },
    
    breakpoints: {
        1200: {
            allowTouchMove: false,
        }
    }
    
})

let thumbsSingleProductSlider = new Swiper(".sp-thumb-slider.swiper", {
    speed: 1000,
    
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    initialSlide: 2,
    clickable: true,
    navigation: {
        nextEl: '.sp-thumb-slider__next',
        prevEl: '.sp-thumb-slider__prev',
    },

    thumbs: {
        swiper: bigSingleProductSlider,
    },


    breakpoints: {
        320: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    }
})



var reviewsSlider = new Swiper(".reviews.swiper", {
    speed: 1000,
    
    slidesPerView: 1.5, 
	spaceBetween: 8, 
	mousewheel: true, 

    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        
    },
    breakpoints: { 

        0: { // при 0px и выше
            slidesPerView: 1.5,
            direction: 'horizontal', // горизонтальная прокрутка
        },
        768: { // при 768px и выше
            direction: 'vertical', // вертикальная прокрутка
            slidesPerView: 'auto',
        }
    }
  });


const btnFavorites = document.querySelectorAll('.btn-add-favorites');

if ( btnFavorites.length ){
    btnFavorites.forEach(  btn => {
        btn.addEventListener('click', function(){
            if (this.classList.contains('active')){
                this.classList.remove('active')
            } else{
                this.classList.add('active')
            }
        })
    } )
}

const choisesSelect = document.querySelectorAll('.js-choice');

if ( choisesSelect.length ) {
    choisesSelect.forEach( select => {
        const choices = new Choices(select, {
            allowSearch: false, 
            searchEnabled: false,
            itemSelectText: '',
       });
    } )
}


let approveCheckboxes = document.querySelectorAll('input[data-role="approve"]');
console.log(approveCheckboxes);
if ( approveCheckboxes.length ){


    approveCheckboxes.forEach( cb => {
        if ( !cb.checked ){
            let targetSubmit = document.querySelector(cb.getAttribute('data-target-block'));
            targetSubmit.setAttribute('disabled', 'disabled');


            
        }
        cb.addEventListener('change', function(){
            let targetSubmit = document.querySelector(this.getAttribute('data-target-block'));
            if ( !this.checked ){
                
                targetSubmit.setAttribute('disabled', 'disabled');
            } else{
                targetSubmit.removeAttribute('disabled');
            }
        })
    } )

}

let ratingStars = document.querySelectorAll('.stars.review-star svg');

if ( ratingStars.length ){
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function(){
            let parent  = this.closest('.stars.review-star');

            let inputValue = parent.querySelector('input[name="rating"]');

            parent.classList.remove('stars-1');
            parent.classList.remove('stars-2');
            parent.classList.remove('stars-3');
            parent.classList.remove('stars-4');
            parent.classList.remove('stars-5');

            let className = index + 1;

            parent.classList.add('stars-' + className);
            inputValue.value = index + 1;
        })
    })
}





let horizontalReviews = new Swiper(".horizontal-reviews", {
    speed: 1000,
    
    slidesPerView: 1.5,
    spaceBetween: 8,
    loop: true,
    pagination: {
        el: '.pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.horizontal-slider-btn.next',
        prevEl: '.horizontal-slider-btn.prev',
    },
    breakpoints: {

        420: {
            slidesPerView: 1.5,
            spaceBetween: 8
        },
        500: {
            slidesPerView: 2.1,
            spaceBetween: 8
        },
        700: {
            slidesPerView: 2.5,
            spaceBetween: 16
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 16
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 32
        }
    }
})


const  tabsRadio = document.querySelectorAll('input[name="tab-radio"]');
const settingSheets = document.querySelectorAll('.profile-settings__sheet');



if ( tabsRadio.length ){
    tabsRadio.forEach( (tab, index) => {

        if ( tab.checked ){
            settingSheets[index].classList.add('active');
        }


        tab.addEventListener('change', function(){
            let index = +(this.value);
            document.querySelector('.profile-settings__sheet.active').classList.remove('active');
            settingSheets[index].classList.add('active');
        })
    } )
}


const fileBanner = document.querySelector('#file-banner');
const fileAvatar = document.querySelector('#file-avatar');

if ( fileBanner ){
    fileBanner.addEventListener('change', function(event){
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        const bannerImg = document.querySelector("#user-banner");
        

        reader.onload = (event) => {
            bannerImg.src = event.target.result;
        };

         reader.readAsDataURL(selectedFile);
    })
}
if ( fileAvatar ){
    fileAvatar.addEventListener('change', function(event){
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        const avatarImg = document.querySelector("#avatar-img");
        

        reader.onload = (event) => {
            avatarImg.src = event.target.result;
        };

         reader.readAsDataURL(selectedFile);
    })
}


const loadImgInputs = document.querySelectorAll('.load-input-img');

if ( loadImgInputs.length ){


    const clearLoadedFileBtns = document.querySelectorAll('.clear-load-img')
    clearLoadedFileBtns.forEach(btn => {
        btn.addEventListener('click', function(){
            const parent = this.closest(".swiper-slide");
            const inputFile = parent.querySelector('input[type="file"]');
            const loadedImg = parent.querySelector('img');

            inputFile.value = '';
            loadedImg.remove();
            parent.classList.remove('file-load');
        })
    })
    



    loadImgInputs.forEach( inpFile => {
        inpFile.addEventListener('change', function(event){
            const selectedFile = event.target.files[0];
            const reader = new FileReader();
    
            const parent = this.closest(".swiper-slide");
            let imgNode = parent.querySelector('img');
    
            const wrap = parent.querySelector('.load-images-swiper-input-container');  

            parent.classList.add('file-load');




            reader.onload = (event) => {
                if ( imgNode ) {
                    imgNode.src = event.target.result;
                } else{
                    imgNode = document.createElement('img');
                    imgNode.src = event.target.result;
                    wrap.append(imgNode);
                }                
            };
    
            reader.readAsDataURL(selectedFile);
             
        })
    } )
}





const  mfTabsRadio = document.querySelectorAll('.mf-tab__radio');
const mfRows = document.querySelectorAll('.mf-table__table tr[data-type]');



if ( mfTabsRadio.length ){
    mfTabsRadio.forEach( (tab) => {

        if ( tab.checked ){
            let typeOperation = tab.value;

            let selectedRows = document.querySelectorAll( '.mf-table__table tr[data-type="'+ typeOperation +'"]');

            if (selectedRows.length){
                selectedRows.forEach( srow => {
                    srow.classList.add('active');
                })
            }
        }


        tab.addEventListener('change', function(){
            let index = +(this.value);
            let activeRows = document.querySelectorAll('.mf-table__table tr.active');

            if (activeRows.length){
                activeRows.forEach( rowTable => {
                    rowTable.classList.remove('active');
                } )
            }
            let typeOperation = this.value;
            let selectedRows = document.querySelectorAll( '.mf-table__table tr[data-type="'+ typeOperation +'"]');
            if (selectedRows.length){
                selectedRows.forEach( srow => {
                    srow.classList.add('active');
                })
            }
           
        })
    } )
}


const curencyMaskinputs = document.querySelectorAll('.curency-input');

if (curencyMaskinputs.length){
    curencyMaskinputs.forEach(inp => {
        IMask(inp, {
            mask: Number,  // enable number mask
          
            // other options are optional with defaults below
            scale: 2,  // digits after point, 0 for integers
            thousandsSeparator: '',  // any single char
            padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
            normalizeZeros: true,  // appends or removes zeros at ends
            radix: '.',  // fractional delimiter
            mapToRadix: [','],  // symbols to process as radix          
        
          })
    })
}


const cardNumber = document.querySelector('input[name="card-number"]');
if ( cardNumber ){
    
      const mask = IMask(cardNumber, {
        mask: '0000 0000 0000 0000'
      });
}

const cardDate = document.querySelector('input[name="card-date"]');
if ( cardDate ){
    
    const mask = IMask(cardDate, {
        mask: '00 {/} 00',
    });
}


const cvc = document.querySelector('input[name="cvc"]');
if ( cvc ){
    
      const mask = IMask(cvc, {
        mask: '000'
      });
}



let loadImgSlider = new Swiper(".load-images-swiper.swiper", {
    speed: 1000,
    
    slidesPerView: 2.5,
    spaceBetween: 8,
    
    navigation: {
        nextEl: '.load-images-swiper-nav.next',
        prevEl: '.load-images-swiper-nav.prev',
    },
    
    breakpoints: {
        

        576: {
            slidesPerView: 3,
            
        },

        768: {
            slidesPerView: 4,
            
        },

       
        1200: {
            slidesPerView: 5,
            
        }
    }
})


const queryImgsSlider = document.querySelector('.sp-img-query.swiper');
if ( queryImgsSlider ){
    let screenWidth = document.documentElement.clientWidth;

    if ( screenWidth < 992){
        let swiperInnerWrapper = queryImgsSlider.querySelector('.img-query-wrapper');
        swiperInnerWrapper.classList.add('swiper-wrapper');
        
        
        
        let slider = new Swiper(".sp-img-query.swiper", {
            speed: 1000,
            
            slidesPerView: 2.5,
            spaceBetween: 16,
            
           
            
            breakpoints: {
                
        
                576: {
                    slidesPerView: 3,
                    
                },
        
                768: {
                    slidesPerView: 4,
                    
                },

                992: {
                    slidesPerView: 5,
                    
                },
                1200: {
                    slidesPerView: 6,
                    
                }
            }
        })
        
    } else{
       
        
    }
}

const removeAccaount = new HystModal({
    linkAttributeName: "data-hystmodal",
	backscroll: false,
});


const subscribeModals = new HystModal({
    linkAttributeName: "data-subsribemodal",
	backscroll: false,
});

const removeAccountBtn = document.querySelector('[data-remove-account]');
if ( removeAccountBtn ){
    removeAccountBtn.addEventListener('click', function(){
        alert('Удаляем аккаунт')
    })
}




const chatItems = document.querySelectorAll('.chat-item');
const mobBackChatList = document.querySelector('.chat-messages__mob-back-chat-list');
const chatMessages =  document.querySelector('.chat-messages'); 

if ( chatItems.length ){
    chatItems.forEach( ci => {
        ci.addEventListener('click', function(){
            if ( !this.classList.contains('active') ){
                let activeChat = document.querySelector('.chat-item.active');
                if (activeChat) activeChat.classList.remove('active');
                document.body.classList.add('chat-no-scroll');
                this.classList.add('active');
                chatMessages.classList.add('active');
            }
        })
    } )
}

if ( mobBackChatList && chatMessages){
    mobBackChatList.addEventListener('click', function(){
        chatMessages.classList.remove('active');
        document.body.classList.remove('chat-no-scroll');
    })
}


const volumeSetting = document.querySelector('.volume-settings');
if ( volumeSetting ){
    volumeSetting.addEventListener('click', function(){
        if ( !this.classList.contains('mute') ){
            this.classList.add('mute');
        } else{
            this.classList.remove('mute');
        }
    })
}

Fancybox.bind('[data-fancybox]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
  });   
  

let likeBtns = document.querySelectorAll('.like-btn');

if ( likeBtns.length ){
    likeBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            if ( btn.classList.contains('active') ){
                btn.classList.remove('active')
            } else{
                btn.classList.add('active')
            }
        })
    } )
}