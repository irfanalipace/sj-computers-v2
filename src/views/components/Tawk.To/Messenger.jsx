import React, { useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import "./Tawk.css";

const TawkTo = () => {
  useEffect(() => {
    
    setTimeout(() => {
        const widget  = document.querySelector('.widget-visible>iframe')
      if(widget)  widget.style.marginBottom = '25px'
      
    }, 3000);
      
  }, []);

  return (
    <div className="tawk-to-container">
      <TawkMessengerReact propertyId="5d3165689b94cd38bbe8276d" widgetId="default" />
    </div>
  );
};

export default TawkTo;
