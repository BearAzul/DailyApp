"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toggleFollow } from "@/actions/userAction";
import toast from "react-hot-toast";

const ButtonFollow = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);

    try {
      await toggleFollow(userId);
      toast.success("Followed successfully!");
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("Failed to follow user. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleFollow}
      disabled={loading}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
};

export default ButtonFollow;
