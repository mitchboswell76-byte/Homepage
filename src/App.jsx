import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const nodes = [
  { id: 'atlas-engine', label: 'Atlas Engine', x: 71, y: 26, size: 'anchor', note: 'Core system where half-formed ideas are translated into navigable constellations.' },
  { id: 'mind-map-core', label: 'Mind Map Core', x: 82, y: 33, size: 'anchor', note: 'A dense cluster of active thoughts connected by themes, contradictions, and open hypotheses.' },
  { id: 'luminous-notes', label: 'Luminous Notes', x: 76, y: 47, size: 'anchor', note: 'Highlighted fragments worth revisiting; bright because they repeatedly prove useful.' },
  { id: 'future-visions', label: 'Future Visions', x: 64, y: 40, size: 'anchor', note: 'Speculative projections and unfinished sketches for later eras of work.' },
  { id: 'philosophy-lens', label: 'Philosophy Lens', x: 88, y: 22, size: 'anchor', note: 'The perspective filter: ethics, meaning, and first-principles scrutiny.' },
  { id: 'learning-paths', label: 'Learning Paths', x: 92, y: 43, size: 'anchor', note: 'Curated routes through books, experiments, and teachers that build durable understanding.' },
  { id: 'studio-log', label: 'Studio Log', x: 69, y: 57, size: 'medium', note: 'Short records of process, mistakes, and directional pivots.' },
  { id: 'signal-notes', label: 'Signal Notes', x: 84, y: 57, size: 'medium', note: 'Clear observations separated from ambient information noise.' },
  { id: 'field-notes', label: 'Field Notes', x: 60, y: 52, size: 'medium', note: 'Captured in transit, often rough, usually unexpectedly valuable.' },
  { id: 'archive', label: 'Archive', x: 74, y: 65, size: 'medium', note: 'Dormant but indexed ideas, waiting for a new context.' },
  { id: 'draft-threads', label: 'Draft Threads', x: 87, y: 66, size: 'medium', note: 'Parallel narrative strands under active drafting.' },
  { id: 'open-questions', label: 'Open Questions', x: 95, y: 53, size: 'medium', note: 'Unresolved prompts that guide upcoming inquiry.' },
  { id: 'memory-ports', label: 'Memory Ports', x: 56, y: 38, size: 'medium', note: 'Access points into older work, experiences, and references.' },
  { id: 'slow-interfaces', label: 'Slow Interfaces', x: 66, y: 62, size: 'medium', note: 'Experiments in calm interaction design and deliberate digital pacing.' },
  { id: 'node-a1', x: 62, y: 28, size: 'small' },
  { id: 'node-a2', x: 79, y: 20, size: 'small' },
  { id: 'node-a3', x: 91, y: 30, size: 'small' },
  { id: 'node-a4', x: 72, y: 37, size: 'small' },
  { id: 'node-a5', x: 80, y: 41, size: 'small' },
  { id: 'node-a6', x: 68, y: 49, size: 'small' },
  { id: 'node-a7', x: 90, y: 48, size: 'small' },
  { id: 'node-a8', x: 78, y: 58, size: 'small' },
  { id: 'node-a9', x: 63, y: 67, size: 'small' },
  { id: 'node-a10', x: 93, y: 61, size: 'small' }
];

const links = [
  ['atlas-engine', 'mind-map-core'],
  ['atlas-engine', 'future-visions'],
  ['atlas-engine', 'luminous-notes'],
  ['mind-map-core', 'philosophy-lens'],
  ['mind-map-core', 'learning-paths'],
  ['luminous-notes', 'signal-notes'],
  ['luminous-notes', 'studio-log'],
  ['future-visions', 'field-notes'],
  ['future-visions', 'memory-ports'],
  ['philosophy-lens', 'node-a2'],
  ['learning-paths', 'open-questions'],
  ['learning-paths', 'node-a7'],
  ['studio-log', 'slow-interfaces'],
  ['slow-interfaces', 'archive'],
  ['archive', 'draft-threads'],
  ['draft-threads', 'open-questions'],
  ['field-notes', 'node-a6'],
  ['signal-notes', 'node-a8'],
  ['mind-map-core', 'node-a3'],
  ['atlas-engine', 'node-a1'],
  ['luminous-notes', 'node-a5'],
  ['future-visions', 'node-a4'],
  ['archive', 'node-a9'],
  ['open-questions', 'node-a10']
];

