import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Download = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading' | 'valid' | 'expired'
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/resource/${id}`);
        const item = res.data;
        console.log("Data fetched:", item);

        if (item.type === "file") {
          setStatus("valid");
          setData(item);
        } else if (item.type === "link") {
          window.location.href = item.link; // redirect
        }
      } catch (err) {
        setStatus("expired");
      }
    };

    fetchData();
  }, [id]);

  if (status === "loading") return <p className="p-5">Loading...</p>;

  if (status === "expired")
    return (
      <div className="text-center mt-10 text-red-600 font-semibold text-xl">
        ❌ This link has expired or doesn't exist.
      </div>
    );

  return (
    <div className="text-center mt-10">
      <p className="text-lg font-semibold mb-3">
        ✅ File is ready to download:
      </p>
      <a
        href={`http://localhost:3000/${data.filePath}`}
        download={data.originalName}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download {data.originalName}
      </a>
    </div>
  );
};

export default Download;
