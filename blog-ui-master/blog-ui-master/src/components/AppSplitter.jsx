import { Box, Chip, Divider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const MIN_WIDTH = 75;

const LeftPane = ({ children, leftWidth }) => {
    const leftRef = useRef(null);

    useEffect(() => {
        if (leftRef.current) {
            leftRef.current.style.width = `${leftWidth}px`;
        }
    }, [leftWidth]);

    return <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>{children}</div>;
};

const AppSplitter = ({ children }) => {
    const [leftWidth, setLeftWidth] = useState(undefined);
    const [separatorXPosition, setSeparatorXPosition] = useState(undefined);
    const [dragging, setDragging] = useState(false);

    const splitPaneRef = useRef(null);

    const onMouseDown = (e) => {
        setSeparatorXPosition(e.clientX);
        setDragging(true);
    };

    const onTouchStart = (e) => {
        setSeparatorXPosition(e.touches[0].clientX);
        setDragging(true);
    };

    const onMove = (clientX) => {
        if (dragging && leftWidth !== undefined && separatorXPosition !== undefined) {
            const newLeftWidth = leftWidth + clientX - separatorXPosition;
            setSeparatorXPosition(clientX);

            if (newLeftWidth < MIN_WIDTH) {
                setLeftWidth(MIN_WIDTH);
                return;
            }

            if (splitPaneRef.current) {
                const splitPaneWidth = splitPaneRef.current.clientWidth;

                if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
                    setLeftWidth(splitPaneWidth - MIN_WIDTH);
                    return;
                }
            }

            setLeftWidth(newLeftWidth);
        }
    };

    const onMouseMove = (e) => {
        e.preventDefault();
        onMove(e.clientX);
    };

    const onTouchMove = (e) => {
        onMove(e.touches[0].clientX);
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchend", onMouseUp);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("touchend", onMouseUp);
        };
    });

    useEffect(() => {
        if (splitPaneRef.current && leftWidth === undefined) {
            const initialWidth = splitPaneRef.current.clientWidth / 2;
            setLeftWidth(initialWidth);
        }
    }, [splitPaneRef, leftWidth]);

    const [leftChild, rightChild] = React.Children.toArray(children);

    return (
        <Box ref={splitPaneRef} sx={{ display: 'flex', flexDirection: 'row', height: '100vh', width:"100%" }} position="fixed">
            <LeftPane leftWidth={leftWidth}>
                {leftChild}
            </LeftPane>
            <Divider
                orientation="vertical"
                sx={{ cursor: 'col-resize', userSelect: 'none' }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                flexItem
            >
                <Chip label={<DragIndicatorIcon/>} size="small"/>
            </Divider>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {rightChild}
            </Box>
        </Box>
    );
};

export default AppSplitter;
