import React from "react";
import './Loading.css'
import Cir from '../images/Cir.gif'
function Loading(){
return(
<div class="wrapper">
          <img src={Cir} alt="Loading" class="img-loader"/>
        </div>
)
}
export default Loading;