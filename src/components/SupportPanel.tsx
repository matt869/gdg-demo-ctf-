import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { LifeBuoy, X, Minimize2, Maximize2, GripVertical, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  question: string;
  answer: string;
}

const topics: Topic[] = [
  {
    id: "start",
    question: "Where do I start?",
    answer:
      "Pick a track on the home page. Defense covers log analysis, alert triage and incident response. Offense covers enumeration, exploitation and privilege escalation. Each track opens with a beginner room that needs no prior setup.",
  },
  {
    id: "rooms",
    question: "How do rooms work?",
    answer:
      "A room groups challenges around one topic. Work through them in order - each one states its objective, the points it is worth and roughly how long it takes. The progress bar fills as challenges are completed.",
  },
  {
    id: "difficulty",
    question: "What do the difficulty labels mean?",
    answer:
      "Beginner assumes no background. Intermediate assumes you are comfortable with a terminal and basic networking. Advanced assumes prior hands-on experience and expects you to research on your own.",
  },
  {
    id: "requirements",
    question: "Do I need to install anything?",
    answer:
      "No. Rooms run in the browser. A note-taking app of your choice is the only thing worth having open alongside.",
  },
  {
    id: "stuck",
    question: "I am stuck on a challenge.",
    answer:
      "Re-read the objective and check what the room gave you - logs, a host, a file. If you are still blocked, bring the question to the community chat; talking through your reasoning is usually faster than another hour alone.",
  },
];

export default function SupportPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>(topics[0].id);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("support-panel-position");
    if (saved) {
      try {
        setPosition(JSON.parse(saved));
      } catch {
        // ignore a malformed stored value
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("support-panel-position", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = dragRef.current.startX - e.clientX;
      const dy = dragRef.current.startY - e.clientY;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 80, dragRef.current.initialX + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 80, dragRef.current.initialY + dy)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="fixed z-50"
      style={{
        right: position.x,
        bottom: position.y,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open help"
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        >
          <LifeBuoy className="w-6 h-6" />
        </button>
      ) : (
        <div
          className={cn(
            "bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
            isMinimized ? "w-64 h-14" : "w-80 sm:w-96 h-[450px]"
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center justify-between p-3 bg-muted/50 border-b border-border cursor-grab">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <LifeBuoy className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Help</p>
                {!isMinimized && (
                  <p className="text-xs text-muted-foreground">Common questions</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1" data-no-drag>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7"
                aria-label={isMinimized ? "Expand help" : "Minimise help"}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7"
                aria-label="Close help"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="h-[330px]">
                <div className="p-3 space-y-2" data-no-drag>
                  {topics.map((topic) => {
                    const expanded = openTopic === topic.id;
                    return (
                      <div key={topic.id} className="rounded-lg border border-border/60 overflow-hidden">
                        <button
                          onClick={() => setOpenTopic(expanded ? null : topic.id)}
                          aria-expanded={expanded}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {topic.question}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 shrink-0 text-muted-foreground transition-transform",
                              expanded && "rotate-180"
                            )}
                          />
                        </button>
                        {expanded && (
                          <p className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
                            {topic.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-border flex items-center gap-2" data-no-drag>
                <Link href="/rooms" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Browse rooms
                  </Button>
                </Link>
                <Button size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
