import { useState } from "react";
export const Contact = ({ activestep, setActivestep }) => {
  const [phone, setPhone] = useState("");
  const [gphone, setGphone] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");

  const consubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (activestep) {
      setActivestep("commitif");
    }
    const data = new FormData();

    data.append("token", token);
    data.append("phone", phone);
    data.append("gphone", gphone);
    data.append("relation", relation);
    data.append("email", email);

    fetch(`${import.meta.env.VITE_SERVER}/addcontactinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          document.getElementById("pills-com-tab").click();
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
        <form className="row" onSubmit={consubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            যোগাযোগের তথ্য
          </p>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14 ">
                আপনার মোবাইল নাম্বার
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                class="form-control"
                placeholder="+৮৮০ ১৭০০০০০০০০"
                required
              />
              <small className="font-lal font-12">
                আপনার মোবাইল নাম্বারটি আমানহ অফিস থেকে যোগাযোগের জন্য নেওয়া
                হচ্ছে। ওয়েবসাইটে কিংবা অভিভাবকদের কাছে এটি প্রকাশ করা হবে না।{" "}
              </small>
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14 ">
                অভিভাবকের মোবাইল নাম্বার
              </label>
              <input
                onChange={(e) => {
                  setGphone(e.target.value);
                }}
                type="text"
                class="form-control"
                placeholder="+৮৮০ ১৭০০০০০০০০"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14 ">
                অভিভাবকের সাথে সম্পর্ক
              </label>
              <input
                onChange={(e) => {
                  setRelation(e.target.value);
                }}
                type="text"
                class="form-control"
                placeholder="বাবা / মা / চাচা / খালা / মামা "
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14 ">
                ই-মেইল এড্রেস
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                class="form-control"
                placeholder="ex@mail.com"
                required
              />
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
