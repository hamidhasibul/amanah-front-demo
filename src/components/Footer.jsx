import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo.svg";

export const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-light" id="footer">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-4 text-start text-secondary py-lg-5 py-4">
              <p className="font-20 font-lal fw-600">আমানাহ মেট্রিমোনি</p>
              <p className="font-lal font-14">
                ২০১৫ সাল থেকে বাংলাদেশী এবং বাংলাদেশী বংশোদ্ভূত মুসলিম নাগরিকদের
                কাছে অন্যতম নির্ভরযোগ্য অনলাইন মেট্রিমোনি সার্ভিস, আমানাহ
                মেট্রিমোনি। আমানাহ মেট্রিমোনি মূলত বাঙ্গালী মুসলিমদের জন্য কাজ
                করে থাকে । এটি কোন নির্দিষ্ট মানহাজ, মাযহাব, দল, মত বা গোষ্ঠী বা
                পেশার লোকজনের জন্য নয় বরং সকল মুসলমানদের জন্য কাজ করে ।
              </p>
              <div className="d-flex ">
                <a
                  href="https://www.facebook.com/amanahmatrimony
"
                  className="font-20 text-secondary me-3"
                >
                  <i class="fa-brands fa-facebook"></i>
                </a>

                <a
                  href="https://twitter.com/amanahmatrimony"
                  className="font-20 text-secondary me-3"
                >
                  <i class="fa-brands fa-twitter"></i>
                </a>

                <a
                  href="https://www.youtube.com/@amanahmatrimony9358
"
                  className="font-20 text-secondary"
                >
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 py-4 py-lg-5 px-lg-5 px-auto text-start font-lal text-secondary">
              <p className="font-20 font-lal fw-600 text-secondary">
                কুইক লিংক
              </p>
              <Link className="nav-link footer-nav me-5 my-auto" to={"/"}>
                যোগাযোগ
              </Link>
              <Link
                className="nav-link footer-nav me-5 my-auto"
                to={"/privacy"}
              >
                প্রাইভেসি
              </Link>
              <Link className="nav-link footer-nav me-5 my-auto" to={"/"}>
                শর্তাবলী
              </Link>
              <Link className="nav-link footer-nav me-5 my-auto" to={"/"}>
                রিটার্ন পলিসি
              </Link>

              {/* <div
                class="fb-page"
                data-href="https://www.facebook.com/amanahmatrimony"
                data-tabs=""
                data-width="280"
                data-height=""
                data-small-header="false"
                data-adapt-container-width="false"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote
                  cite="https://www.facebook.com/amanahmatrimony"
                  class="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/amanahmatrimony">
                    Amanah Matrimony
                  </a>
                </blockquote>
              </div> */}
            </div>
            <div className="col-lg-4 text-start text-secondary py-lg-5 py-4">
              <p className="font-20 font-lal text-secondary fw-600">
                যোগাযোগের তথ্য
              </p>
              <div className="d-flex font-14 mb-2 align-items-center">
                <i class="fa-solid fa-envelope me-2 font-14"></i>
                <p className="mb-1">info@amanahmatrimony.com</p>
              </div>

              <div className="d-flex font-14 mb-2 align-items-center">
                <i class="fa-solid fa-phone-volume me-2 font-14"></i>
                <p className="mb-1">+880 1558049785</p>
              </div>

              <div className="d-flex font-14 align-items-center">
                <i class="fa-solid fa-location-dot me-2 font-14"></i>
                <p className="mb-1">Chattogram</p>
              </div>
            </div>

            <div className="col-lg-12 mx-auto pb-2 border-top">
              <small className="font-12 fw-400">
                Amanah Matrimony. Copyright © 2023. All rights reserved <br />{" "}
                {/* Developed by{" "}
                <span>
                  <Link
                    to={"https://mpairtech.com"}
                    className="fw-bold text-muted"
                    style={{ textDecoration: "none" }}
                  >
                    mPair Technologies Ltd{" "}
                  </Link>
                </span> */}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
