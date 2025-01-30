// greeting print
let greeting = "we are your guide to learn linux"
let interval = 1

setInterval(() => {
    $("#greet").text(greeting.substr(0,interval));
    interval++;
    if (interval == greeting.length){interval=1}
},200);
    // counter's interval :
function counter(id) {
    let value = Number($(id).text())
    let i = 1
    let count
    if (value<1000) {
        $(id).text(`${i}`)
    }
    else{
        let carry = (value)%100
        $(id).text(`${carry}`)
    }
    count = setInterval(() => {
            if(i<=value){
                $(id).text(`${i}`)
                if (value<1000) {
                    i++
                }
                else{
                    i += 10
                }
            }else{
                clearInterval(count)
            }
        },3000/value)
}

// display members's team with automatique scrolling
let memberNum = $("new-member").length
let  opacityToggle = (n)=>{
    $(".membersList").animate({
    opacity: n,
  },1000);}
function shift(){
    opacityToggle("0")
    setTimeout(() => {
        if (memberNum!=1) {
            $(".membersList").scrollLeft($(".membersList").scrollLeft()+300)
            memberNum--
        }
        else{
            $(".membersList").scrollLeft(0)
            memberNum = $("new-member").length
        }
    },400);
    opacityToggle('1')
}
// statistics's ccounter 
    // statistics' tag :
    customElements.define('new-ach',class extends HTMLElement{
        connectedCallback(){
            this.innerHTML=`<div class="card bg-transparent text-dark stCard">
                                <div class="card-body">
                                    <h3  id=${this.getAttribute('idCild')} >${this.getAttribute('value')} </h3>
                                    <h6>${this.getAttribute('of')}</h6>
                                </div>
                            </div>`
            this.setAttribute('class','col m-3')
        }
    })
// window location
let go = (a) => {window.location = `/${a}`}
// running the counters when the page be ready :
$("document").ready(
    function(){
        // landing page elements : class name 'lp-elem'
        // statistics
        $('.status').css("opacity","1",2000)
        console.log($(".membersList").innerWidth())
        // counters
        counter('#members')
        counter('#challenges')
        counter('#tutorials')
        counter('#quiz')
        // add bootstrap to some elemts 
            $("hr").addClass("p-1") // hr
            $("h1").addClass("p-3") // h1
        // the card scrolling 
        $(".membersList").scrollLeft(0);
        // Handle form submission
        $("#contactForm").on("submit", function (e) {
            // Simulate success
            $("#successMessage").css({
                "opacity":"1",
                "z-index":'4221',
            }); // Show success message
        });
    }
)