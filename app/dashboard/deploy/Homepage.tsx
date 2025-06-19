"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Input } from "@/components/ui/input";
import { io } from "socket.io-client";

import { Fira_Code } from "next/font/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

const firaCode = Fira_Code({ subsets: ["latin"] });
function Home({ repo, userId }: { repo: any; userId: any }) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [repoURL, setURL] = useState<any>();
  const [depdata, setDepdata] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [logs, setLogs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [deployPreviewURL, setDeployPreviewURL] = useState<string>("");

  const logContainerRef = useRef<HTMLElement>(null);
  const depDataRef = useRef<string>("");

  const isValidURL: [boolean, string | null] = useMemo(() => {
    if (!repoURL || repoURL.trim() === "") return [false, null];
    const regex = new RegExp(
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/
    );
    return [regex.test(repoURL), "Enter valid Github Repository URL"];
  }, [repoURL]);

  const handleClickDeploy = async (e: any) => {
    console.log("starting deploy", e, repoURL);
    setLoading(true);
    setDeployPreviewURL("");
    setLogs([]);
    setError(null);
    try {
      const resp = await axios.post(`${apiURL}/project`, {
        gitURL: e || repoURL,
        userId: userId,
      });

      if (resp.data && resp.data.id) {
        socket.emit("subscribe", resp.data.id);
        setLogs((prev) => [...prev, "Deploying..."]);
        const deploy = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/deploy`,
          {
            projectId: resp.data.id,
            gitURL: e || repoURL,
          }
        );
        console.log("deploy", deploy.data);

        setDepdata(deploy?.data?.uri);
      }
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "An error occurred");
          return;
        }
      } else {
        setError(error.message);
      }
    }
  };
  const handleRepo = async (e: any) => {
    setURL(e);
    handleClickDeploy(e);
  };

  useEffect(() => {
    depDataRef.current = depdata;
  }, [depdata]);
  const handleSocketIncommingMessage = useCallback((message: any) => {
    if (message.log == "Done") {
      setLoading(false);
      setDeployPreviewURL(depDataRef.current);
    }
    setLogs((prev) => [...prev, message.log]);

    logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket.on("log", handleSocketIncommingMessage);
  }, [handleSocketIncommingMessage]);
  return (
    <main className="flex justify-center items-center flex-col md:flex-row gap-4 p-4 flex-wrap">
      <div className="w-full md:w-1/3 sm:mt-10 ">
        <span className="flex justify-start items-center gap-2">
          {/* <Github className="text-5xl" /> */}
          <svg
            className="w-8 h-8 text-gray-100"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.385.6.111.793-.261.793-.579
              0-.287-.011-1.244-.016-2.254-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
              -1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304
              3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.931
              0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176
              0 0 1.008-.322 3.3 1.23a11.497 11.497 0 0 1 3.003-.403
              c1.019.005 2.047.137 3.004.403 2.289-1.552 3.295-1.23 3.295-1.23
              .654 1.653.243 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221
              0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.1.823 2.219
              0 1.603-.015 2.896-.015 3.293 0 .32.191.694.801.576
              C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          <Input
            disabled={loading}
            value={repoURL}
            onChange={(e) => setURL(e.target.value)}
            type="url"
            placeholder="Github URL"
          />
        </span>
        <Button
          onClick={() => handleClickDeploy("")}
          disabled={!isValidURL[0] || loading}
          className="w-full mt-5"
        >
          {loading ? "In Progress" : "Deploy"}
        </Button>

        {/* seprator */}
        <div className="flex items-center gap-4 w-full mt-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-100 text-lg font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        {deployPreviewURL && (
          <div className="mt-2 bg-slate-900 py-4 px-2 rounded-lg">
            <p>
              Preview URL{" "}
              <Link
                target="_blank"
                className="text-sky-400 bg-sky-950 px-3 py-2 rounded-lg"
                href={deployPreviewURL}
              >
                {deployPreviewURL}
              </Link>
            </p>
          </div>
        )}
        {error && (
          <div className="mt-2 bg-slate-900 py-4 px-2 rounded-lg">
            <p className="text-sky-400 bg-sky-950 px-3 py-2 rounded-lg">
              {error}
            </p>
          </div>
        )}
        <div className="max-w-xl mx-auto  shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Import Git Repository</h2>

          {/* Account Dropdown + Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-1">
              {/* GitHub Icon */}
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.385.6.111.793-.261.793-.579
              0-.287-.011-1.244-.016-2.254-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
              -1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304
              3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.931
              0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176
              0 0 1.008-.322 3.3 1.23a11.497 11.497 0 0 1 3.003-.403
              c1.019.005 2.047.137 3.004.403 2.289-1.552 3.295-1.23 3.295-1.23
              .654 1.653.243 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221
              0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.1.823 2.219
              0 1.603-.015 2.896-.015 3.293 0 .32.191.694.801.576
              C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span className="text-sm">{repo[0]?.owner.login}</span>
              <svg
                className="w-4 h-4 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Repositories List */}
          <div className="divide-y border rounded-lg h-72 overflow-y-scroll">
            {repo?.map((repoData: any, idx: any) => (
              <div key={idx} className="flex items-center justify-between p-3 ">
                <div>
                  <p className="font-medium">{repoData.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(repoData.created_at).toLocaleDateString("en-US")}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleRepo(repoData.html_url)}
                  disabled={loading}
                >
                  Import
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2   ">
        {logs.length > 0 && (
          <div
            className={`${firaCode.className} text-sm text-green-500  mt-5 border-green-500 border-2 rounded-lg p-4 md:mx-5 w-full overflow-y-auto h-[60vh]`}
          >
            <pre className="flex flex-col gap-1">
              {logs.map((log, i) => (
                <code
                  ref={logs.length - 1 === i ? logContainerRef : undefined}
                  key={i}
                >{`> ${log}`}</code>
              ))}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
