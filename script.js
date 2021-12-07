$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Developer", "Programmer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Developer", "Programmer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

        
(function() {
function validEmail(email) {
 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
 return re.test(email);
}

function validateHuman(honeypot) {
 if (honeypot) {
   console.log("Robot Detected!");
   return true;
 } else {
   console.log("Welcome Human!");
 }
}
function getFormData(form) {
 var elements = form.elements;

 var fields = Object.keys(elements).filter(function(k) {
       return (elements[k].name !== "honeypot");
 }).map(function(k) {
   if(elements[k].name !== undefined) {
     return elements[k].name;
   }else if(elements[k].length > 0){
     return elements[k].item(0).name;
   }
 }).filter(function(item, pos, self) {
   return self.indexOf(item) == pos && item;
 });

 var formData = {};
 fields.forEach(function(name){
   var element = elements[name];
   formData[name] = element.value;
   if (element.length) {
     var data = [];
     for (var i = 0; i < element.length; i++) {
       var item = element.item(i);
       if (item.checked || item.selected) {
         data.push(item.value);
       }
     }
     formData[name] = data.join(', ');
   }
 });

 // add form-specific values into the data
 formData.formDataNameOrder = JSON.stringify(fields);
 formData.formGoogleSheetName = form.dataset.sheet || "Sheet1"; // default sheet name
 formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

 console.log(formData);
 return formData;
}

function handleFormSubmit(event) {  
 event.preventDefault();           
 var form = event.target;
 var data = getFormData(form);         
 if( data.email && !validEmail(data.email) ) {   
   var invalidEmail = form.querySelector(".email-invalid");
   if (invalidEmail) {
     invalidEmail.style.display = "block";
     return false;
   }
 } else {
   disableAllButtons(form);
   var url = form.action;
   var xhr = new XMLHttpRequest();
   xhr.open('POST', url);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.onreadystatechange = function() {
       console.log(xhr.status, xhr.statusText);
       console.log(xhr.responseText);
       var formElements = form.querySelector(".form-elements")
       if (formElements) {
         formElements.style.display = "none"; // hide form
       }
       var thankYouMessage = form.querySelector(".thankyou_message");
       if (thankYouMessage) {
         thankYouMessage.style.display = "block";
//..............                 
         thankYouMessage.innerText = "Message Has Been Sent!";   
        }
       return;
   };
   var encoded = Object.keys(data).map(function(k) {
       return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
   }).join('&');
   xhr.send(encoded);
 }
}

function loaded() {
 console.log("Contact form submission handler loaded successfully.");
 var forms = document.querySelectorAll("form.gform");
 for (var i = 0; i < forms.length; i++) {
   forms[i].addEventListener("submit", handleFormSubmit, false);
 }
};
document.addEventListener("DOMContentLoaded", loaded, false);

function disableAllButtons(form) {
 var buttons = form.querySelectorAll("button");
 for (var i = 0; i < buttons.length; i++) {
   buttons[i].disabled = true;
 }
}
})();


