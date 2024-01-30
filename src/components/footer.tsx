import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ExternalLink } from "lucide-react"
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="border-t p-2 bg-card w-full flex gap-4 justify-center items-center">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/32604322?v=4" alt="Avatar" />
          <AvatarFallback>LH</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
            Luiz Henrique da Silva Xinaider
          </h4>
          <div className="flex justify-start gap-6">
            <Link className="text-sm underline flex items-center" rel="noopener noreferrer" href="https://github.com/Moeefa" target="_blank">
              Github <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
            <Link className="text-sm underline flex items-center" rel="noopener noreferrer" href="https://www.linkedin.com/in/xinaider" target="_blank">
              LinkedIn <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}