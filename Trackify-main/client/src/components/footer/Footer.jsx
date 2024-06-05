import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <ul className="footerUL">
        {/* left */}
        <div className="ulLeft">
          <li>
            <a
              className="eachPerson"
              href="https://github.com/VidhiAParmar"
              target="_blank"
            >
              <img
                className="gitHubLogo"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Vidhi Parmar
            </a>
          </li>
          <li>
            <a
              className="eachPerson"
              href="https://github.com/MonilPrajapati"
              target="_blank"
            >
              <img
                className="gitHubLogo  mobile"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Monil Prajapati
            </a>
          </li>
        </div>

        {/* logo */}
        <li>
          <a href="">
            <img
              className="logoFooter"
              src="images/logomain.png"
              alt="logo of the project"
            />
          </a>
        </li>

        {/* right */}
        <div className="ulRight">
          <li>
            <a
              className="eachPerson"
              href="https://github.com/dhameliyashai"
              target="_blank"
            >
              <img
                className="gitHubLogo"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Shailee Dhameliya
            </a>
          </li>
          <li>
            <a
              className="eachPerson"
              href="https://github.com/Lkmaheshwari"
              target="_blank"
            >
              <img
                className="gitHubLogo  mobile"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Love Maheshwari
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
}

export default Footer;
