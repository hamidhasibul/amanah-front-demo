import { useState } from "react";
export const Commetment = ({ activestep, setActivestep }) => {
  const [question1, setQuestion1] = useState("হ্যাঁ");
  const [question2, setQuestion2] = useState("হ্যাঁ");
  const [question3, setQuestion3] = useState("হ্যাঁ");

  const cosubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (activestep) {
      setActivestep("avatarif");
    }
    const data = new FormData();
    data.append("token", token);
    data.append("question1", question1);
    data.append("question2", question2);
    data.append("question3", question3);

    fetch(`${import.meta.env.VITE_SERVER}/addcommitment`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          document.getElementById("pills-avater-tab").click();
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
        <form className="row" onSubmit={cosubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            অঙ্গীকারনামা
          </p>
          <div className="col-12">
            <div class="mb-3 ">
              <label for="weight" class="form-label font-16 ">
                <i class="fa-solid fa-hand-point-right me-2"></i> আল্লাহ'র শপথ
                নিয়ে সাক্ষ্য দিন, বায়োডাটাতে দেয়া তথ্যগুলো সব সত্য?
              </label>
              <select
                onChange={(e) => {
                  setQuestion1(e.target.value);
                }}
                class="form-select w-25"
                aria-label="Default select example "
                required
              >
                <option selected>হ্যাঁ</option>
                <option>না</option>
              </select>
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label font-16 ">
                <i class="fa-solid fa-hand-point-right me-2"></i> আমানাহ
                মেট্রিমোনি-তে অভিভাবক-কে জানিয়ে বায়োডাটা তৈরি করেছেন?
              </label>
              <select
                onChange={(e) => {
                  setQuestion2(e.target.value);
                }}
                class="form-select w-25"
                aria-label="Default select example"
                required
              >
                <option selected>হ্যাঁ</option>
                <option>না</option>
              </select>
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label font-16 ">
                <i class="fa-solid fa-hand-point-right me-2"></i> বায়োডাটায়
                মিথ্যা তথ্য প্রদান করলে আইনগত এবং আখিরাতের দায়ভার আমানাহ
                মেট্রিমোনি নিবেন না। আপনি কি সম্মত?
              </label>
              <select
                onChange={(e) => {
                  setQuestion3(e.target.value);
                }}
                class="form-select w-25"
                aria-label="Default select example"
                required
              >
                <option selected>হ্যাঁ</option>
                <option>না</option>
              </select>
            </div>
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
