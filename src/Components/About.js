import React from 'react'

export default function About(props) {
 
return (
    <div className="container" >
    <h1> About Us </h1>
    <div class="accordion" id="accordionExample" >
    <div class="accordion-item" style={{backgroundColor : props.mode==='light'? 'white': 'black', color : props.mode==='light'? 'black': 'white' ,  border :  props.mode==='light'? '1px solid black' : '1px solid white'}}>
        <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse"  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            About TextUtils
        </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body" >
            <strong>As it's name suggests, this application lets you manipulate any text entered by you.</strong> There are various tools such as UpperCase Conversion, LowerCase conversion, Character count, Word Count and also the Preview of your text. We hope you enjoy this basic yet useful resource. 
        </div>
        </div>
    </div>
    <div class="accordion-item" >
        <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button"  style={{backgroundColor : props.mode==='light'? 'white': 'black', color : props.mode==='light'? 'black': 'white' ,  border :  props.mode==='light'? '1px solid black' : '1px solid white'}}data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            About the Developer
        </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <strong>This basic application is built by me, Hritika Mishra.</strong> I am a 2021 Pass out and this is my very first React JS project. </div>
        </div>
    </div>
    <div class="accordion-item" >
        <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={{backgroundColor : props.mode==='light'? 'white': 'black', color : props.mode==='light'? 'black': 'white' ,  border :  props.mode==='light'? '1px solid black' : '1px solid white'}}data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Technologies Used
        </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <strong>React JS, Javascript, HTML, CSS . Cheers </strong>   </div>
        </div>
    </div>
    </div>

    <div class= "container my-5">
    <img src="favicon-32x32.png" class="rounded mx-auto d-block" alt="..." />
    </div>
      </div>
    )
}