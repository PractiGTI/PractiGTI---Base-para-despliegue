import React from "react";

import "./Footer.css";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer>
      <img className="logi-img" src={logo} />
      <h2>PractiGTI</h2>

      <div className="letras">
        
        <a
              href={`mailto:practigti@gmail.com`}
            >
              practigti@gmail.com
            </a>
        <a
              href={`https://api.whatsapp.com/send/?phone=51917507504&text=Hola%21%2C+me+ha+surgido+una+duda.&type=phone_number&app_absent=0`}
            >
              (+51) 917 507 504
            </a>
            <a
              href={`https://api.whatsapp.com/send/?phone=51912347425&text=Hola%21%2C+me+ha+surgido+una+duda.&type=phone_number&app_absent=0`}
            >
              (+51) 912 347 425
            </a>
        
        
        <h2>&copy; PractiGTI 2022</h2>
      </div>
    </footer>
  );
}

export default Footer;
