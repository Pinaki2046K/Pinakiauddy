'use client';

import { useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface WindowProps {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
  titleBarActions?: React.ReactNode;
}

export default function Window({
  id,
  title,
  children,
  defaultWidth = 680,
  defaultHeight = 520,
  defaultX,
  defaultY,
  minWidth = 400,
  minHeight = 320,
  titleBarActions,
}: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow, openWindow } =
    useWindowStore();
  const isMobile = useIsMobile();
  const w = windows[id];

  const isFocused = w?.isFocused ?? false;
  const zIndex = w?.zIndex ?? 10;

  // Default position: stagger from center
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const x = defaultX ?? Math.max(60, (viewportW - defaultWidth) / 2 + Math.random() * 40 - 20);
  const y = defaultY ?? Math.max(44, (viewportH - defaultHeight) / 2 + Math.random() * 40 - 20);

  // Mobile: render as full-width card instead of draggable window
  if (isMobile) {
    return (
      <motion.div
        className={`window window--mobile ${isFocused ? 'window--focused' : ''}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2 }}
        onClick={() => focusWindow(id)}
      >
        <WindowTitleBar
          id={id}
          title={title}
          isFocused={isFocused}
          onClose={() => closeWindow(id)}
          onMinimize={() => minimizeWindow(id)}
          titleBarActions={titleBarActions}
        />
        <div className="window-body">{children}</div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        style={{ position: 'fixed', zIndex, pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <Rnd
          default={{ x, y, width: defaultWidth, height: defaultHeight }}
          minWidth={minWidth}
          minHeight={minHeight}
          bounds="window"
          dragHandleClassName="window-titlebar"
          style={{ pointerEvents: 'all' }}
          onMouseDown={() => focusWindow(id)}
          enableResizing={{
            top: true, right: true, bottom: true, left: true,
            topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
          }}
        >
          <div
            className={`window ${isFocused ? 'window--focused' : 'window--inactive'}`}
            style={{ width: '100%', height: '100%' }}
          >
            <WindowTitleBar
              id={id}
              title={title}
              isFocused={isFocused}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              titleBarActions={titleBarActions}
            />
            <div className="window-body">{children}</div>
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
}

function WindowTitleBar({
  id,
  title,
  isFocused,
  onClose,
  onMinimize,
  titleBarActions,
}: {
  id: WindowId;
  title: string;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  titleBarActions?: React.ReactNode;
}) {
  return (
    <div className={`window-titlebar ${isFocused ? 'window-titlebar--focused' : ''}`} aria-label={`${title} window title bar`}>
      <div className="traffic-lights" role="group" aria-label="Window controls">
        <button
          className="traffic-light traffic-light--red"
          onClick={onClose}
          aria-label={`Close ${title}`}
          title="Close"
        />
        <button
          className="traffic-light traffic-light--yellow"
          onClick={onMinimize}
          aria-label={`Minimize ${title}`}
          title="Minimize"
        />
        <button
          className="traffic-light traffic-light--green"
          onClick={() => {}}
          aria-label="Expand (not functional)"
          title="Expand"
        />
      </div>
      <span className={`window-title ${isFocused ? '' : 'window-title--inactive'}`}>
        {title}
      </span>
      <div className="window-title-actions">
        {titleBarActions}
      </div>
    </div>
  );
}
