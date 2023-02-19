
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

// update the html of an elmenet according to the data of slide
const updateSlideHtml=(element,slideName) =>{
   slideName.innerHTML=`<div class='createdSlide'>
   <div>
       <h3>${element.where}</h3>
                <p >${element.content_text}</p>
   </div>
  <div class="image-wrraper"><img  src=${imagesUrl+element.image}>  </div>
  </div>   
  `
 }
 

// fetch all the slideShow topic data
const getSlideShowTopic = async () => {
  return await fetchData(slideshow_topics_url)
}


// fetch all the slideShowSlides data
const getSlideShowSlides = async () => {
  return await fetchData(slideshow_slides_url)
}



// lets create fascinating festivals slide show
const createSlideShow = async () => {
  // grab all the slides show topics
  const { data: slideShowsTopic } = await getSlideShowTopic()
  console.log(slideShowsTopic)
  // get fascinating festivals slideshow data
  const fascinatingFestivals = slideShowsTopic[2]
  //
  const { data: slideShowSlides } = await getSlideShowSlides()
  const { slideshow_slides } = fascinatingFestivals

  // filter the list of slidesshow to get only the slides relevent to fasinating festivals
const slideForTheCurrentSlidShow = slideShowSlides.filter(element => slideshow_slides.includes(element.id))
   slideForTheCurrentSlidShow.forEach((element,index) => { 
    if (index===0) {
        slideTwo.id=element.id
        updateSlideHtml(element,slideTwo)
       return
    }
   
    const addedSlide=document.createElement('section');
    addedSlide.id=element.id
      updateSlideHtml(element,addedSlide)
        slidesContainer.insertAdjacentElement( 'beforeend', addedSlide)
    })

}




createSlideShow()