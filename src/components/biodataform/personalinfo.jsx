import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Personal = ({ activestep, setActivestep }) => {
  const [dob, setDob] = useState("");
  const [activeid, setActiveid] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [mstatus, setMstatus] = useState("অবিবাহিত");
  const [bloodgroup, setBloodgroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  // const [town, setTown] = useState("");
  const [presentaddress, setPresentaddress] = useState("");
  const [pordaType, setPordaType] = useState("হিজাব");
  const [dari, setDari] = useState("হ্যাঁ");
  const [mazhub, setMazhub] = useState("হানাফী");
  const [politics, setPolitics] = useState("");
  const [selfinfo, setSelfinfo] = useState("");
  const [userinfo, setUserInfo] = useState([]);
  const [update, setUpdate] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    const getUserInfo = () => {
      setload(true);
      const data = new FormData();
      let token = localStorage.getItem("token");
      data.append("token", token);

      fetch(`${import.meta.env.VITE_SERVER}/getMemberBytoken`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setUserInfo(res.message[0]);
          setActiveid(res.message[0].id);
          setload(false);
        })
        .catch((err) => console.log(err));
    };

    getUserInfo();
  }, [update]);

<<<<<<< HEAD
    return (
        <>
            <form className="row " onSubmit={profilesubmit}>
                <h3 className="text-center">ব্যাক্তিগত তথ্য</h3>
                <div className="col-4">
                    <div class="mb-3">
                        <label for="dateofbirth" class="form-label">জন্মসাল</label>
                        <input
                            onChange={(e) => {
                                setDob(e.target.value);
                            }}
                            type="date" class="form-control" />
                    </div>
                </div>
                <div className="col-4">
                    <div class="mb-3">
                        <label for="height" class="form-label">উচ্চতা</label>
                        <input
                            onChange={(e) => {
                                setHeight(e.target.value);
                            }}
                            type="text" class="form-control" />
                    </div>
                </div>
=======
  const profilesubmit = (e) => {
    e.preventDefault();
    if (activestep) {
      setActivestep("fif");
    }
    const data = new FormData();
    data.append("id", activeid);
    data.append("dob", dob);
    data.append("height", height);
    data.append("weight", weight);
    data.append("color", color);
    data.append("mstatus", mstatus);
    data.append("bloodgroup", bloodgroup);
    data.append("district", district);
    data.append("upazila", upazila);
    data.append("presentaddress", presentaddress);
>>>>>>> 0d2e763a216199d5b7e17b9dc42720fcc158ac68

    data.append("dari", dari);
    data.append("pordaType", pordaType);
    data.append("mazhub", mazhub);
    data.append("politics", politics);
    data.append("selfinfo", selfinfo);

    fetch(`${import.meta.env.VITE_SERVER}/addpersonalinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          document.getElementById("pills-profile-tab").click();

          toast.success("Saved", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        } else {
          toast.success("Something is wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
        <form className="row font-lal" onSubmit={profilesubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            ব্যক্তিগত তথ্য
          </p>
          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="dateofbirth" class="form-label font-14 text-muted">
                জন্মসাল
              </label>
              <input
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                type="date"
                class="form-control control-size py-1"
                required
              />
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div class="mb-2">
              <label for="weight" class="form-label text-muted font-14 ">
                উচ্চতা
              </label>
              <select
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
                <option>৪'৫"</option>
                <option>৪'৬"</option>
                <option>৪'৭"</option>
                <option>৪'৮"</option>
                <option>৪'৯"</option>
                <option>৪'১০"</option>
                <option>৪'১১"</option>
                <option>৫"</option>
                <option>৫'১"</option>
                <option>৫'২"</option>
                <option>৫'৩"</option>
                <option>৫'৪"</option>
                <option>৫'৫"</option>
                <option>৫'৬"</option>
                <option>৫'৭"</option>
                <option>৫'৮"</option>
                <option>৫'৯"</option>
                <option>৫'১০"</option>
                <option>৫'১১"</option>
                <option>৬"</option>
                <option>৬'১"</option>
                <option>৬'২"</option>
                <option>৬'৩"</option>
                <option>৬'৪"</option>
                <option>৬'৫"</option>
                <option>৬'৬"</option>
                <option>৬'৭"</option>
                <option>৬'৮"</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label font-14 text-muted">
                ওজন{" "}
                <span>
                  <small className="text-muted">(কেজি)</small>
                </span>
              </label>
              <input
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                type="text"
                class="form-control control-size"
                placeholder="৫০ "
                required
              />
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 ">
                মাজহাব / মানহাজ
              </label>
              <select
                onChange={(e) => {
                  setMazhub(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected value="হানাফী">
                  হানাফী
                </option>
                <option>তাবলীগি</option>
                <option>সালাফী</option>
                <option>আহলে হাদিস</option>
                <option>সুন্নী</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                জেলা
              </label>
              <select
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected disabled value="">
                  জেলা
                </option>
                <option>কুমিল্লা</option>
                <option>ফেনী</option>
                <option>ব্রাহ্মণবাড়িয়া</option>
                <option>রাঙ্গামাটি</option>
                <option>নোয়াখালী</option>
                <option>চাঁদপুর</option>
                <option>লক্ষ্মীপুর</option>
                <option>চট্টগ্রাম</option>
                <option>কক্সবাজার</option>
                <option>খাগড়াছড়ি</option>
                <option>বান্দরবান</option>
                <option>সিরাজগঞ্জ</option>
                <option>পাবনা</option>
                <option>বগুড়া</option>
                <option>রাজশাহী</option>
                <option>নাটোর</option>
                <option>জয়পুরহাট</option>
                <option>চাঁপাইনবাবগঞ্জ</option>
                <option>নওগাঁ</option>
                <option>যশোর</option>
                <option>সাতক্ষীরা</option>
                <option>মেহেরপুর</option>
                <option>নড়াইল</option>
                <option>চুয়াডাঙ্গা</option>
                <option>কুষ্টিয়া</option>
                <option>মাগুরা</option>
                <option>খুলনা</option>
                <option>বাগেরহাট</option>
                <option>ঝিনাইদহ</option>
                <option>ঝালকাঠি</option>
                <option>পটুয়াখালী</option>
                <option>পিরোজপুর</option>
                <option>বরিশাল</option>
                <option>বরিশাল</option>
                <option>ভোলা</option>
                <option>বরগুনা</option>
                <option>সিলেট</option>
                <option>মৌলভীবাজার</option>
                <option>হবিগঞ্জ</option>
                <option>সুনামগঞ্জ</option>
                <option>নরসিংদী</option>
                <option>গাজীপুর</option>
                <option>শরীয়তপুর</option>
                <option>নারায়ণগঞ্জ</option>
                <option>টাঙ্গাইল</option>
                <option>কিশোরগঞ্জ</option>
                <option>মানিকগঞ্জ</option>
                <option>ঢাকা</option>
                <option>মুন্সিগঞ্জ</option>
                <option>রাজবাড়ী</option>
                <option>মাদারীপুর</option>
                <option>গোপালগঞ্জ</option>
                <option>ফরিদপুর</option>
                <option>পঞ্চগড়</option>
                <option>দিনাজপুর</option>
                <option>লালমনিরহাট</option>
                <option>নীলফামারী</option>
                <option>গাইবান্ধা</option>
                <option>ঠাকুরগাঁও</option>
                <option>রংপুর</option>
                <option>কুড়িগ্রাম</option>
                <option>শেরপুর</option>
                <option>ময়মনসিংহ</option>
                <option>জামালপুর</option>
                <option>নেত্রকোণা</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 ">
                উপজেলা
              </label>
              <select
                onChange={(e) => {
                  setUpazila(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  উপজেলা
                </option>

                {district == "কুমিল্লা" && (
                  <>
                    <option>দেবিদ্বার</option>
                    <option>বরুড়া</option>
                    <option>ব্রাহ্মণপাড়া</option>
                    <option>চান্দিনা</option>
                    <option>চৌদ্দগ্রাম</option>
                    <option>দাউদকান্দি</option>
                    <option>হোমনা</option>
                    <option>লাকসাম</option>
                    <option>মুরাদনগর</option>
                    <option>নাঙ্গলকোট</option>
                    <option>কুমিল্লা সদর</option>
                    <option>মেঘনা</option>
                    <option>মনোহরগঞ্জ</option>
                    <option>সদর দক্ষিণ</option>
                    <option>তিতাস</option>
                    <option>বুড়িচং</option>
                    <option>লালমাই</option>
                  </>
                )}
                {district == "ফেনী" && (
                  <>
                    <option>ছাগলনাইয়া </option>
                    <option>ফেনী সদর</option>
                    <option>সোনাগাজী </option>
                    <option>ফুলগাজী </option>
                    <option>পরশুরাম</option>
                    <option>দাগনভূঞা</option>
                  </>
                )}
                {district == "ব্রাহ্মণবাড়িয়া" && (
                  <>
                    <option>ব্রাহ্মণবাড়িয়া সদর</option>
                    <option>কসবা</option>
                    <option>নাসিরনগর</option>
                    <option>সরাইল </option>
                    <option>আশুগঞ্জ</option>
                    <option>আখাউড়া</option>
                    <option>নবীনগর</option>
                    <option>বাঞ্ছারামপুর</option>
                    <option>বিজয়নগর</option>
                  </>
                )}
                {district == "রাঙ্গামাটি" && (
                  <>
                    <option>রাঙ্গামাটি সদর</option>
                    <option>কাপ্তাই</option>
                    <option>কাউখালী</option>
                    <option>বাঘাইছড়ি</option>
                    <option>বরকল</option>
                    <option>লংগদু</option>
                    <option>রাজস্থলী</option>
                    <option>বিলাইছড়ি</option>
                    <option>জুরাছড়ি</option>
                    <option>নানিয়ারচর</option>
                  </>
                )}
                {district == "নোয়াখালী" && (
                  <>
                    <option>নোয়াখালী</option>
                    <option>কোম্পানীগঞ্জ</option>
                    <option>বেগমগঞ্জ</option>
                    <option>হাতিয়া</option>
                    <option>সুবর্ণচর</option>
                    <option>কবিরহাট</option>
                    <option>সেনবাগ</option>
                    <option>চাটখিল</option>
                    <option>সোনাইমুড়ী</option>
                  </>
                )}
                {district == "চাঁদপুর" && (
                  <>
                    <option>হাইমচর</option>
                    <option>কচুয়া</option>
                    <option>শাহরাস্তি</option>
                    <option>চাঁদপুর সদর</option>
                    <option>মতলব</option>
                    <option>হাজীগঞ্জ</option>
                    <option>মতলব</option>
                    <option>ফরিদগঞ্জ</option>
                  </>
                )}
                {district == "লক্ষ্মীপুর" && (
                  <>
                    <option>লক্ষ্মীপুর সদর</option>
                    <option>কমলনগর</option>
                    <option>রায়পুর</option>
                    <option>রামগতি</option>
                    <option>রামগঞ্জ</option>
                  </>
                )}
                {district == "চট্টগ্রাম" && (
                  <>
                    <option>রাঙ্গুনিয়া</option>
                    <option>চট্টগ্রাম সদর </option>
                    <option>সীতাকুন্ড </option>
                    <option>মীরসরাই</option>
                    <option>পটিয়া</option>
                    <option>সন্দ্বীপ</option>
                    <option>বাঁশখালী</option>
                    <option>বোয়ালখালী</option>
                    <option>আনোয়ারা</option>
                    <option>চন্দনাইশ</option>
                    <option>সাতকানিয়া</option>
                    <option>লোহাগাড়া</option>
                    <option>হাটহাজারী</option>
                    <option>ফটিকছড়ি</option>
                    <option>রাউজান</option>
                    <option>কর্ণফুলী</option>
                  </>
                )}
                {district == "কক্সবাজার" && (
                  <>
                    <option>কক্সবাজার সদর</option>
                    <option>চকরিয়া</option>
                    <option>কুতুবদিয়া</option>
                    <option>উখিয়া</option>
                    <option>মহেশখালী</option>
                    <option>পেকুয়া</option>
                    <option>রামু</option>
                    <option>টেকনাফ</option>
                  </>
                )}
                {district == "খাগড়াছড়ি" && (
                  <>
                    <option>খাগড়াছড়ি সদর</option>
                    <option>দিঘীনালা</option>
                    <option>পানছড়ি</option>
                    <option>লক্ষীছড়ি</option>
                    <option>মহালছড়ি</option>
                    <option>মানিকছড়ি</option>
                    <option>রামগড়</option>
                    <option>মাটিরাঙ্গা</option>
                    <option>গুইমারা</option>
                  </>
                )}
                {district == "বান্দরবান" && (
                  <>
                    <option>বান্দরবান সদর</option>
                    <option>আলীকদম</option>
                    <option>নাইক্ষ্যংছড়ি</option>
                    <option>রোয়াংছড়ি</option>
                    <option>লামা</option>
                    <option>রুমা</option>
                    <option>থানচি</option>
                  </>
                )}
                {district == "সিরাজগঞ্জ" && (
                  <>
                    <option>বেলকুচি</option>
                    <option>চৌহালি</option>
                    <option>কামারখন্দ</option>
                    <option>কাজীপুর</option>
                    <option>রায়গঞ্জ</option>
                    <option>শাহজাদপুর</option>
                    <option>সিরাজগঞ্জ</option>
                    <option>তাড়াশ</option>
                    <option>উল্লাপাড়া</option>
                  </>
                )}
                {district == "পাবনা" && (
                  <>
                    <option>সুজানগর</option>
                    <option>ঈশ্বরদী</option>
                    <option>ভাঙ্গুড়া</option>
                    <option>পাবনা সদর</option>
                    <option>বেড়া</option>
                    <option>আটঘরিয়া</option>
                    <option>চাটমোহর</option>
                    <option>সাঁথিয়া</option>
                    <option>ফরিদপুর</option>
                  </>
                )}
                {district == "বগুড়া" && (
                  <>
                    <option>কাহালু </option>
                    <option>বগুড়া সদর</option>
                    <option>সারিয়াকান্দি</option>
                    <option>শাজাহানপুর</option>
                    <option>দুপচাচিঁয়া </option>
                    <option>আদমদিঘি </option>
                    <option>নন্দিগ্রাম</option>
                    <option>সোনাতলা </option>
                    <option>ধুনট </option>
                    <option>গাবতলী</option>
                    <option>শেরপুর </option>
                    <option>শিবগঞ্জ</option>
                  </>
                )}
                {district == "রাজশাহী" && (
                  <>
                    <option>পবা </option>
                    <option>দুর্গাপুর </option>
                    <option>মোহনপুর </option>
                    <option>চারঘাট </option>
                    <option>পুঠিয়া </option>
                    <option>বাঘা </option>
                    <option>গোদাগাড়ী </option>
                    <option>তানোর </option>
                    <option>বাগমারা </option>
                  </>
                )}
                {district == "নাটোর" && (
                  <>
                    <option>নাটোর সদর</option>
                    <option>সিংড়া</option>
                    <option>বড়াইগ্রাম</option>
                    <option>বাগাতিপাড়া</option>
                    <option>লালপুর</option>
                    <option>গুরুদাসপুর</option>
                    <option>নলডাঙ্গা</option>
                  </>
                )}
                {district == "জয়পুরহাট" && (
                  <>
                    <option>আক্কেলপুর </option>
                    <option>কালাই </option>
                    <option>ক্ষেতলাল </option>
                    <option>পাঁচবিবি </option>
                    <option>জয়পুরহাট সদর</option>
                  </>
                )}
                {district == "চাঁপাইনবাবগঞ্জ" && (
                  <>
                    <option>চাঁপাইনবাবগঞ্জ সদর</option>
                    <option>গোমস্তাপুর</option>
                    <option>নাচোল</option>
                    <option>ভোলাহাট</option>
                    <option>শিবগঞ্জ</option>
                  </>
                )}
                {district == "নওগাঁ" && (
                  <>
                    <option>মহাদেবপুর </option>
                    <option>বদলগাছী </option>
                    <option>পত্নিতলা </option>
                    <option>ধামইরহাট </option>
                    <option>নিয়ামতপুর </option>
                    <option>মান্দা </option>
                    <option>আত্রাই </option>
                    <option>রাণীনগর </option>
                    <option>নওগাঁ সদর</option>
                    <option>পোরশা </option>
                    <option>সাপাহার</option>
                  </>
                )}
                {district == "যশোর" && (
                  <>
                    <option>মণিরামপুর</option>
                    <option>অভয়নগর</option>
                    <option>বাঘারপাড়া</option>
                    <option>চৌগাছা</option>
                    <option>ঝিকরগাছা</option>
                    <option>কেশবপুর</option>
                    <option>যশোর সদর</option>
                    <option>শার্শা</option>
                  </>
                )}
                {district == "সাতক্ষীরা" && (
                  <>
                    <option>আশাশুনি</option>
                    <option>দেবহাটা</option>
                    <option>কলারোয়া</option>
                    <option>সাতক্ষীরা সদর</option>
                    <option>শ্যামনগর</option>
                    <option>তালা</option>
                    <option>কালিগঞ্জ</option>
                  </>
                )}
                {district == "মেহেরপুর" && (
                  <>
                    <option>মুজিবনগর</option>
                    <option>মেহেরপুর সদর</option>
                    <option>গাংনী</option>
                  </>
                )}
                {district == "নড়াইল" && (
                  <>
                    <option>নড়াইল সদর</option>
                    <option>লোহাগড়া</option>
                    <option>কালিয়া</option>
                  </>
                )}
                {district == "চুয়াডাঙ্গা" && (
                  <>
                    <option>চুয়াডাঙ্গা সদর</option>
                    <option>আলমডাঙ্গা</option>
                    <option>দামুড়হুদা</option>
                    <option>জীবননগর</option>
                  </>
                )}
                {district == "কুষ্টিয়া" && (
                  <>
                    <option>কুষ্টিয়া সদর</option>
                    <option>কুমারখালী</option>
                    <option>খোকসা</option>
                    <option>মিরপুর</option>
                    <option>দৌলতপুর</option>
                    <option>ভেড়ামারা</option>
                  </>
                )}
                {district == "মাগুরা" && (
                  <>
                    <option>শালিখা</option>
                    <option>শ্রীপুর</option>
                    <option>মাগুরা সদর</option>
                    <option>মহম্মদপুর</option>
                  </>
                )}
                {district == "খুলনা" && (
                  <>
                    <option>পাইকগাছা</option>
                    <option>ফুলতলা </option>
                    <option>দিঘলিয়া </option>
                    <option>রূপসা </option>
                    <option>তেরখাদা </option>
                    <option>ডুমুরিয়া </option>
                    <option>বটিয়াঘাটা</option>
                    <option>দাকোপ </option>
                    <option>কয়রা </option>
                  </>
                )}

                {district == "বাগেরহাট" && (
                  <>
                    <option>ফকিরহাট</option>
                    <option>বাগেরহাট সদর</option>
                    <option>মোল্লাহাট</option>
                    <option>শরণখোলা</option>
                    <option>রামপাল</option>
                    <option>মোড়েলগঞ্জ</option>
                    <option>কচুয়া</option>
                    <option>মোংলা</option>
                    <option>চিতলমারী</option>
                  </>
                )}
                {district == "ঝিনাইদহ" && (
                  <>
                    <option>ঝিনাইদহ সদর</option>
                    <option>শৈলকুপা</option>
                    <option>হরিণাকুন্ডু</option>
                    <option>কালীগঞ্জ</option>
                    <option>কোটচাঁদপুর</option>
                    <option>মহেশপুর</option>
                  </>
                )}
                {district == "ঝালকাঠি" && (
                  <>
                    <option>ঝালকাঠি সদর</option>
                    <option>কাঠালিয়া</option>
                    <option>নলছিটি</option>
                    <option>রাজাপুর</option>
                  </>
                )}
                {district == "পটুয়াখালী" && (
                  <>
                    <option>বাউফল</option>
                    <option>পটুয়াখালী সদর</option>
                    <option>দুমকি</option>
                    <option>দশমিনা</option>
                    <option>কলাপাড়া</option>
                    <option>মির্জাগঞ্জ</option>
                    <option>গলাচিপা</option>
                    <option>রাঙ্গাবালী</option>
                  </>
                )}
                {district == "পিরোজপুর" && (
                  <>
                    <option>পিরোজপুর সদর</option>
                    <option>নাজিরপুর</option>
                    <option>কাউখালী</option>
                    <option>ভান্ডারিয়া</option>
                    <option>মঠবাড়ীয়া</option>
                    <option>নেছারাবাদ</option>
                    <option>ইন্দুরকানী</option>
                  </>
                )}
                {district == "বরিশাল" && (
                  <>
                    <option>বরিশাল সদর</option>
                    <option>বাকেরগঞ্জ</option>
                    <option>বাবুগঞ্জ</option>
                    <option>উজিরপুর</option>
                    <option>বানারীপাড়া</option>
                    <option>গৌরনদী</option>
                    <option>আগৈলঝাড়া</option>
                    <option>মেহেন্দিগঞ্জ</option>
                    <option>মুলাদী</option>
                    <option>হিজলা</option>
                  </>
                )}
                {district == "ভোলা" && (
                  <>
                    <option>ভোলা সদর</option>
                    <option>বোরহান উদ্দিন</option>
                    <option>চরফ্যাশন</option>
                    <option>দৌলতখান</option>
                    <option>মনপুরা</option>
                    <option>তজুমদ্দিন</option>
                    <option>লালমোহন</option>
                  </>
                )}
                {district == "বরগুনা" && (
                  <>
                    <option>আমতলী</option>
                    <option>বরগুনা সদর</option>
                    <option>বেতাগী </option>
                    <option>বামনা</option>
                    <option>পাথরঘাটা</option>
                    <option>তালতলি</option>
                  </>
                )}
                {district == "সিলেট" && (
                  <>
                    <option>বালাগঞ্জ</option>
                    <option>বিয়ানীবাজার</option>
                    <option>বিশ্বনাথ</option>
                    <option>কোম্পানীগঞ্জ</option>
                    <option>ফেঞ্চুগঞ্জ</option>
                    <option>গোলাপগঞ্জ</option>
                    <option>গোয়াইনঘাট</option>
                    <option>জৈন্তাপুর</option>
                    <option>কানাইঘাট</option>
                    <option>সিলেট সদর</option>
                    <option>জকিগঞ্জ</option>
                    <option>দক্ষিণ সুরমা</option>
                    <option>ওসমানী</option>
                  </>
                )}
                {district == "মৌলভীবাজার" && (
                  <>
                    <option>বড়লেখা</option>
                    <option>কমলগঞ্জ</option>
                    <option>কুলাউড়া</option>
                    <option>মৌলভীবাজার সদর</option>
                    <option>রাজনগর</option>
                    <option>শ্রীমঙ্গল</option>
                    <option>জুড়ী</option>
                  </>
                )}
                {district == "হবিগঞ্জ" && (
                  <>
                    <option>নবীগঞ্জ</option>
                    <option>বাহুবল</option>
                    <option>আজমিরীগঞ্জ</option>
                    <option>বানিয়াচং</option>
                    <option>লাখাই</option>
                    <option>চুনারুঘাট</option>
                    <option>হবিগঞ্জ সদর</option>
                    <option>মাধবপুর </option>
                    <option>শায়েস্তাগঞ্জ</option>
                  </>
                )}
                {district == "সুনামগঞ্জ" && (
                  <>
                    <option>সুনামগঞ্জ সদর</option>
                    <option>দক্ষিণ সুনামগঞ্জ</option>
                    <option>বিশ্বম্ভরপুর</option>
                    <option>ছাতক</option>
                    <option>জগন্নাথপুর</option>
                    <option>দোয়ারাবাজার</option>
                    <option>তাহিরপুর</option>
                    <option>ধর্মপাশা</option>
                    <option>জামালগঞ্জ</option>
                    <option>শাল্লা</option>
                    <option>দিরাই</option>
                  </>
                )}
                {district == "নরসিংদী" && (
                  <>
                    <option>বেলাবো</option>
                    <option>মনোহরদী</option>
                    <option>নরসিংদী</option>
                    <option>পলাশ</option>
                    <option>রায়পুরা</option>
                    <option>শিবপুর</option>
                  </>
                )}
                {district == "গাজীপুর" && (
                  <>
                    <option>কালীগঞ্জ</option>
                    <option>কালিয়াকৈর</option>
                    <option>কাপাসিয়া</option>
                    <option>গাজীপুর সদর</option>
                    <option>শ্রীপুর</option>
                  </>
                )}
                {district == "শরীয়তপুর" && (
                  <>
                    <option>শরিয়তপুর সদর</option>
                    <option>নড়িয়া</option>
                    <option>জাজিরা</option>
                    <option>গোসাইরহাট</option>
                    <option>ভেদরগঞ্জ</option>
                    <option>ডামুড্যা</option>
                  </>
                )}
                {district == "নারায়ণগঞ্জ" && (
                  <>
                    <option>আড়াইহাজার </option>
                    <option>বন্দর </option>
                    <option>নারায়নগঞ্জ সদর</option>
                    <option>রূপগঞ্জ </option>
                    <option>সোনারগাঁ </option>
                  </>
                )}
                {district == "টাঙ্গাইল" && (
                  <>
                    <option>বাসাইল</option>
                    <option>ভুয়াপুর</option>
                    <option>দেলদুয়ার</option>
                    <option>ঘাটাইল</option>
                    <option>গোপালপুর</option>
                    <option>মধুপুর</option>
                    <option>মির্জাপুর</option>
                    <option>নাগরপুর</option>
                    <option>সখিপুর</option>
                    <option>টাঙ্গাইল সদর</option>
                    <option>কালিহাতী</option>
                    <option>ধনবাড়ী</option>
                  </>
                )}
                {district == "কিশোরগঞ্জ" && (
                  <>
                    <option>ইটনা</option>
                    <option>কটিয়াদী</option>
                    <option>ভৈরব</option>
                    <option>তাড়াইল</option>
                    <option>হোসেনপুর</option>
                    <option>পাকুন্দিয়া</option>
                    <option>কুলিয়ারচর</option>
                    <option>কিশোরগঞ্জ সদর</option>
                    <option>করিমগঞ্জ</option>
                    <option>বাজিতপুর</option>
                    <option>অষ্টগ্রাম</option>
                    <option>মিঠামইন</option>
                    <option>নিকলী</option>
                  </>
                )}
                {district == "মানিকগঞ্জ" && (
                  <>
                    <option>হরিরামপুর</option>
                    <option>সাটুরিয়া</option>
                    <option>মানিকগঞ্জ সদর</option>
                    <option>ঘিওর</option>
                    <option>শিবালয়</option>
                    <option>দৌলতপুর</option>
                    <option>সিংগাইর</option>
                  </>
                )}
                {district == "ঢাকা" && (
                  <>
                    <option>সাভার</option>
                    <option>ধামরাই</option>
                    <option>কেরাণীগঞ্জ</option>
                    <option>নবাবগঞ্জ</option>
                    <option>দোহার</option>
                  </>
                )}
                {district == "মুন্সিগঞ্জ" && (
                  <>
                    <option>মুন্সিগঞ্জ সদর</option>
                    <option>শ্রীনগর</option>
                    <option>সিরাজদিখান</option>
                    <option>লৌহজং</option>
                    <option>গজারিয়া</option>
                    <option>টংগীবাড়ি</option>
                  </>
                )}
                {district == "রাজবাড়ী" && (
                  <>
                    <option>রাজবাড়ী সদর</option>
                    <option>গোয়ালন্দ</option>
                    <option>পাংশা</option>
                    <option>বালিয়াকান্দি</option>
                    <option>কালুখালী</option>
                  </>
                )}
                {district == "মাদারীপুর" && (
                  <>
                    <option>মাদারীপুর সদর</option>
                    <option>শিবচর</option>
                    <option>কালকিনি</option>
                    <option>রাজৈর</option>
                  </>
                )}
                {district == "গোপালগঞ্জ" && (
                  <>
                    <option>গোপালগঞ্জ সদর</option>
                    <option>কাশিয়ানী</option>
                    <option>টুংগীপাড়া</option>
                    <option>কোটালীপাড়া</option>
                    <option>মুকসুদপুর</option>
                  </>
                )}
                {district == "ফরিদপুর" && (
                  <>
                    <option>ফরিদপুর সদর</option>
                    <option>আলফাডাঙ্গা</option>
                    <option>বোয়ালমারী</option>
                    <option>সদরপুর</option>
                    <option>নগরকান্দা</option>
                    <option>ভাঙ্গা</option>
                    <option>চরভদ্রাসন</option>
                    <option>মধুখালী</option>
                    <option>সালথা</option>
                  </>
                )}
                {district == "পঞ্চগড়" && (
                  <>
                    <option>পঞ্চগড়</option>
                    <option>দেবীগঞ্জ</option>
                    <option>বোদা</option>
                    <option>আটোয়ারী</option>
                    <option>তেতুলিয়া</option>
                  </>
                )}
                {district == "দিনাজপুর" && (
                  <>
                    <option>নবাবগঞ্জ</option>
                    <option>বীরগঞ্জ </option>
                    <option>ঘোড়াঘাট</option>
                    <option>বিরামপুর</option>
                    <option>পার্বতীপুর </option>
                    <option>বোচাগঞ্জ </option>
                    <option>কাহারোল </option>
                    <option>ফুলবাড়ী </option>
                    <option>দিনাজপুর সদর</option>
                    <option>হাকিমপুর </option>
                    <option>খানসামা</option>
                    <option>বিরল </option>
                    <option>চিরিরবন্দর </option>
                  </>
                )}
                {district == "লালমনিরহাট" && (
                  <>
                    <option>লালমনিরহাট সদর</option>
                    <option>কালীগঞ্জ</option>
                    <option>হাতীবান্ধা</option>
                    <option>পাটগ্রাম</option>
                    <option>আদিতমারী </option>
                  </>
                )}
                {district == "নীলফামারী" && (
                  <>
                    <option>সৈয়দপুর </option>
                    <option>ডোমার </option>
                    <option>ডিমলা</option>
                    <option>জলঢাকা</option>
                    <option>কিশোরগঞ্জ</option>
                    <option>নীলফামারী সদর</option>
                  </>
                )}
                {district == "গাইবান্ধা" && (
                  <>
                    <option>সাদুল্লাপুর</option>
                    <option>গাইবান্ধা সদর</option>
                    <option>পলাশবাড়ী</option>
                    <option>সাঘাটা </option>
                    <option>গোবিন্দগঞ্জ </option>
                    <option>সুন্দরগঞ্জ</option>
                    <option>ফুলছড়ি</option>
                  </>
                )}
                {district == "ঠাকুরগাঁও" && (
                  <>
                    <option>ঠাকুরগাঁও সদর</option>
                    <option>পীরগঞ্জ </option>
                    <option>রাণীশংকৈল </option>
                    <option>হরিপুর </option>
                    <option>বালিয়াডাঙ্গী </option>
                  </>
                )}
                {district == "রংপুর" && (
                  <>
                    <option>রংপুর সদর</option>
                    <option>গংগাচড়া</option>
                    <option>তারাগঞ্জ </option>
                    <option>বদরগঞ্জ </option>
                    <option>মিঠাপুকুর </option>
                    <option>পীরগঞ্জ </option>
                    <option>কাউনিয়া </option>
                    <option>পীরগাছা </option>
                  </>
                )}
                {district == "কুড়িগ্রাম" && (
                  <>
                    <option>কুড়িগ্রাম সদর</option>
                    <option>নাগেশ্বরী</option>
                    <option>ভুরুঙ্গামারী</option>
                    <option>ফুলবাড়ী</option>
                    <option>রাজারহাট</option>
                    <option>উলিপুর</option>
                    <option>চিলমারী</option>
                    <option>রৌমারী</option>
                    <option>চর রাজিবপুর</option>
                  </>
                )}
                {district == "শেরপুর" && (
                  <>
                    <option>নালিতাবাড়ী </option>
                    <option>শ্রীবরদী </option>
                    <option>নকলা </option>
                    <option>ঝিনাইগাতী </option>
                  </>
                )}
                {district == "ময়মনসিংহ" && (
                  <>
                    <option>ফুলবাড়ীয়া</option>
                    <option>ত্রিশাল</option>
                    <option>ভালুকা</option>
                    <option>মুক্তাগাছা</option>
                    <option>ময়মনসিংহ সদর</option>
                    <option>ধোবাউড়া</option>
                    <option>ফুলপুর</option>
                    <option>হালুয়াঘাট</option>
                    <option>গৌরীপুর</option>
                    <option>গফরগাঁও</option>
                    <option>ঈশ্বরগঞ্জ</option>
                    <option>নান্দাইল</option>
                    <option>তারাকান্দা</option>
                  </>
                )}
                {district == "জামালপুর" && (
                  <>
                    <option>জামালপুর সদর</option>
                    <option>মেলান্দহ</option>
                    <option>ইসলামপুর</option>
                    <option>দেওয়ানগঞ্জ</option>
                    <option>সরিষাবাড়ী</option>
                    <option>মাদারগঞ্জ</option>
                    <option>বকশীগঞ্জ</option>
                  </>
                )}
                {district == "নেত্রকোণা" && (
                  <>
                    <option>বারহাট্টা</option>
                    <option>দুর্গাপুর</option>
                    <option>কেন্দুয়া</option>
                    <option>আটপাড়া</option>
                    <option>মদন</option>
                    <option>খালিয়াজুরী</option>
                    <option>কলমাকান্দা</option>
                    <option>মোহনগঞ্জ</option>
                    <option>পূর্বধলা</option>
                    <option>নেত্রকোণা সদর</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                গায়ের রং
              </label>
              <select
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
                <option>কালো</option>
                <option>শ্যামলা</option>
                <option>উজ্জ্বল শ্যামলা</option>
                <option>ফর্সা</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 ">
                রক্তের গ্রুপ
              </label>
              <select
                onChange={(e) => {
                  setBloodgroup(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
                <option>এ+</option>
                <option>এ-</option>
                <option>বি+</option>
                <option>বি-</option>
                <option>ও+</option>
                <option>ও-</option>
                <option>এবি+</option>
                <option>এবি-</option>
              </select>
            </div>
          </div>
          {userinfo.gender === "male" ? (
            <div className="col-lg-3 col-6">
              <div class="mb-3">
                <label for="weight" class="form-label text-muted font-14 ">
                  দাঁড়ি
                </label>
                <select
                  onChange={(e) => {
                    setDari(e.target.value);
                  }}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected value="হ্যাঁ">
                    হ্যাঁ
                  </option>
                  <option>না</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="col-lg-3 col-6">
              <div class="mb-3">
                <label for="weight" class="form-label text-muted font-14 ">
                  পর্দার ধরন
                </label>
                <select
                  onChange={(e) => {
                    setPordaType(e.target.value);
                  }}
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>ওরনা </option>
                  <option selected value="হিজাব">
                    হিজাব{" "}
                  </option>
                  <option>নিকাব </option>
                </select>
              </div>
            </div>
          )}
          <div className="col-lg-3 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 ">
                বৈবাহিক অবস্থা
              </label>
              <select
                onChange={(e) => {
                  setMstatus(e.target.value);
                }}
                class="form-select font-hind font-14"
                aria-label="Default select example "
                required
              >
                <option selected value="অবিবাহিত">
                  অবিবাহিত
                </option>

                {userinfo.gender == "male" ? (
                  <>
                    <option>বিবাহিত</option>
                    <option>বিপত্নীক</option>
                  </>
                ) : (
                  <>
                    <option>বিধবা</option>
                  </>
                )}
                <option>ডিভোর্সড</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="weight" class="form-label font-14 text-muted">
              বর্তমান ঠিকানা
            </label>
            <textarea
              onChange={(e) => {
                setPresentaddress(e.target.value);
              }}
              name=""
              class="form-control "
              id=""
              rows="2"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label font-14 text-muted">
              রাজনৈতিক দৃষ্টিভঙ্গি
            </label>
            <textarea
              onChange={(e) => {
                setPolitics(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label font-14 text-muted">
              নিজের সম্পর্কে
            </label>
            <textarea
              onChange={(e) => {
                setSelfinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="3"
              required
            ></textarea>
          </div>
          <div className="col-lg-3 col-4 offset-lg-9 offset-8">
            <button type="submit" class="btn btn-search text-white w-100">
              পরবর্তী
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
