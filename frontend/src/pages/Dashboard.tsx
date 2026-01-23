import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/Share";
import { useContent } from "../hooks/useContext";

export function Dashboard() {
  const [open, setIsOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(()=>{
    refresh();
  }, [open])


  return (
    <div className="flex-1 p-4 overflow-y-auto h-screen bg-gray-100">
      <CreateContentModal open={open} onClose={() => setIsOpen(false)} />
      {/* navbar */}
      <div className="flex justify-end pt-2 gap-2 pr-3 pb-3 ">
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
      <div className="flex gap-6   flex-wrap">
        {/* {JSON.stringify(contents)} */}
        {contents.map(({ type, title, link }) => (
          <Card title={title} type={type} link={link} />
        ))}
      </div>
    </div>
  );
}
