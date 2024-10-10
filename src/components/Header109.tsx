"use client";

import { Button } from "@relume_io/relume-ui";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ButtonProps } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  video: string;
  image: ImageProps;
};

export type Header109Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header109 = (props: Header109Props) => {
  const { heading, description, buttons, video, image } = {
    ...Header109Defaults,
    ...props,
  } as Props;
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const [width, setWidth] = useState(0);

  const useResponsiveWidth = () => {
    useEffect(() => {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const getResponsiveTransform = (
    sm: [string, string],
    md: [string, string],
    lg: [string, string],
  ) => {
    const width = useResponsiveWidth();

    const isSm = width < 768;
    const isMd = width > 768 && width < 992;
    return useTransform(scrollYProgress, [0, 1], isSm ? sm : isMd ? md : lg);
  };

  const videoStyleMotion = {
    y: useTransform(scrollYProgress, [0.5, 1], ["0vh", "40vh"]),
    width: getResponsiveTransform(["100%", "50%"], ["100%", "25%"], ["100%", "10%"]),
    height: getResponsiveTransform(["100%", "25%"], ["100%", "30%"], ["100%", "20%"]),
    top: getResponsiveTransform(["0%", "37.5%"], ["0%", "35%"], ["0%", "40%"]),
    left: getResponsiveTransform(["0%", "25%"], ["0%", "37.5%"], ["0%", "45%"]),
  };

  return (
    <>
      <section id="relume" className="relative flex h-[300vh] flex-col items-center">
        <div className="sticky top-0 flex w-full flex-col items-center justify-center">
          <div className="relative z-10 flex h-screen w-full items-center justify-center">
            <Dialog>
              <DialogTrigger onClick={() => setLoading(true)}>
                <motion.div
                  style={videoStyleMotion}
                  className="absolute inset-0 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
                >
                  <img src={image.src} alt={image.alt} className="size-full object-cover" />
                  <FaCirclePlay className="absolute z-20 size-16 text-white" />
                  <span className="absolute inset-0 z-10 bg-black/50" />
                </motion.div>
              </DialogTrigger>

              <DialogContent className="lg: border-none bg-transparent p-0 lg:max-w-[940px]">
                <div className="flex w-full items-center justify-center">
                  {loading && <CgSpinner className="animate-spin h-16 w-16 text-white" />}
                  <iframe
                    className={`z-0 mx-auto aspect-video h-full w-full ${loading && "hidden"}`}
                    src={video}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setLoading(false)}
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative py-16 md:py-24 lg:pb-28 lg:pt-6">
            <div className="px-[5%]">
              <div className="container max-w-lg">
                <div className="mx-auto w-full text-center">
                  <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                    {heading}
                  </h1>
                  <p className="md:text-md">{description}</p>
                  <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
                    {buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 mt-[100vh]" />
      </section>
      <div className="h-screen"></div>
    </>
  );
};

export const Header109Defaults: Header109Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [
    {
      title: "Button",
    },
    {
      title: "Button",
      variant: "secondary",
    },
  ],
  video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
  image: {
    src: "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316216244aee67_Placeholder%20Video%20-%20Landscape.svg",
    alt: "Relume placeholder image",
  },
};
