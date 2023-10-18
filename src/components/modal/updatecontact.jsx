import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Ucontact = () => {
  const [activeid, setActiveid] = useState("");
  const [phone, setPhone] = useState("");
  const [gphone, setGphone] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");

  function consubmit() {
    const data = new FormData();
    data.append("userid", activeid);
    data.append("phone", phone);
    data.append("gphone", gphone);
    data.append("relation", relation);
    data.append("email", email);

    fetch(`${import.meta.env.VITE_SERVER}/updatecontactinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toast.success("যোগাযোগের তথ্য আপডেট করা হয়েছে", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
            icon: false,
          });
        } else {
          toast.error("Error Occured!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
            icon: false,
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
      <div
        class="modal fade animate__animated animate__slideInUp"
        id="cif"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content font-lal">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                যোগাযোগের তথ্য
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row font-lal">
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
                    আপনার ফোন নাম্বারটি আমানহ অফিস থেকে যোগাযোগের জন্য নেওয়া
                    হচ্ছে। ওয়েবসাইটে কিংবা অভিভাবকদের কাছে এটি প্রকাশ করা হবে
                    না।{" "}
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
                  <label for="height" class="form-label text-muted font-14 ">
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
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  আপডেট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
