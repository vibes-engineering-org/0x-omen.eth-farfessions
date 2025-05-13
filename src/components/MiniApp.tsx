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
      <Confessions />
      <BucketExplorer />
    </div>
  );
}
