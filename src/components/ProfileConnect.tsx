"use client";

import React from "react";
import { useAccount, useConnect } from "wagmi";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

export default function ProfileConnect() {
  const { address: fid, isConnected } = useAccount();
  const { connect } = useConnect();

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: farcasterFrame() })}
        className="text-sm font-medium text-blue-500 hover:underline"
      >
        Connect Farcaster
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{fid}</span>
      <div className="h-6 w-6 rounded-full bg-gray-200" />
    </div>
  );
}
