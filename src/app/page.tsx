"use client";
import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";
import { BsSend } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowDown,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function PortfolioPage() {
  const [showArrow, setShowArrow] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [IsDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    getDBmessage();
  }, []);

  const inpRefMsg = useRef<HTMLInputElement | null>(null);
  const inpRefName = useRef<HTMLInputElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const notify = () =>
    toast.error("Enter Something to Send", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const getDBmessage = async () => {
    setIsDataLoading(true);
    const res = await fetch("/api/getMessage");
    const response = await res.json();
    setIsDataLoading(false);
    setChat(response);
  };

  const handleclick = async () => {
    const User = inpRefName.current ? inpRefName.current.value : "";
    if (message.length !== 0)
      socket.emit("send_message", {
        name: User ? User : "Anonymous",
        text: message,
      });
    if (inpRefMsg.current) inpRefMsg.current.value = "";
    setMessage("");

    if (message.length === 0) {
      notify();
    } else {
      await fetch("/api/forMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          user: inpRefName.current ? inpRefName.current.value : "Anonymous",
        }),
      });
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowArrow(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[#10192e] text-white font-sans min-h-screen overflow-x-hidden">
      <ToastContainer />

      <div className="homepage flex flex-col min-sm:flex-row min-sm:justify-start justify-start gap-10 mt-20 items-center h-screen">
        {/* Intro Section */}
        <section className="min-sm:h-screen w-[100vw] min-sm:w-[60vw] flex flex-col min-sm:mt-10 min-sm:mb-10 items-center justify-center text-center relative px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-cyan-400">Binod's Homepage 👋</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg text-gray-300 max-w-xl px-4 italic"
          >
            Hey, I’m a Cross-Platform Full Stack Developer crafting modern apps
            using React & React Native for Frontend and Express & Django for Backend..
          </motion.p>

          <div className="buttons lg:hidden w-[70vw] flex flex-row justify-evenly gap-4 items-center mt-6">
            <a href="#project_mobile"><Button variant="contained" color="success">
              Projects
            </Button></a>
            <a href="#tech_stack"><Button variant="contained" color="success">
              Tech Stack
            </Button></a>
          </div>

          {showArrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-10 hidden  min-sm:flex animate-bounce text-cyan-400"
            >
              <FaArrowDown size={28} />
            </motion.div>
          )}

          {/* Project Section */}
          <section className="py-16 px-4 sm:px-6 text-center hidden w-full min-sm:flex flex-col">
            <h2 className="text-3xl font-bold text-cyan-400 mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-2">
              {[
                {
                  title: "Authentication",
                  isCompleted: true,
                  description:
                    "Ready to use custom web authentication based on NextAuth and JWT for time-based session and Email Sending feature.",
                  link:"https://github.com/binnoodx/Authentication"
                },
                {
                  title: "BeatIOE",
                  isCompleted: true,
                  description:
                    "Quiz platform for engineering students. Full-stack app with question feeds, ranking, solutions, and user authentication.",
                  link: "https://beatioe.vercel.app",
                },
                
                {
                  title: "Movie App",
                  isCompleted: true,
                  description:
                    "App made on React Native that fetch Movie Detail from TMDB and Display Trending as well as Search Queries",
                  link:"https://github.com/binnoodx/MovieApp"
                  
                },
                {
                  title: "Productive_Me",
                  isCompleted: false,
                  description:
                    "A Full-stack webapp to track your daily todos , journals , goals and make you productive.",
                  link: "https://beatioe.vercel.app",
                },
                {
                  title: "E-commerce WebApp",
                  isCompleted: false,
                  description:
                    "A Full-stack Ecommerce website including optimize performamce , Better UI/UX and ready to serve website.",
                  link: "https://github.com/binnoodx/Ecommer_x-Frontend",
                },
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#1e293b] p-6 rounded-xl shadow-md shadow-cyan-500/20 text-left"
                >
                  <h3 className="text-xl font-bold text-white mb-2">

                    {(
                      <div className="flex flex-row gap-3">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                        <Stack spacing={1} sx={{ alignItems: 'center' }}>
                          <Stack direction="row" spacing={1}>
                            {project.isCompleted ? <Chip label="Completed" color="success" /> : <Chip label="Working" color="primary" />}

                          </Stack>

                        </Stack>

                      </div>
                    )}
                  </h3>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </section>

        {/* Chat Section */}
        <div className="chatApp w-[90vw] min-sm:w-[30vw] flex flex-col min-sm:h-[70vh] h-[50vh] rounded-t-3xl bg-slate-800">
          <div className="uppertext flex flex-row justify-evenly items-center">
            <h1 className="text-xl font-bold text-white text-center py-2">
              Real time Chatting...
            </h1>
          </div>

          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto px-4 py-2 text-white"
            style={{ scrollbarWidth: "none" }}
          >
            {IsDataLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-lg text-gray-300">Loading chat...</p>
              </div>
            ) : (
              chat.map((msg: any, i) => (
                <div
                  key={i}
                  className="textArea flex flex-row mb-2 justify-between items-center px-1"
                >
                  <div className="mdgsection w-[90vw] min-sm:w-[20vw] flex flex-row">
                    <span className="text-sm text-slate-400 pr-5">
                      {msg.name || msg.sendBy || "Anonymous"}:
                    </span>
                    <h1 className="texty text-white text-sm">
                      {msg.text ?? msg}
                    </h1>
                  </div>
                  <p className="text-[10px] min-sm:text-[12px] italic text-gray-400">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      : "Just now"}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Fixed Chat Input */}
          <div className="inpsec flex flex-row justify-center gap-2 p-2 bg-[#1e293b]">
            <input
              ref={inpRefName}
              className="w-[20vw] min-sm:w-[8vw] h-[5vh] bg-slate-600 px-4 border-white text-white"
              type="text"
              placeholder="Name"
            />
            <input
              ref={inpRefMsg}
              onChange={(e) => setMessage(e.target.value)}
              className="w-[50vw] min-sm:w-[17vw] bg-slate-600 px-4 text-white"
              type="text"
              placeholder="Enter Your Message"
            />
            <button
              onClick={handleclick}
              className="bg-slate-500 text-center flex justify-center items-center cursor-pointer text-white w-[8vw] min-sm:w-[5vw]"
            >
              <BsSend scale={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* About Me */}
      <section className="py-16 px-4 sm:px-6 text-center bg-[#0e1a2b]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">About Me</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I’m a self-taught full stack cross platform developer based in Nepal.
            I love building real-time, scalable applications with technologies
            like React, Next.js, MongoDB, and React Native.
          </p>
        </motion.div>
      </section>

      <section id="project_mobile" className="py-16 px-4 sm:px-6 text-center lg:hidden w-full min-sm:flex flex-col">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-2">
          {[
            {
              title: "RandomlyTV",
              isCompleted: false,
              description:
                "OmeTV-style video chat app using ZEGOCLOUD, Socket.IO & Next.js. Includes random matchmaking, skip, and mobile-ready design.",
            },
            {
              title: "BeatIOE",
              isCompleted: true,
              description:
                "Quiz platform for engineering students. Full-stack app with question feeds, ranking, solutions, and user authentication.",
              link: "https://beatioe.vercel.app",
            },
            {
              title: "Productive_Me",
              isCompleted: false,
              description:
                "A Full-stack webapp to track your daily todos , journals , goals and make you productive.",
              link: "https://beatioe.vercel.app",
            },
            
                
                {
                  title: "Movie App",
                  isCompleted: true,
                  description:
                    "App made on React Native that fetch Movie Detail from TMDB and Display Trending as well as Search Queries",
                  link:"https://github.com/binnoodx/MovieApp"
                  
                },
            {
              title: "E-commerce WebApp",
              isCompleted: false,
              description:
                "A Full-stack Ecommerce website including optimize performamce , Better UI/UX and ready to serve website.",
              link: "https://beatioe.vercel.app",
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-[#1e293b] p-6 rounded-xl shadow-md shadow-cyan-500/20 text-left"
            >
              <h3 className="text-xl font-bold text-white mb-2">

                {(
                  <div className="flex flex-row gap-3">
                    <a href={project.link} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                    <Stack spacing={1} sx={{ alignItems: 'center' }}>
                      <Stack direction="row" spacing={1}>
                        {project.isCompleted ? <Chip label="Completed" color="success" /> : <Chip label="Working" color="primary" />}

                      </Stack>

                    </Stack>

                  </div>
                )}
              </h3>
              <p className="text-gray-300">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>




      {/* Tech Stack */}
      <section id="tech_stack" className="py-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            "React",
            "React Native",
            "Express Js",
            "Python",
            "Next Js",
            "Expo",
            "Node Js",
            "MongoDB",
            "Socket.IO",
            "webRTC",
            "Next-Auth",
            "REST APIs",
            "Shadcn",
            "Tailwind CSS",
          ].map((tech) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.1 }}
              className="bg-[#1e293b] rounded-lg py-4 px-2 shadow-md shadow-cyan-400/20"
            >
              <p className="text-lg font-semibold text-white text-center">
                {tech}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 text-center bg-[#0f172a]">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Connect With Me
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-6 text-cyan-400"
        >
          <a
            href="https://github.com/binnoodx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} />
          </a>
          <a href="mailto:thebinod404@gmail.com">
            <FaEnvelope size={30} />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-[#0f172a] text-sm px-4">
        © {new Date().getFullYear()} Binod. All rights reserved.
      </footer>
    </div>
  );
}
