import { useState } from "react";
import imglogo from "../assets/imageUploadLogo.png";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [searchText, setSearchText] = useState("");

  const platforms = ["Flipkart", "Amazon", "Croma"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    document.getElementById("fileUpload").value = "";
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  const handleClear = () => {
    setSelectedPlatforms([]);
    setUploadedFile(null);
    setSearchText("");
    props.clearResults(); // 🔥 this hides Main.jsx
  };


  const  handleSubmit = () => {
    console.log("Searching for platforms:", selectedPlatforms);
    console.log("Product name/link:", searchText);


    // Call parent handler
    props.HandleSubmit(selectedPlatforms, searchText);
    
    // reset
    setSelectedPlatforms([]);
    setUploadedFile(null);
    setSearchText("");
};
  return (
    <>
      <div className="SearchBar">
        <div className="Input">
          <div className="ImgContainer">
            {!uploadedFile ? (
              <>
                <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                  <img className="imglogo" src={imglogo} alt="Upload Icon" />
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*,.pdf,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <div className="PreviewContainer">
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="preview"
                  className="PreviewImage"
                />
                <div className="PreviewActions">
                  <label htmlFor="fileUpload" className="icon edit">
                    ✏️
                  </label>
                  <button onClick={handleRemove} className="icon remove">
                    ❌
                  </button>
                </div>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            )}

            <svg
              style={{ width: "25px", opacity: 0.5, backgroundColor: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>

            <svg
              style={{ width: "25px", opacity: 0.5, backgroundColor: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* Controlled text input */}
          <input
            className="InputText"
            type="text"
            placeholder="Enter product name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="SearchButtons">
          <button onClick={handleSubmit} className="Submitbtn">
            Find the smart deal
          </button>

          <button onClick={handleClear} className="Clearbtn">
            Clear results
          </button>

        {/* <button onClick={props.toggleHistory} className="history-trigger">
          🕒 History
        </button> */}
        </div>

      </div>

      {/* Platform selection checkboxes */}
      <div className="PlatformSelect">
        {platforms.map((platform) => (
          <label key={platform} className="PlatformOption">
            <input
              type="checkbox"
              value={platform}
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handlePlatformChange(platform)}
            />
            {platform}
          </label>
        ))}
      </div>

      <div className="slogan">
        <p>Compare across Flipkart, Amazon, Myntra and more</p>
      </div>
    </>
  );
}
