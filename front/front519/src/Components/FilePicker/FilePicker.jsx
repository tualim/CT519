import React, { useRef } from "react";

const filePicker = ({ fileSelect }) => {
  const fileInput = useRef(null);

  const handleFileInput = (event) => {
    fileSelect(event.target.files[0]);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        name="image"
        onChange={handleFileInput}
        className="px-9 py-3 grid flex-wrap mx-auto justify-center border border-primary border-rounded text-primary hover:bg-gray-400 hover:text-white"
      />
      <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        type="button"
        hidden
      />
    </div>
  );
};

export default filePicker;
