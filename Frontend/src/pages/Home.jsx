import React, { useState } from "react";
import UploadSection from "../components/UploadSection";
import ExpirySelector from "../components/ExpirySelector";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

function Home() {
  const [input, setInput] = useState(null);
  const [password, setPassword] = useState(null);
  const [expiry, setExpiry] = useState("3600");
  const [link, setLink] = useState("");
  const [inputMode, setInputMode] = useState("file");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");
    setLink("");

    if (inputMode === "file") {
      if (!input) {
        setLoading(false);
        return setError("Please select a file before generating.");
      }

      const formData = new FormData();
      formData.append("file", input);
      formData.append("password", password);
      formData.append("expiry", expiry);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload/file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // replace `token` with your actual token variable
            },
          }
        );
        setLink(res.data.link);
        toast.success("Link Generated!");
      } catch (error) {
        setError("Failed to upload file. Please try again.");
        toast.error("Something went wrong");
      }
    } else {
      if (!input || !input.startsWith("http")) {
        setLoading(false);
        return setError("Please enter a valid URL.");
      }
      const formData = new FormData();
      formData.append("password", password);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload/link`,
          {
            link: input,
            expiry,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // replace `token` with your actual token variable
            },
          }
        );
        setLink(res.data.link);
        toast.success("Link Generated!");
      } catch (error) {
        setError("Failed to upload link. Please try again.");
        toast.error("Something went wrong");
      }
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  // Function to handle redirection
  const handleRedirect = async () => {
    if (!link) return;

    const token = localStorage.getItem("token");
    const id = link.split("/")[4];

    try {
      // First check if it's protected
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/resource/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request aa gayi");
      console.log(res.data.isProtected);

      if (res.data.isProtected) {
        const password = prompt("Enter the password to access the link:");
        if (!password) {
          toast.error("Password is required to access this link.");
          return;
        }

        // Try again with password
        try {
          const resWithPassword = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/file/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: { password },
            }
          );

          window.open(link, "_blank"); // ✅ Finally open the link
        } catch (err) {
          if (err.response && err.response.status === 403) {
            toast.error("Incorrect password. Please try again.");
          } else {
            toast.error("Something went wrong.");
          }
        }
      } else {
        // No protection, open directly
        window.open(link, "_blank");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen pt-32 flex-col items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Try it now
              </h2>
              <p className="text-xl text-gray-400">
                Generate your first secure link in seconds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Upload Your File or Link
                </h3>
                <UploadSection
                  onInputChange={setInput}
                  onPasswordChange={setPassword}
                  onModeChange={setInputMode}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-6">Select Expiry</h3>
                <ExpirySelector onSelect={setExpiry} />
              </motion.div>
            </div>

            <div className="text-center">
              {error && <p className="text-red-400 text-lg mb-4">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 text-white px-10 py-4 text-xl cursor-pointer rounded-xl hover:bg-indigo-700 transition"
                onClick={handleGenerate}
              >
                Generate Secure Link
              </motion.button>
              {loading && (
                <p className="mt-4 text-indigo-400 text-lg animate-pulse">
                  Processing...
                </p>
              )}
            </div>
          </div>
        </div>

        {link && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-20 container mx-auto px-6"
          >
            <div className="max-w-2xl mx-auto bg-gray-800 shadow-2xl rounded-2xl p-10 border border-gray-700">
              <p className="text-green-400 text-xl font-medium mb-6">
                Your secure link is ready:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <a
                  rel="noopener noreferrer"
                  onClick={handleRedirect}
                  className="text-blue-400 text-lg underline break-words"
                >
                  {link}
                </a>
              </div>
              <div className="my-6 flex justify-center">
                <QRCodeSVG value={link} size={128} />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="w-full mt-4 px-8 py-3 text-lg bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Copy to Clipboard
              </motion.button>
            </div>
          </motion.section>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
