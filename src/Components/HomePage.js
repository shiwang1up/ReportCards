import React, { useState } from "react";
import axios from "axios";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBookOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import Loader from "./LoadingAnimation";
import bg from "../assets/bg.jpg";

const grades = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
];

const sections = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
];

const HomePage = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isMissingFieldRequired, setIsMissingFieldRequired] = useState(null);
  const [downloadPath, setDownloadPath] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      grade: parseInt(selectedGrade),
      section: selectedSection,
      isMissingFieldRequired,
    };

    if (!data.grade || !data.section || data.isMissingFieldRequired === null) {
      setError("Please select all required fields.");
      setSuccess(null);
      return;
    }
    setIsLoading(true);
    axios
      .get(
        `http://156.67.111.32:5000/api/PdfNew/${data.grade}/${data.section}/${data.isMissingFieldRequired}`
      )
      .then((response) => {
        setSuccess("Data retrieved successfully!");
        setError(null);
      })
      .catch((error) => {
        setError("Error retrieving data: " + error.message);
        setSuccess(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDownload = () => {
    const data = {
      grade: parseInt(selectedGrade),
      section: selectedSection,
      isMissingFieldRequired,
    };

    if (!data.grade || !data.section || data.isMissingFieldRequired === null) {
      setError("Please select all required fields.");
      setSuccess(null);
      return;
    }
    setIsLoading(true);
    axios
      .get(
        `https://example.com/api/YourControllerName/${data.grade}/${data.section}/${data.isMissingFieldRequired}`
      )
      .then((response) => {
        setSuccess("Data retrieved successfully!");
        setError(null);
      })
      .catch((error) => {
        setError("Error retrieving data: " + error.message);
        setSuccess(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const isFormValid = () => {
    return selectedGrade && selectedSection && isMissingFieldRequired !== null;
  };

  return (
    <div className="bg-[#ebf5fb] h-[100vh] w-[100vw] items-center flex justify-center">
      <div className="z-20 flex justify-between items-center mb-4">
        {isLoading && <Loader />}
      </div>
      <div className="w-full  md:w-2/5 lg:w-5/7 xl:w-4/7 h-screen sm:w-5/6 sm:h-5/6 px-4 md:px-4 py-5 md:py-5 pb-10 md:pb-10  rounded-md shadow-md flex flex-col sm:justify-between justify-around  bg-white ">
        <h2 className="text-center text-3xl font-bold mb-4">
          Report Card Form
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex-1">
            <div className="mb-4 mt-6">
              <div className="items-center mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="grades-section"
                >
                  Grades
                  <SchoolIcon className="ml-1 mr-2" fontSize="small" />{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <Combobox
                placeholder="Select grade"
                defaultValue=""
                data={grades.map((grade) => grade.name)}
                onChange={(value) => setSelectedGrade(value)}
              />
            </div>
            <div className="mb-4">
              <div className="items-center mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="grades-section"
                >
                  Section
                  <MenuBookIcon className="ml-1 mr-2" fontSize="small" />{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <Combobox
                placeholder="Select section"
                defaultValue=""
                data={sections.map((section) => section.name)}
                onChange={(value) => setSelectedSection(value)}
              />
            </div>
            <div className="mb-4">
              <div className="items-center mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="is-missing-field-required"
                >
                  Is Missing Field Required
                  <SearchIcon className="ml-1 mr-2 " fontSize="small" />
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <Combobox
                placeholder="Missing field required?"
                defaultValue=""
                data={["Yes", "No"]}
                onChange={(value) => setIsMissingFieldRequired(value === "Yes")}
              />
            </div>
            <div className="mb-4">
              <div className="items-center mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="download-path"
                >
                  Download Path
                  <DownloadForOfflineOutlinedIcon
                    className="ml-1 mr-2 "
                    fontSize="small"
                  />
                </label>
              </div>
              <Combobox
                hideCaret
                defaultValue=""
                data={[]}
                allowCreate={true}
                placeholder="Enter download path"
                onChange={(value) => setDownloadPath(value)}
                noResults={null}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#3498db] hover:bg-[#2e86c1] text-white font-bold py-2  rounded focus:outline-none w-2/6 focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-[#ec7063] hover:bg-[#e74c3c] text-white font-bold  rounded focus:outline-none focus:shadow-outline w-2/6"
            type="button"
            disabled={!isFormValid()}
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
