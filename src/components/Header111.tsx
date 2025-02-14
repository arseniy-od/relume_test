import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header111Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header111 = (props: Header111Props) => {
  const { heading, description, buttons, image } = {
    ...Header111Defaults,
    ...props,
  } as Props;
  return (
    <>
      <section id="relume" className="relative px-[5%]">
        <div className="container">
          <div className="flex max-h-[60rem] min-h-svh py-16 md:py-24 lg:py-28">
            <div className="grid md:grid-cols-2 md:gap-20">
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6  md:text-9xl">
                {heading}
              </h1>
              <div className="mx-[7.5%] flex flex-col justify-end">
                <p className="text-base text-text-alternative md:text-md">{description}</p>
                <div className="mt-6 flex gap-x-4 md:mt-8">
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
        <div className="absolute inset-0 -z-10">
          <img src={image.src} className="size-full object-cover" alt={image.alt} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </section>
      <div className="h-screen"></div>
    </>
  );
};

export const Header111Defaults: Header111Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary-alt" }],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
};