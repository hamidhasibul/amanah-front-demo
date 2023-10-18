import { useState, useEffect } from "react";
export const UavaterW = ({ setUpdate, update }) => {
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
        if (res.message == true) {
          setUpdate(update + 1);
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
      <div className="container">
        <div class=" row font-lal">
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            প্রতিচ্ছবি
          </p>
          {userinfo.gender == "female" ? (
            <>
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
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
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