const sizeScale = {
  anchor: 18,
  medium: 12,
  small: 7
};

const anchorIds = new Set(nodes.filter((n) => n.size === 'anchor').map((n) => n.id));

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), []);

  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set();
    const next = new Set([hoveredId]);
    links.forEach(([a, b]) => {
      if (a === hoveredId) next.add(b);
      if (b === hoveredId) next.add(a);
    });
    return next;
  }, [hoveredId]);

  const activeNode = activeId ? nodeMap[activeId] : null;

  const handlePointerMove = (event) => {
    if (prefersReducedMotion) return;
    const { clientWidth, clientHeight } = event.currentTarget;
    const x = (event.clientX / clientWidth - 0.5) * 2;
    const y = (event.clientY / clientHeight - 0.5) * 2;
    setPointer({ x, y });
  };

  return (
    <main
      className="atlas-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      onClick={() => setActiveId(null)}
    >
      <div className="atmosphere" aria-hidden="true" />
      <section className="copy-block">
        <p className="eyebrow">Personal Knowledge Constellation</p>
        <h1>
          Atlas of
          <br />
          Ideas
        </h1>
        <p className="intro">
          A calm map of long-running thoughts, experiments, and unfinished threads.
          Move slowly through the stars to surface what should be explored next.
        </p>
      </section>

      <motion.section
        className="constellation-zone"
        animate={
          prefersReducedMotion
            ? false
            : {
                x: pointer.x * 8,
                y: pointer.y * 8
              }
        }
        transition={{ type: 'spring', stiffness: 30, damping: 20, mass: 1.5 }}
      >
        <motion.div
          className="constellation-field"
          animate={prefersReducedMotion ? false : { x: [0, 4, -3, 0], y: [0, -3, 2, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {links.map(([a, b]) => {
              const start = nodeMap[a];
              const end = nodeMap[b];
              const isHot = hoveredId && (a === hoveredId || b === hoveredId);
              const isDimmed = hoveredId && !isHot;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  className={`link ${isHot ? 'is-hot' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const isConnected = hoveredId ? connectedIds.has(node.id) : false;
            const isDimmed = hoveredId && !isConnected;
            const isAnchor = node.size === 'anchor';
            return (
              <motion.button
                key={node.id}
                type="button"
                className={`node ${node.size} ${isDimmed ? 'is-dimmed' : ''} ${isConnected ? 'is-connected' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  if (anchorIds.has(node.id)) {
                    setActiveId((current) => (current === node.id ? null : node.id));
                  }
                }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                whileFocus={prefersReducedMotion ? undefined : { scale: 1.05 }}
                aria-label={node.label ?? 'Constellation point'}
                aria-haspopup={isAnchor ? 'dialog' : undefined}
                aria-expanded={isAnchor ? activeId === node.id : undefined}
              >
                <span className="dot" style={{ width: sizeScale[node.size], height: sizeScale[node.size] }} />
                {isAnchor && (
                  <motion.span
                    className="halo"
                    animate={prefersReducedMotion ? false : { opacity: [0.2, 0.45, 0.2], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                {node.label ? <span className="label">{node.label}</span> : null}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {activeNode && (
          <motion.aside
            className="detail-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-label={`${activeNode.label} details`}
          >
            <p className="panel-kicker">Selected Node</p>
            <h2>{activeNode.label}</h2>
            <p>{activeNode.note}</p>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="foot-fade" aria-hidden="true" />
    </main>
  );
}
