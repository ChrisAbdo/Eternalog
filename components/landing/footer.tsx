import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  const navigation = [
    {
      name: "Twitter",
      href: "https://www.twitter.com/abdo_eth",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <Twitter className="h-4 w-4" />
      ),
    },
    {
      name: "GitHub",
      href: "https://www.github.com/chrisabdo",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <Github className="h-4 w-4" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/christopher-abdo/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <Linkedin className="h-4 w-4" />
      ),
    },
  ];
  return (
    <footer className="mb-4">
      <div className="mx-auto max-w-7xl px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button variant="ghost">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="text-center text-xs leading-5 ">
            Built with <Heart className="h-4 w-4 inline" /> by&nbsp;
            <Link
              className="group transition-all duration-300 ease-in-out"
              href="https://www.github.com/chrisabdo"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-muted-foreground to-muted-foreground bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Chris Abdo
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
