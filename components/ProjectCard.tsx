import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ProjectCard({ data }: { data: any }) {
  return (
    <Card className="p-4 mb-6 md:mb-0 rounded-md shadow-none hover:shadow-md shadow-gray-100 cursor-pointer transition-all space-y-4  bg-muted">
      <CardTitle className="text-lg font-semibold  ">
        <Link href={data.deployUrl} target="_blank">
          Live URL
        </Link>{" "}
      </CardTitle>
      <CardDescription className=" break-words text-lg text-primary tracking-tight">
        <Link href={data.deployUrl} target="_blank">
          {data.deployUrl}
        </Link>{" "}
      </CardDescription>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          false ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(
            data?.createdAt?.seconds * 1000 +
              Math.floor(data?.createdAt?.nanoseconds / 1e6)
          ).toLocaleDateString("en-US", { dateStyle: "long" })} - ${new Date(
            data?.createdAt?.seconds * 1000 +
              Math.floor(data?.createdAt?.nanoseconds / 1e6)
          ).toLocaleTimeString("en-US", { timeStyle: "short" })}`}
        </p>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
