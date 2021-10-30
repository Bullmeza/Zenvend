import { useEffect, useState } from "react";

const getCookie = (name) => {
   var name = name + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(";");
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
};

const setCookie = (name, value) => {
   var d = new Date();
   d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
   var expires = "expires=" + d.toUTCString();
   document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getLocation = async () => {
   var param = {
      timeout: 3 * 1000,
   };
   return new Promise((res, rej) => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (coords) => {
               res(coords);
            },
            () => {
               rej("Location access need");
            },
            param
         );
      } else {
         rej("Geolocation not supported");
      }
   });
};

function getWindowDimensions() {
   const { innerWidth: width, innerHeight: height } = window;
   return {
      width,
      height,
   };
}

const useWindowDimensions = () => {
   const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
   );

   useEffect(() => {
      function handleResize() {
         setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return windowDimensions;
};

export { getCookie, setCookie, getLocation, useWindowDimensions };
