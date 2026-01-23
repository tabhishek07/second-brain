import { useReducer, useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function CreateContentModal({ open, onClose }) {
  // Return null if not open to keep the DOM clean
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");
  if (!open) return null;

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link || !type) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content/create`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Content added successfully!");

      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";

      // 2. Close the modal automatically
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something messed up with server!");
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 1. The Backdrop Overlay */}
      <Toaster />
      <div
        className="absolute inset-0 bg-slate-400 opacity-60"
        onClick={onClose}
      />

      {/* 2. The Modal Content Card */}
      <div className="relative bg-white p-6 rounded-lg shadow-xl border border-gray-200 min-w-[320px] z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Content</h2>
          <div
            className="cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={onClose}
          >
            <CloseIcon />
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <Input reference={titleRef} placeholder="Title" />
          <Input reference={linkRef} placeholder="Link (URL)" />
          {/* <Input placeholder="Type" /> */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-slate-300 rounded-md p-2"
          >
            <option value="" disabled>
              Type
            </option>
            <option value="twitter">Twitter</option>
            <option value="youtube">Youtube</option>
          </select>

          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              text="Submit"
              fullWidth
              onClick={addContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
