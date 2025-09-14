import { useRef, useState, useEffect } from "react";

interface WindowProps {
    title: string;
    children: React.ReactNode;
    startX?: number;
    startY?: number;
    onClose?: () => void;
}

export default function Window({ title, children, startX = 100, startY = 100}: WindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: startX, y: startY});
    const [dragging, setDrag] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0});
    const [show, setShow] = useState(true);

    const startDrag = (e: React.MouseEvent) => {
        setDrag(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        });
    };

    useEffect(() => {
        const duringDrag = (e: MouseEvent) => {
            if (!dragging) return;
            setPos({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
            });
        };

    const stopDrag = () => setDrag(false);

    if (dragging) {
        document.addEventListener("mousemove", duringDrag);
        document.addEventListener("mouseup", stopDrag);
    }

    return () => {
        document.removeEventListener("mousemove", duringDrag);
        document.removeEventListener("mouseup", stopDrag);
    }
    }, [dragging, offset]);

    const onClose = () => setShow(false); {
        if (!show) return null;
    }

  return (
    <div
        ref={windowRef}
        className="convex window"
        style={{ left: pos.x, top: pos.y, position: "absolute"}}>
            <div className="window-header" onMouseDown={startDrag}>
                <button onClick={onClose} className="convex window-header-button">X</button>
                <span>{title}</span>
            </div>
            <div>{children}</div>
        </div>
  )
}