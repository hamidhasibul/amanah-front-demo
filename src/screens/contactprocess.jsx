import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { Link, useNavigate } from "react-router-dom";
import bsearch from "../assets/bsearch.png";
import biodata from "../assets/dossier.png";
import mpay from "../assets/mobile-payment.png";
import dsecure from "../assets/dsecure.png";

export const ContactProcess = () => {
  const navigate = useNavigate();
  const auth = () => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    auth();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <ProfileSide />
          <div className="col-lg-9">
            <div className="row p-4 my-5 mt-2 font-lal">
              <div className="col-lg-12 mb-3">
                <p className="font-22 text-c2 mb-1 fw-700 font-bosonto">
                  প্রস্তাব পাঁঠাতে যোগাযোগের তথ্য জানুন
                </p>
                <small className="font-16">
                  আপনার পছন্দের বায়োডাটা গুলো নির্বাচন করে যোগাযোগের তথ্য জানতে
                  নিচের প্রক্রিয়া গুলো অনুসরন করুন।
                </small>
              </div>
              <div class="col-lg-12 my-5">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="border-0 rounded cproc_card p-3">
                      <img src={bsearch} className="cproc_icon mb-2" alt="" />
                      <p class="font-lal font-18 mb-1 fw-600 text-c2">
                        বায়োডাটা খুঁজুন
                      </p>
                      <p>
                        আপনার চাহিদা অনুযায়ী বায়োডাটা ফিল্টার করুন। শতাদিক
                        বায়োডাটা যাচাই করে আপনার সঠিক জীবনসঙ্গী খুঁজুন।
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="border-0 rounded cproc_card p-3">
                      <img src={biodata} className="cproc_icon mb-2" alt="" />
                      <p class="font-lal font-18 mb-1 fw-600 text-c2">
                        বায়োডাটা নির্বাচন
                      </p>
                      <p>
                        নির্বাচিত বায়োয়ডাটার তথ্য গুলো ভালোভাবে পড়ুন। আপনার যে
                        সকল বায়োডাটা পছন্দ হয়েছে, সে বায়ডাটা গুলোর আইডি নং
                        সংগ্রহ করুন।
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="border-0 rounded cproc_card p-3">
                      <img src={mpay} className="cproc_icon mb-2" alt="" />
                      <p class="font-lal font-18 mb-1 fw-600 text-c2">
                        যোগাযোগের তথ্য
                      </p>
                      <p>
                        যোগাযোগের তথ্য জানতে প্রতিটি বায়োডাটার জন্য নির্ধারিত
                        মূল্য পরিশোধ করুন। এবং যোগাযোগের তথ্য নিয়ে প্রস্তাব
                        পাঠান।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
