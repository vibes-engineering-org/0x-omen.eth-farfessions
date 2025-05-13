"use client";

import { useFrameSDK } from "~/hooks/useFrameSDK";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import BucketExplorer from "~/components/BucketExplorer";
import Confessions from "~/components/Confessions";

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

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[400px] mx-auto py-2 px-2 space-y-4">
      <div>
        <h2 className="text-xl font-bold">Farfession</h2>
        <textarea
          maxLength={1000}
          className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          placeholder="Write your farfession..."
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <Confessions />
      <BucketExplorer />
    </div>
  );
}
