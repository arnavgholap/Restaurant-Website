/*=============================== Header ===============================*/
const addEventonElem = function(elements, eventType, callback){
    for(let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
} ;
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector(".overlay");
const toggleNavbar = function(){
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}
addEventonElem(navTogglers, "click", toggleNavbar);
document.addEventListener("click", function(e){
    if(e.target.closest(".navbar_item")){
        toggleNavbar();
    }
});

//to active link according to current section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav ul li a[href*=' + id +']')
                .classList.add('active');
            })
        }
    })
}
/*=============================== GALLERY ===============================*/
// Carousel functionality
let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

function updateWidthItem(){
    width_item = items[active].offsetWidth;
}
window.addEventListener('resize', () => {
    updateWidthItem();
    runCarousel();
});
next.onclick = () => {
    active = (active + 1) % count;
    runCarousel();
}
prev.onclick = () => {
    active = (active - 1 + count) % count;
    runCarousel();
}
function runCarousel(){
    prev.style.display = 'block';
    next.style.display = 'block';
    let old_active = document.querySelector('.item.active');
    if (old_active) old_active.classList.remove('active');
    items[active].classList.add('active');
    leftTransform = width_item * (active - 1) * -1;
    list.style.transform =  `translateX(${leftTransform}px)`;
}
updateWidthItem();
runCarousel();

let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan = document.createElement('span');
    newSpan.innerText = value;
    let rotateSpan = (360 / textCircle.length) * (key + 1);
    newSpan.style.setProperty('--rotate', rotateSpan + 'deg');
    circle.appendChild(newSpan);
})


