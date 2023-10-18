import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Uavater = ({ update, setUpdate }) => {
  const [activeid, setActiveid] = useState("");
  const [avater, setAvater] = useState("");
  const [userinfo, setUserInfo] = useState([]);

  function Avatersubmit() {
    const data = new FormData();
    data.append("avater", avater);
    data.append("userid", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/updateavatersub`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setUpdate(update + 1);
          toast.success("প্রতিচ্ছবি আপডেট করা হয়েছে", {
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

  const getUserInfo = () => {
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
      })
      .catch((err) => console.log(err));
  };

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
        setActiveid(res.avater[0].userid);
        setAvater(res.avater[0].avater);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllInfo();
    getUserInfo();
  }, []);

  return (
    <>
      <div
        class="modal fade"
        id="vif"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header font-lal">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                প্রতিচ্ছবি
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row font-lal">
              {userinfo.gender == "female" ? (
                <>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="1"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}1.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="2"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}2.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="3"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}3.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="4"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}4.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="5"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}5.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                  <div className="col-lg-4  col-12 mb-2 text-center">
                    <label class="avatars">
                      <input
                        type="radio"
                        name="avatar"
                        onChange={(e) => {
                          setAvater(e.target.value);
                        }}
                        value="6"
                        class="form-check-input"
                      />
                      <img
                        src={`${import.meta.env.VITE_IMG}6.png`}
                        alt=""
                        class="member_img"
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="my-2">
                <button
                  type="submit"
                  onClick={Avatersubmit}
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
