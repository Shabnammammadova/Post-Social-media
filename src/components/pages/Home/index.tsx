import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { DialogDemo } from "../../../components/Dialog"
export default function Home() {
    return (
        <>
            <DialogDemo />
            <Card className="w-full max-w-md rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                    <img
                        src="/placeholder.svg"
                        alt="Post Image"
                        width="800"
                        height="400"
                        className="object-cover aspect-[2/1]"
                    />
                </CardContent>
                <CardFooter className="p-4 grid gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                            <div className="font-medium">Post Title</div>
                            <div className="text-xs text-muted-foreground">0h ago</div>
                        </div>
                    </div>
                    <div>Post tag</div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <HeartIcon className="w-5 h-5" />
                                <span className="sr-only">Like</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MessageCircleIcon className="w-5 h-5" />
                                <span className="sr-only">Comment</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <ShareIcon className="w-5 h-5" />
                                <span className="sr-only">Share</span>
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">0 likes • 0 comments</div>
                    </div>
                </CardFooter>
            </Card>
        </>

    )
}

function HeartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}


function MessageCircleIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    )
}


function ShareIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}