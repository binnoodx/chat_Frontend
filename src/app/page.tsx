"use client";
import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";
import { BsSend } from "react-icons/bs";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import * as React from 'react';
import { images } from "./constants/images";
import { Chip, Stack } from "@mui/material";
import SpotlightCard from "./Components/Card";
import "@/app/forFonts.css"
import Link from "next/link";


export default function PortfolioPage() {
  const [active, setActive] = useState<number | null>(null);
  const [chatShow, setchatShow] = useState(false)
  const [techStackShow, setTechStackShow] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showAboutMe, setshowAboutMe] = useState(false)
  const [showImages, setshowImages] = useState(false)
  const [showResources, setshowResources] = useState(false)
  const [showBookie, setshowBookie] = useState(false)
  const [showSocialHandles, setshowSocialHandles] = useState(false)


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

  return (
    <div className="  text-white font-sans min-h-screen overflow-x-hidden">
      <ToastContainer />

      <div className="homepage bg-[url('https://r4.wallpaperflare.com/wallpaper/974/565/254/windows-11-windows-10-minimalism-hd-wallpaper-c876bde870303c5820cce16ed8a244ca.jpg')]  w-screen bg-cover flex flex-col-reverse min-sm:flex-row items-center justify-end py-10  lg:justify-between     h-[100vh]">




        <div className="insideFolders flex lg:flex-col flex-col justify-center lg:justify-start lg:item-start ">
          <div className="folders lg:mx-10 mx-5 flex flex-row lg:flex-col  gap-5 ">


            <div onClick={() => {
              setActive(1)
              setshowAboutMe(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.userFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">About Me</h1>
            </div>



            <div onClick={() => {
              setActive(2)
              setShowProjects(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.projects.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Projects</h1>
            </div>


            <div onClick={() => {
              setActive(3)
              setTechStackShow(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.techFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">TechStack</h1>
            </div>


            <div onClick={() => {
              setActive(4)
              setchatShow(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.chatLogo.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Chat</h1>
            </div>


            <div onClick={() => {
              setActive(5)
              setshowImages(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.imageFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Images</h1>
            </div>



          </div>
          <div className="folders lg:mx-10 mx-5 flex mt-3 flex-row lg:flex-col  gap-5 ">
            <div onClick={() => {
              setActive(6)
              setshowSocialHandles(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.contactFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Social Handles</h1>
            </div>



            <div onClick={() => {
              setActive(7)
              setshowResources(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.DocumentFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Resources</h1>
            </div>


            <div onClick={() => {
              setActive(8)
              setshowBookie(true)
            }} className="insideFolder flex justify-center items-center flex-col cursor-pointer">
              <img src={images.bookieFolder.src} className="lg:h-16 lg:w-16 h-12" alt="" />
              <h1 className="text-xs mt-1 normalFont">Book Collection</h1>
            </div>


          </div>
        </div>



        <div className="cardSection lg:mr-[30vw]">
          <SpotlightCard />
        </div>


        {/* Chat Section */}
        <div
          className={
            chatShow
              ? `chatApp absolute border-1 border-white w-[90vw] lg:w-[40vw] lg:ml-[40vw]
          flex flex-col min-sm:h-[70vh] h-[75vh] lg:h-[75vh] bg-slate-800
          ${active === 4 ? "z-1" : "z-0 "}`
              : `chatApp w-[40vw] mr-[20vw] hidden flex-col min-sm:h-[70vh]
          h-[50vh] bg-slate-800`
          }
        >
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Let's Talk Real Time
            </h1>

            <button onClick={() => setchatShow(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


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
          <div className="inpsec flex w-full flex-row justify-center gap-2 p-2 bg-[#1e293b]">
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


        {/* Tech Stack Section */}

        <section id="tech_stack" className={techStackShow ?  `${active === 3 ? "z-1" : "z-0 "} gap-5 border-1 w-[90vw] lg:w-auto h-[75vh] lg:h-auto border-white absolute bg-slate-800 lg:ml-[44vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Binod's Tech Stack
            </h1>

            <button onClick={() => setTechStackShow(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="myTechStack w-[90vw] gap-5 lg:w-auto flex flex-col justify-start items-start py-10 px-5">

            <div className="Framework w-full flex flex-col justify-start items-start">
              <h1 className="normalFont text-xl">Programming Languages</h1>
              <h2>Typescript / Javascript (ES6) / Python / C Basics</h2>

            </div>
            
            <div className="Frontend w-full flex flex-col  justify-start items-start">
              <h1 className="normalFont text-xl">Frontend</h1>
              <h2>React / React Native / Tailwind CSS</h2>

            </div>
            <div className="Backend w-full flex flex-col justify-start items-start">
              <h1 className="normalFont text-xl">Backend</h1>
              <h2>Node Js</h2>

            </div>
            <div className="Framework w-full flex flex-col justify-start items-start">
              <h1 className="normalFont text-xl">Framework</h1>
              <h2>Express JS / Next Js / Expo / Vite</h2>

            </div>
            <div className="Tools & Platform w-full flex flex-col justify-start items-start">
              <h1 className="normalFont text-xl">Tools & Platform</h1>
              <h2>Figma / Postman / Vercel / Git / OAuth / MongoDB / Socket IO</h2>

            </div>





          </div>
        </section>

        {/* About me Section */}

        <section id="about_me" className={showAboutMe ? `${active === 1 ? "z-1" : "z-0 "} gap-5 border-1 w-[90vw] lg:w-[50vw] overflow-scroll lg:overflow-hidden  h-[75vh] lg:h-auto border-white absolute bg-slate-800 lg:ml-[42vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext fixed lg:relative w-[90vw] lg:w-auto  bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              All about Binod
            </h1>

            <button onClick={() => setshowAboutMe(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="mt-3">


            <h1 className="text-start text-slate-300 px-10 paraFont py-2">Hello World , This is <br></br><span className="normalFont text-4xl font-extrabold">Binod Sharma</span><br></br> An aspiring and  multidisciplinary Software Developer Engineer from Nepal. Currently, I am pursuing my Bsc. CSIT at Patan Mutliple Campus. I have high urge to build projects that doesn't even make sense. All I do is put all Creativity and Logics for best outcomes. Choosing Programming over other is best thing ever done in my life. <br></br><br></br>Behind Programming I have several hobbies like <br></br>- Competitive Programming<br></br>- Reading Novels and manga<br></br>- Playing Chess<br></br>- Touring in Bike<br></br>- Doing Maths and Physics<br></br>- Listening Music<br></br>- Photography<br></br>- Watching Anime </h1>




          </div>

        </section>

        {/* Images Section */}

        <section className={showImages ? ` ${active === 5 ? "z-1" : "z-0 "} gap-5 border-1 w-[90vw] lg:w-[50vw]  h-[75vh]  border-white absolute bg-slate-800 lg:ml-[42vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Images By Binod
            </h1>

            <button onClick={() => setshowImages(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="">


            <h1 className="text-start text-slate-300 px-10 paraFont py-2">Sorry No Image Available Right Now</h1>




          </div>

        </section>

        {/* Projects Section */}
        <section className={showProjects ? ` ${active === 2 ? "z-1" : "z-0 "} bg-slate-700 border-2  border-slate-800 w-[90vw] lg:w-auto h-[75vh] lg:h-auto lg:overflow-hidden overflow-y-scroll    absolute lg:ml-[38vw] flex-col` : " bg-slate-700 border-2 hidden border-slate-800   absolute ml-[38vw] flex-col"}>
          <div className="uppertext  overflow-hidden lg:w-full  w-[90vw] bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center  py-2">
              Binod's Projects
            </h1>

            <button onClick={() => setShowProjects(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="grid  grid-cols-1 py-10 px-8 md:grid-cols-2 gap-6 max-w-5xl mx-auto ">
            {[
              {
                title: "Startup",
                isCompleted: false,
                description:
                  "Expected to release on 2026. Contact me for more info.",
                link: "/"
              },
              {
                title: "Authentication",
                isCompleted: true,
                description:
                  "Ready to use custom web authentication based on NextAuth and JWT for time-based session and Email Sending feature.",
                link: "https://github.com/binnoodx/Authentication"
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
                link: "https://github.com/binnoodx/MovieApp"

              },
              {
                title: "Productive_Me",
                isCompleted: true,
                description:
                  "A Full-stack webapp to track your daily todos , journals , goals and make you productive.",
                link: "",
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
                <p className="text-gray-300 text-xs lg:text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Handle Section */}

        <section className={showSocialHandles ? ` ${active === 6 ? "z-1" : "z-0 "} gap-5 border-1 w-[90vw] lg:max-w-[20vw]   h-[75vh] lg:h-auto border-white absolute bg-slate-800 lg:ml-[42vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Let's Connect
            </h1>

            <button onClick={() => setshowSocialHandles(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="flex flex-col">


            <Link target="_blank" href={"https://www.facebook.com/binod.sharma.616611/"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.facebook.src} className="h-10" alt="" />
              <h1 className="paraFont"> /Binod Sharma </h1>
            </Link>
            <Link target="_blank" href={"https://www.instagram.com/the_binodd"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.instagram.src} className="h-10" alt="" />
              <h1 className="paraFont"> /the_binodd </h1>
            </Link>
            <Link target="_blank" href={"www.linkedin.com/in/binoddsharma"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.linkedin.src} className="h-10" alt="" />
              <h1 className="paraFont"> /Binod Sharma </h1>
            </Link>
            <Link target="_blank" href={"https://x.com/the_binodd"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.twitter.src} className="h-10" alt="" />
              <h1 className="paraFont"> /the_binod </h1>
            </Link>
            <Link target="_blank" href={"https://www.youtube.com/@binoodx"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.youtube.src} className="h-10" alt="" />
              <h1 className="paraFont"> /binoodx </h1>
            </Link>
            <Link target="_blank" href={"https://github.com/binnoodx"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.github.src} className="h-10" alt="" />
              <h1 className="paraFont"> /binnoodx </h1>
            </Link>
            <Link target="_blank" href={"https://www.tiktok.com/@binodx_"} className="oneByone flex flex-row items-center mx-5 my-2 gap-3">
              <img src={images.tiktok.src} className="h-10" alt="" />
              <h1 className="paraFont"> /binodx_ </h1>
            </Link>




          </div>

        </section>

        {/* Resources Section */}

        <section className={showResources ? `gap-5 ${active === 7 ? "z-1" : "z-0 "} border-1 w-[90vw] lg:w-[50vw] lg:min-h-[50vh]  h-[75vh] lg:h-auto border-white absolute bg-slate-800 lg:ml-[42vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Resources By Binod
            </h1>

            <button onClick={() => setshowResources(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="h-full flex justify-center items-center">


            <h1 className="text-start text-slate-300 px-10 paraFont py-2">Sorry No Resources Available Right Now</h1>




          </div>

        </section>

        {/* Bookie Section */}

        <section className={showBookie ? `gap-5 border-1 ${active === 8 ? "z-1" : "z-0 "} w-[90vw] lg:w-auto lg:overflow-hidden overflow-scroll h-[75vh] lg:h-auto border-white absolute bg-slate-800 lg:ml-[42vw]  text-center` : "py-16 hidden border-1 border-white absolute bg-slate-800 ml-[40vw] px-4 sm:px-6 text-center"}>
          <div className="uppertext bg-slate-300 text-black flex flex-row justify-between px-10 py-1   items-center">
            <h1 className="text-sm normalFont text-center py-2">
              Rookie Bookie Collections
            </h1>

            <button onClick={() => setshowBookie(false)} className="px-3 cursor-pointer py-1 bg-red-500">X</button>


          </div>
          <div className="booksCollection flex h-full w-full flex-col items-center  ">

            <div className="flex gap-3 flex-row mx-5 my-5">


              <div className="onebyone flex flex-col">
                <img src="https://upload.wikimedia.org/wikipedia/en/8/86/Karnali_Blues_by_Buddhisagar.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Karnali Blues</h1>
                <h2 className="text-xs italic">⭐ 9/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://img.drz.lazcdn.com/static/np/p/3b4328af29f327c02b796ef67c2b1dc8.jpg_720x720q80.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Aithan</h1>
                <h2 className="text-xs italic">⭐ 6/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://media.thuprai.com/front_covers/ek-sarko-maya_front.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Ek sarko Maya</h1>
                <h2 className="text-xs italic">⭐ 8/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://static-01.daraz.com.np/p/5e839d6b91f98053bfb8bc2ad1c20859.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Radha</h1>
                <h2 className="text-xs italic">⭐ -/10</h2>
              </div>




            </div>
            <div className="flex gap-3 flex-row mx-5 my-2">


              <div className="onebyone flex flex-col">
                <img src="https://upload.wikimedia.org/wikipedia/en/d/d9/Summer_Love_%28novel%29.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">SummerLove</h1>
                <h2 className="text-xs italic">⭐ 9/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1407659398i/22889351.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Saaya</h1>
                <h2 className="text-xs italic">⭐ 8/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a0/Phirphire_%28novel%29.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Firfire</h1>
                <h2 className="text-xs italic">⭐ -/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1407659398i/22889351.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Saaya</h1>
                <h2 className="text-xs italic">⭐ 8/10</h2>
              </div>





            </div>
            <div className="flex gap-3 flex-row mx-5 mb-10">
              <div className="onebyone flex flex-col">
                <img src="https://upload.wikimedia.org/wikipedia/en/4/47/Seto_Dharti_by_Amar_Neupane.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Seto Dharti</h1>
                <h2 className="text-xs italic">⭐ -/10</h2>
              </div>


              <div className="onebyone flex flex-col">



                <img src="https://api.bookslandnepal.com/images/9789355434029-7405-1742210004644-1744121898646-1744123176821-1745659240929.jpeg?size=lg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">Ikagai</h1>
                <h2 className="text-xs italic">⭐ 8/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://media.thuprai.com/front_covers/psychology-of-money.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">..</h1>
                <h2 className="text-xs italic">⭐ 8/10</h2>
              </div>
              <div className="onebyone flex flex-col">
                <img src="https://heritagebooks.com.np/wp-content/uploads/2021/10/The-subtle-art-of-not-giving-fucck.jpg" className="h-32 lg:h-42" alt="" />
                <h1 className="text-xs">..</h1>
                <h2 className="text-xs italic">⭐ 7/10</h2>
              </div>






            </div>




          </div>



        </section>




      </div>






    </div>
  );
}
