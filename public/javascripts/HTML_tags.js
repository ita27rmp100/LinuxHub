// LANDING PAGE TAGS :
    // Features
class features extends HTMLElement {
    connectedCallback(){
        this.innerHTML=`<div class="card f-elem text-secondry p-3">
                            <div class="d-flex column align-items-between justify-content-between pt-2 px-3">
                                <h4>${this.getAttribute("title")}</h4>
                                <img src="images/icons/${this.getAttribute("icon")}.png" width="25px" height="20px" class="align-self-center">
                            </div>
                            <hr>
                            <div class="card-body p-2 text-justify left">
                                &nbsp;&nbsp;&nbsp;&nbsp; ${this.getAttribute("description")}
                            </div>
                        </div>`
    }
}
       // PlatformContent Card
class ContentType extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card relative">
                            <div class="card-img-top h-50 text-warning bg-dark py-5">
                            <h1>${this.getAttribute("type")}</h1>
                            </div>
                            <div class="card-body text-justify">
                                &nbsp;&nbsp; ${this.getAttribute("details")}
                            </div>
                            <div class="card-footer left">
                                <a href="${this.getAttribute("src")}" class="btn btn-outline-dark text-dark right more">More</a>                                </div>
                        </div>`
    }
}
        // team's members
class MemberInfo extends HTMLElement{
    connectedCallback(){
    this.innerHTML = `<div class="column center" style="width: 300px;" style="background-image: url(/images/members/ita.jpg);">
                        <img src="${this.getAttribute("img")}" class="rounded-circle p-2 card-head center" width="300px" height="300px" alt="">
                        <div class="column p-1">
                        <h4>${this.getAttribute("name")}</h4>
                        <p class="m-0">${this.getAttribute("role")}</p>
                        </div>
                        <div class=" w-100 center" role="group" aria-label="social">
                        <a href="${this.getAttribute("link1")}" class="btn">
                            <img src="images/icons/social/${this.getAttribute("social1")}.png" width="30px">
                        </a>
                            <a href="${this.getAttribute("link2")}" class="btn">
                            <img src="images/icons/social/${this.getAttribute("social2")}.png" width="30px">
                        </a>
                        <a href="${this.getAttribute("link3")}" class="btn">
                            <img src="images/icons/social/${this.getAttribute("social3")}.png" width="30px">
                        </a>
                        </div>
                    </div>`
    }
}
// Learning Content's page Tags
class cardLearn extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card">
                            <div class="card-body text-left">
                                <h3 class="card-title">${this.getAttribute("title")}</h3>
                                <p class="card-text">#${this.getAttribute("lang")} #${this.getAttribute("type")}</p>
                                <a href="${this.getAttribute("link")}" class="btn btn-primary float-right">Watch Now</a>
                            </div>
                        </div>`
    }
}
// Tests level
class testLevel extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card relative">
                            <div class="card-img-top h-50 text-warning bg-dark py-5">
                            <h1>${this.getAttribute("level")}</h1>
                            </div>
                            <div class="card-footer">
                                <a href="${this.getAttribute("src")}" class="btn btn-outline-dark text-dark right more">Let's take it</a>                                </div>
                        </div>`
    }
}

// defining the new tags
let tagsDefined = {
    "new-feature":features,
    "content-type":ContentType,
    "new-member":MemberInfo,
    "learn-card":cardLearn,
    "test-level":testLevel
}
for (tag in tagsDefined) {
    customElements.define(tag,tagsDefined[tag])
}