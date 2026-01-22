import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/Share";

export function Dashboard() {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="flex-1 p-4 overflow-y-auto h-screen bg-gray-100">
      <CreateContentModal open={open} onClose={() => setIsOpen(false)} />
      {/* navbar */}
      <div className="flex justify-end pt-2 gap-2 pr-3 ">
        <Button
          variant="primary"
          text="Add Button"
          startIcon={<PlusIcon />}
          onClick={() => setIsOpen(true)}
        />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        ></Button>
      </div>
      <div className="flex gap-1">
        <Card
          title="Project"
          type="youtube"
          link="https://www.youtube.com/watch/8pmcxUUARzM?si=S0fORHalQTCBBbVI"
        />

        <Card
          title="Project"
          type="twitter"
          link="https://x.com/tabhishek__/status/1961050012311249018?ref_src=twsrc%5Etfw"
        />
      </div>
    </div>
  );
}


