/* Your JS here. */
let index = 0;
carousel();

function plusSlides(i){
    index += i;
    console.log(index);
    carousel();
}

function carousel(){
    console.log("index is ",index);
    let slides = document.getElementsByClassName("carousel-slide");
    if(index >= slides.length){
        //loop to first again
        index = 0;
    }
    else if(index<0){
        //loop to last
        index = slides.length-1;
    }
    for(i=0;i<slides.length;i++){
        slides[i].style.display = "none";
    }
    //only enable the index slide
    slides[index].style.display = "block";

    let pages = document.querySelectorAll(".carousel input");
    for(let page of pages){
        page.checked = false;
    }
    pages[index].checked = true;
}
function makeHeaderSticky(){
    let header = document.querySelector('header');
    let navbar_a_list = document.querySelectorAll('header > nav > ul > li > a')
    let scrollY = window.scrollY;
    if(scrollY>20){
        header.classList.add('scrolled'); 
        for(let navbar_a of navbar_a_list){
            navbar_a.classList.add("scrolled");
        }
    }
    else{
        header.classList.remove('scrolled');
        for(let navbar_a of navbar_a_list){
            navbar_a.classList.remove("scrolled");
        }
    }
}
function showModalDialog(event){
    
    let project_description = new Map();

    project_description.set("project_1","GroupMate: A Role-Aware Team Formation System for Academic Collaboration");
    project_description.set("project_2","VINT: Accessible Video Interpreter (under Professor Jooyoung Seo)");
    project_description.set("project_3","Dodging Detection: Evaluation of content-moderation models under adversarial evasion");
    project_description.set("project_4","Bi-modal analysis of social media for flood-water level estimation using instance segmentation");

    if(project_description.has(event.target.id)){
        document.getElementById("project_modal_description").innerText = project_description.get(event.target.id);
        document.getElementById("modal_project").showModal();
    }
    
}

function closeDialog(event){
    document.getElementById("modal_project").close();
}

function moveToCarousel(event){
    let chosen = event.target.id;
    index = chosen;
    console.log("index was chosen",index);
    carousel();
}
function clearActiveAnchors(){
    let sections = document.querySelectorAll(".content section");
    sections.forEach(section =>{
        let id = section.id;
        let id_a = `a[href='#${id}']`;
        document.querySelector(id_a).classList.remove('active');
    })

}
function indicatePosition(){
    let sections = document.querySelectorAll(".content section");
    clearActiveAnchors();

    let scrollY = window.scrollY + (5/100)*window.innerHeight/2;

    console.log("diff------");
    for(let section of sections){
        let top = section.offsetTop;
        let height = section.offsetHeight;
        console.log(top, top+height, scrollY);
        if(top <= scrollY && scrollY <= top+height){
            let id = section.id;
            let id_a = `a[href='#${id}']`;
            // alert(id);
            document.querySelector(id_a).classList.add('active');
            // break;
        }
    }
   

}



// Event listeners
document.getElementById("prev").addEventListener("click", () => plusSlides(-1));
document.getElementById("next").addEventListener("click", () => plusSlides(1));
document.addEventListener("scroll", () => {
    makeHeaderSticky();
    indicatePosition();
});




let project_icons = document.getElementsByClassName("project-icon");

for(let icon of project_icons){
    icon.addEventListener("click", (event)=>showModalDialog(event));
}

document.getElementById("close_modal").addEventListener("click",()=>closeDialog());

let pages = document.querySelectorAll(".carousel input");
    for(let page of pages){
        page.checked = false;
    }
pages[0].checked = true;

document.getElementsByName("carousel_page").forEach(page => page.addEventListener("click",(event)=> moveToCarousel(event)));
