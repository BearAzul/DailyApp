"use client"

import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-1">
              <DotLottieReact
                src="/animations/Loader_cat.lottie"
                loop
                autoplay
                style={{ maxWidth: "400px", margin: "0 auto" }}
              />

              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Please wait
                </h1>
                <p className="text-muted-foreground">
                  Your content is being prepared.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loading;
