"use client";

import { useFrameSDK } from "~/hooks/useFrameSDK";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import Confessions from "~/components/Confessions";
import Feed from "~/components/Feed";

function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the vibes.engineering template</CardTitle>
        <CardDescription>
          This is an example card that you can customize or remove
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Place content in a Card here.</Label>
      </CardContent>
    </Card>
  );
}


export default function MiniApp() {
  const { isSDKLoaded } = useFrameSDK();
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit-farfession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farfession: text }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      // Save to localStorage
      const newEntry = { text, timestamp: Date.now() };
      const existing = JSON.parse(window.localStorage.getItem("farfessions") || "[]");
      existing.unshift(newEntry);
      if (existing.length > 25) existing.pop();
      window.localStorage.setItem("farfessions", JSON.stringify(existing));
      setText("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[400px] mx-auto py-2 px-2 space-y-4">
      <div>
        <h2 className="text-xl font-bold">Farfession</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          placeholder="Write your farfession..."
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || status === "submitting"}
          className={`mt-2 font-medium py-2 px-4 rounded ${
            !text.trim() || status === "submitting"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-sm mt-1">
            {!text.trim()
              ? "Please enter a farfession."
              : "Failed to submit farfession. Please try again."}
          </p>
        )}
        {status === "success" && (
          <p className="text-green-500 text-sm mt-1">Farfession submitted!</p>
        )}
        <Feed />
      </div>
      <Confessions />
    </div>
  );
}
