import { useState, useEffect } from "react";
export const Avater = ({ update, setUpdate, activestep, setActivestep }) => {
  const [avater, setAvater] = useState("");
  const [userinfo, setUserInfo] = useState([]);

  const Avatersubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("avater", avater);
    data.append("token", token);
    fetch(`${import.meta.env.VITE_SERVER}/avatersub`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setUpdate(update + 1);
          document.getElementById("pills-home-tab").click();
          window.location("/");
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

  useEffect(() => {
    getUserInfo();
  }, [update]);

  return (
    <>
      <div className="container">
        <form className="row" onSubmit={Avatersubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            প্রতিচ্ছবি
          </p>
          {userinfo.gender == "female" ? (
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 text-center">
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
              <div className="mb-2 text-center">
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
              <div className="mb-2 text-center">
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
              <div className="mb-2 text-center">
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
                    src={`${import.meta.env.VITE_IMG}7.png`}
                    alt=""
                    class="member_img"
                  />
                </label>
              </div>
              <div className=" mb-2 text-center">
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
                    src={`${import.meta.env.VITE_IMG}8.png`}
                    alt=""
                    class="member_img"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 text-center">
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
              <div className="mb-2 text-center">
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
              <div className=" mb-2 text-center">
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
              <div className="mb-2 text-center">
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
                    src={`${import.meta.env.VITE_IMG}9.png`}
                    alt=""
                    class="member_img"
                  />
                </label>
              </div>
              <div className=" mb-2 text-center">
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
                    src={`${import.meta.env.VITE_IMG}10.png`}
                    alt=""
                    class="member_img"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="col-lg-12 mt-3">
            <button type="submit" class="btn btn-search text-white mt-4 w-100">
              সাবমিট
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
