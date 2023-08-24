import React, { useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import "./Tawk.css";

const TawkTo = () => {
  useEffect(() => {
    const iframe = document.querySelector(".tawk-messenger-iframe");
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const chatButton = iframeDocument.querySelector(".tawk-float-button");
      
      if (chatButton) {
        // Apply custom styles to the chat button
        chatButton.style.bottom='44px'; // Set the bottom property to 12px
        // You can also add more custom styles here
      }
    }
  }, []);

  return (
    <div className="tawk-to-container">
      <TawkMessengerReact propertyId="5d3165689b94cd38bbe8276d" widgetId="default" />
    </div>
  );
};

export default TawkTo;
