"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Image, Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { createPost } from "@/actions/postAction";

const CreatePost = () => {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Post created successfully!");
      }

    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-1">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={
                  user?.imageUrl ||
                  `https://ui-avatars.com/api/?name=${user?.username}&background=random`
                }
                alt={user?.username || "User Avatar"}
              />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-3 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <Image className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="size-4 mr-1" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
