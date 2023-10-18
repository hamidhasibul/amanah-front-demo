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
import { Loader } from "../components/Loader";
export const About = () => {
  const [content, setContent] = useState([]);
  const [load, setLoad] = useState(true);
  const getcontent = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getcontent`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        setContent(res.message[0].swed);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getcontent();
  }, []);
  return (
    <>
      {load && <Loader />}
      {!load && (
        <>
          <div className="landing-header2">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 pt-5 text-center">
                  <h1 className="font-bosonto text-c2 mt-5">
                    সঠিক জীবনসঙ্গী নির্বাচন করুন
                  </h1>
                  <p className="font-lal text-c2">
                    যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো।
                    <br />
                    বাকি অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।
                    <br /> - (বায়হাকী, শু’আবুল ঈমান –৫৪৮৬)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-12">
                <h3
                  className="text-center font-hind"
                  style={{ color: "#363636" }}
                >
                  আমানাহ মেট্রিমোনি সম্পর্কে জানুন{" "}
                </h3>
                <p
                  className="font-lal px-lg-5 px-2"
                  style={{ textAlign: "justify" }}
                >
                  {content}
                </p>
              </div>
            </div>
          </div>
          <div className="container mb-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-10 bg-light py-3">
                <div
                  class="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                      <h5 class="panel-title fw-bold font-lal">
                        <a
                          role="button"
                          data-bs-toggle="collapse"
                          data-bs-parent="#accordion"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          আমানাহ কাদের নিয়ে কাজ করে?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      class="panel-collapse collapse show"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                    >
                      <div class="panel-body px-3 font-lal">
                        আমানাহ ম্যারেজ মিডিয়া মুসলিম বাংলাদেশী নাগরিক কিংবা
                        বাংলাদেশী বংশদ্ভুত নাগরিকদের জন্য কাজ করে। এটি নির্দিষ্ট
                        কোন মানহাজ বা মাজহাব (সালাফী/আহলে হাদিস/ফিকহী মাযহাব
                        অনুসারী/ তাবলীগ জামাত/ পীরের মুরিদ) অনুসারীদের জন্য নয়
                        বরং সকল মুসলমান বাংলাদেশীদের জন্য কাজ করে। এ ক্ষেত্রে
                        পাত্র-পাত্রী যদি নিজেদের রিকোয়ারমেন্ট এ নিজস্ব মতের
                        অনুসারী কাউকে চায় সেই ক্ষেত্রে ওয়েবসাইটে সেই ফিল্টারগুলি
                        দেয়া আছে যেগুলো ব্যবহার করে পাত্র-পাত্রীর লিস্ট সর্ট
                        করতে আরবেন।
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                      <h5 class="panel-title fw-bold  font-lal">
                        <a
                          class="collapsed"
                          role="button"
                          data-bs-toggle="collapse"
                          data-bs-parent="#accordion"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          আমানাহ তে রেজিস্ট্রেশান করবো কিভাবে?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                    >
                      <div class="panel-body px-3 font-lal">
                        আমানাহ ম্যারেজ মিডিয়াতে বায়োডাটা সাবমিট সম্পুর্ণ ফ্রি।
                        আমরা ট্রেডিশনাল কোন মিডিয়া নই। সবাইকে রেজিস্ট্রেশন করে
                        নিজের বায়োডাটা নিজেকে সাবমিট করতে হবে। আমাদের একজন এডমিন
                        বায়োডাটা চেক করতে ওয়েবসাইটে পাবলিশ করবেন। পরবর্তীতে
                        বায়োডাটা এডিট করা হলে সেটিও আনপাবলিশ হয়ে যাবে এবং আমাদের
                        এডমিন পুনরায় রিভিউ করে এপ্রুভ করে করে দিবেন।
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h5 class="panel-title fw-bold font-lal">
                        <a
                          class="collapsed"
                          role="button"
                          data-bs-toggle="collapse"
                          data-bs-parent="#accordion"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          আমানাহ কি অন্যান্য নন-প্রফিট ম্যারিজ মিডিয়ার সাথে কাজ
                          করে?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                    >
                      <div class="panel-body px-3 font-lal">
                        না। আমানাহ অন্যান্য নন প্রফিট ইসলামিক ম্যারিজ
                        মিডিয়াগুলোর সাথে কো-অপারেশানে কাজ করে না। এইক্ষেত্রে
                        আপনারা বায়োডাটা যদি অন্যকোন ম্যারিজ মিডিয়ায় দিয়ে থাকেন
                        তাহলে সেটির বায়োডাটা আমাদের কপি করে দেয়ার সুযোগ নাই।
                        আপনারা নিজেরা কপি করে প্রয়োজনীয় তথ্যগুলি সাবমিট করতে
                        পারবেন ইনশাআল্লাহ্‌।
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};
