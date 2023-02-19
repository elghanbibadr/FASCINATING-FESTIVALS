
const slideshow_topics_url = 'https://vs.contentportal.link/items/slideshow_topics';
const slideshow_slides_url = 'https://vs.contentportal.link/items/slideshow_slides/';
const imagesUrl='https://vs.contentportal.link/assets/'
const slideTwo = document.querySelector('.slide2');
const slidesContainer=document.querySelector('.slides')


// create a resuable function to fetch data
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


// fetch all the slideShow topic data
const getSlideShowTopic = async () => {
  return await fetchData(slideshow_topics_url)
}


// fetch all the slideShowSlides data
const getSlideShowSlides = async () => {
  return await fetchData(slideshow_slides_url)
}



// lets create the 10 romantic place slide show
const createSlideShow = async () => {
  // grab all the slides show topics
  const { data: slideShowsTopic } = await getSlideShowTopic()
  console.log(slideShowsTopic)
  // get theBEST RAIL JOURNEYS  slideshow data
  const BEST_RAIL_JOURNEYS = slideShowsTopic[2]
  console.log(BEST_RAIL_JOURNEYS )
  //
  const { data: slideShowSlides } = await getSlideShowSlides()
  const { slideshow_slides } = BEST_RAIL_JOURNEYS;

  // filter the list of slidesshow to get only the slides relevent to 10 romantic places data
const slideForTheCurrentSlidShow = slideShowSlides.filter(element => slideshow_slides.includes(element.id))
   slideForTheCurrentSlidShow.forEach((element,index) => { 
    if (index===0) {
        slideTwo.id=element.id
        slideTwo.innerHTML=`<div class='createdSlide'>
        <p >${element.content_text}</p>
        <div class="image-wrraper"><img  src=${imagesUrl+element.image}>  </div>
        </div>   
        `
       return
    }
   
    const addedSlide=document.createElement('section');
    addedSlide.id=element.id
    addedSlide.innerHTML=`<div class='createdSlide'>
          <div>
              <h3>${element.where}</h3>
                       <p >${element.content_text}</p>
          </div>
         <div class="image-wrraper"><img  src=${imagesUrl+element.image}>  </div>
         </div>   
         `
        slidesContainer.insertAdjacentElement( 'beforeend', addedSlide)
        // addedSlide.classList.add('createdSlide')
    })

}




createSlideShow()