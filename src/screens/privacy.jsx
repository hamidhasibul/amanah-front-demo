import { Footer } from "../components/Footer";
// import profile from "../assets/profile.png";
// import vp from "../assets/verified.png";
// import sp from "../assets/searchp.png";
// import cple from "../assets/cple.png";
// import secure from "../assets/secure.png";
// import verify from "../assets/verify.png";
// import google from "../assets/Googlep.png";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
export const Privacy = () => {
  const [content, setContent] = useState([]);
  const getcontent = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getcontent`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setContent(res.message[0].swed);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getcontent();
  }, []);
  return (
    <>
      <div className="container py-5">
        <h2 className="text-c2 font-lal mb-3 fw-bold">Privacy Policy</h2>
        <p className="font-18 font-lal ">
          At Amanah Matrimony, your privacy is a top priority. Your privacy is
          at the core of the way we design and build the services and products
          you know and love, so that you can fully trust them and focus on
          building meaningful connections.
        </p>
        <p className="font-lal font-18">
          We appreciate that you put your trust in us when you provide us with
          your information and we do not take this lightly.
        </p>
        <p className="font-lal font-18">
          <b>Our commitment to privacy. </b>We design all of our products and
          services with your privacy in mind. We involve experts from various
          fields, including legal, security, engineering, product design and
          others to make sure that our decisions are taken with the utmost
          respect for your privacy.
        </p>

        <p className="font-lal font-18">
          <b>Our commitment to transparency. </b>
          Because we use many of the same online services you do, we know that
          insufficient information and overly complicated language are common
          issues in privacy policies. We take the exact opposite approach: we’re
          doing our best to write our Privacy Policy and related documents in
          plain language. We actually want you to read our policies and
          understand our privacy practices!
        </p>

        <p className="font-lal font-18">
          <b>Our commitment to security. </b>
          We have teams dedicated to keeping your data safe and secure. We
          constantly update our security practices and invest in our security
          efforts to enhance the safety of your information.
        </p>

        <br />
        <br />
        <p className="font-lal font-18">
          Amanahmatrimony.com is an online matrimonial portal endeavoring
          constantly to provide you with matrimonial services. This privacy
          statement is common to all the matrimonial website/apps operated under
          Amanahmatrimony.com Since we are strongly committed to your right to
          privacy, we have drawn out a privacy statement with regard to the
          information we collect from you. You acknowledge that you are
          disclosing information voluntarily. By accessing /using the
          website/apps and/or by providing your information, you consent to the
          collection and use of the info you disclose on the website/apps in
          accordance with this Privacy Policy. If you do not agree for use of
          your information, please do not use or access this website/apps.
        </p>

        <p className="font-lal font-18">
          <b>What information you need to give in to use this Website/apps?</b>
        </p>
        <p className="font-lal font-18">
          The information we gather from members and visitors who apply for the
          various services our Website/Apps offers includes, but may not be
          limited to, photo of the user, email address, name, date of birth,
          educational qualifications, a user-specified password, mailing
          address, zip/pin code and telephone/mobile number or fax number.
        </p>
        <p className="font-lal font-18">
          We use a secure server for credit card transactions to protect the
          credit card information of our users and Cookies are used to store the
          login information. Cookies are small files placed on your hard drive
          that will assist us in providing our services. You may also encounter
          Cookies or identical/related devices on certain pages of the
          website/apps that are placed by third parties. We do not control the
          use of cookies by third parties.
        </p>
        <p className="font-lal font-18">
          The user information we collect depends on the context of your
          interactions with us and the website or Apps, the choices you make and
          the products and features you use. The User Information is used for
          authentication and account access, If a user registers using mobile
          phone we may collect personal data you choose to allow us to access
          through their APIs.
        </p>
        <p className="font-lal font-18">
          We may use also your personal information for analysis of data, usage
          trends and to evaluate and improve our site/App, marketing research,
          preventing of frauds. In our efforts to continually improve our
          product and service offerings, we collect and analyze demographic and
          profile data about our users' activity on our website/apps. We
          identify and use your IP address to help diagnose problems with our
          server, and to administer our website/apps. Your IP address is also
          used to help identify you and to gather broad demographic information.
        </p>
        <p className="font-lal font-18"></p>
        <p className="font-lal font-18"></p>
        <p className="font-lal font-18"></p>
      </div>

      <Footer />
    </>
  );
};
