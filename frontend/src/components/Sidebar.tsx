import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

export function Sidebar(){
    return(
        <div className="border-r border-slate-400 w-56 p-2">
            <div className="flex gap-2 items-center p-4">
                <Logo />
                <h2 className="text-xl font-bold">Second-Brain</h2>
            </div>
            <div>
                <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-sm">
                    <TwitterIcon/>
                    <p className="font-semibold text-sm">Twitter</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-sm">
                    <YoutubeIcon/>
                    <p className="font-semibold text-sm">Youtube</p>
                </div>
            </div>
        </div>
    )
}