import { useEffect, useState } from "react";
export const UcontactW = ({ activestep, setActivestep }) => {
  const [activeid, setActiveid] = useState("");
  const [phone, setPhone] = useState("");
  const [gphone, setGphone] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");

  function consubmit() {
    if (activestep) {
      setActivestep("commitif");
    }
    const data = new FormData();
    data.append("userid", activeid);
    data.append("phone", phone);
    data.append("gphone", gphone);
    data.append("relation", relation);
    data.append("email", email);

    fetch(`${import.meta.env.VITE_SERVER}/updatecommitment`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
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
  }
  const getAllInfo = () => {
    let token = localStorage.getItem("token");
    const data = new FormData();
    data.append("token", token);
    fetch(`${import.meta.env.VITE_SERVER}/getbiodata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setActiveid(res.contactinfo[0].userid);
        setPhone(res.contactinfo[0].phone);
        setGphone(res.contactinfo[0].gphone);
        setRelation(res.contactinfo[0].relation);
        setEmail(res.contactinfo[0].email);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <>
      <div className="container">
        <div class="row font-lal">
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            যোগাযোগের তথ্য
          </p>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14">
                আপনার মোবাইল নাম্বার
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                class="form-control"
                value={phone}
              />
              <small className="font-lal font-12">
                আপনার ফোন নাম্বারটি আমানহ অফিস থেকে যোগাযোগের জন্য নেওয়া হচ্ছে।
                ওয়েবসাইটে কিংবা অভিভাবকদের কাছে এটি প্রকাশ করা হবে না।{" "}
              </small>
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14">
                অভিভাবকের মোবাইল নাম্বার
              </label>
              <input
                onChange={(e) => {
                  setGphone(e.target.value);
                }}
                type="text"
                class="form-control"
                value={gphone}
              />
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14">
                অভিভাবকের সাথে সম্পর্ক
              </label>
              <input
                onChange={(e) => {
                  setRelation(e.target.value);
                }}
                type="text"
                class="form-control"
                value={relation}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="height" class="form-label text-muted font-14">
                ই-মেইল এড্রেস
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                class="form-control"
                value={email}
              />
            </div>
          </div>

          <div className="my-2">
            <button
              type="submit"
              onClick={consubmit}
              class="btn btn-search text-white w-100"
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
