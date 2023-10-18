import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CopyToClipboardButton = () => {
  const handleClick = () => {
    navigator.clipboard.writeText(window.location);
    toast.success("লিংক কপি করা হয়েছে", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      icon: false,
    });
    ButtonPressed.postMessage("");
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={handleClick}
        className="btn-down ms-3 fw-500 text-white font-lal font-18 border-0 px-3 moboff"
        style={{ borderRadius: 5 }}
      >
        <i class="fa-solid fa-paperclip me-3"></i>বায়োডাটা লিংক কপি করুন
      </button>
      <button
        onClick={handleClick}
        className="btn-down fw-500 text-white font-lal font-14 border-0 px-2 mobc"
        style={{ borderRadius: 5 }}
      >
        <i class="fa-solid fa-paperclip me-1"></i>বায়োডাটা লিংক
      </button>
    </>
  );
};

export default CopyToClipboardButton;
