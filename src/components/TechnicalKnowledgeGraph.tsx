import React, { useState, useMemo } from 'react';
import { Search, Share2, CheckCircle, Cpu } from 'lucide-react';
import { graphNodesData, graphEdgesData, GraphNode } from '../data/knowledgeGraph';

export const TechnicalKnowledgeGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('python');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');

  const selectedNode = useMemo(
    () => graphNodesData.find((n) => n.id === selectedNodeId) || graphNodesData[0],
    [selectedNodeId]
  );

  // Find neighbor connected nodes
  const connectedNeighbors = useMemo(() => {
    const neighbors = new Set<string>();
    graphEdgesData.forEach((edge) => {
      if (edge.source === selectedNode.id) neighbors.add(edge.target);
      if (edge.target === selectedNode.id) neighbors.add(edge.source);
    });
    return Array.from(neighbors).map((id) => graphNodesData.find((n) => n.id === id)).filter(Boolean) as GraphNode[];
  }, [selectedNode]);

  // Filtered nodes based on category and search
  const filteredNodes = useMemo(() => {
    return graphNodesData.filter((node) => {
      const matchesCategory = activeCategory === 'all' || node.category === activeCategory;
      const matchesSearch =
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'security', label: 'Security & Mitigation' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'tools', label: 'Tools & CI' }
  ];

  return (
    <section id="knowledge-graph" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#131512] relative">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                Taxonomy // Connected Tooling
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                Relational Model
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              Technical knowledge graph,{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                connected.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              Explore how programming languages, defensive security frameworks, web runtimes, and CI pipelines interoperate across real engineering projects.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] p-1 rounded font-[var(--mono)] text-xs self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'graph' ? 'bg-[var(--accent)] text-[var(--bg)] font-bold' : 'text-[var(--secondary-text)]'
              }`}
            >
              Graph Canvas
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[var(--accent)] text-[var(--bg)] font-bold' : 'text-[var(--secondary-text)]'
              }`}
            >
              Accessible List
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[36px] px-3 py-1 text-xs font-[var(--mono)] rounded transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[var(--accent)] text-[var(--bg)] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                    : 'bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] border border-[var(--border)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technology..."
              className="w-full pl-9 pr-3 py-2 bg-[var(--surface)] border border-[var(--border)] text-xs font-[var(--mono)] text-[var(--primary-text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
        </div>

        {viewMode === 'graph' ? (
          /* Visual Graph & Detail Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Custom SVG Node-Link Canvas */}
            <div className="lg:col-span-8 bg-[#0A0B09] border border-[var(--border-strong)] p-4 sm:p-6 overflow-hidden relative min-h-[380px] flex items-center justify-center">
              <svg viewBox="0 0 820 280" className="w-full h-auto" role="img" aria-label="Technical Skills Knowledge Graph">
                {/* Relationships / Edges */}
                {graphEdgesData.map((edge, idx) => {
                  const src = graphNodesData.find((n) => n.id === edge.source);
                  const tgt = graphNodesData.find((n) => n.id === edge.target);
                  if (!src || !tgt) return null;

                  const isConnectedToSelected = selectedNode.id === src.id || selectedNode.id === tgt.id;

                  return (
                    <line
                      key={idx}
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={isConnectedToSelected ? '#C7FF45' : 'rgba(240, 240, 233, 0.12)'}
                      strokeWidth={isConnectedToSelected ? 2 : 1}
                      strokeDasharray={isConnectedToSelected ? 'none' : '3,3'}
                    />
                  );
                })}

                {/* Nodes */}
                {graphNodesData.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const isNeighbor = connectedNeighbors.some((n) => n.id === node.id);
                  const isVisibleInFilter = filteredNodes.some((n) => n.id === node.id);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer transition-opacity"
                      opacity={isVisibleInFilter ? 1 : 0.25}
                    >
                      <circle
                        r={isSelected ? 18 : isNeighbor ? 14 : 11}
                        fill={isSelected ? '#C7FF45' : isNeighbor ? '#1D211C' : '#131512'}
                        stroke={isSelected ? '#0A0B09' : isNeighbor ? '#C7FF45' : 'rgba(240,240,233,0.3)'}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />
                      <text
                        y={isSelected ? 30 : 25}
                        textAnchor="middle"
                        fill={isSelected ? '#C7FF45' : isNeighbor ? '#F0F0E9' : '#9BA195'}
                        fontSize={isSelected ? '11' : '9.5'}
                        fontWeight={isSelected ? '700' : '500'}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-4 text-[0.65rem] font-[var(--mono)] text-[var(--muted)] pointer-events-none">
                💡 Click any node to highlight related companions and inspect verified project usage.
              </div>
            </div>

            {/* Selected Node Details Card */}
            <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border-strong)] p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider bg-[var(--raised)] border border-[var(--border)] text-[var(--accent)] font-bold">
                  {selectedNode.category}
                </span>
                <Cpu className="w-4 h-4 text-[var(--accent)]" />
              </div>

              <h3 className="text-xl font-bold text-[var(--primary-text)] mb-2">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-[var(--secondary-text)] leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              {/* Connected Neighbor Skills */}
              <div className="mb-6">
                <div className="text-xs font-[var(--mono)] uppercase text-[var(--secondary-text)] font-semibold mb-2 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Connected Companion Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {connectedNeighbors.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      type="button"
                      onClick={() => setSelectedNodeId(neighbor.id)}
                      className="px-2 py-1 text-[0.7rem] font-[var(--mono)] bg-[var(--raised)] border border-[var(--border)] text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                      {neighbor.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Project References */}
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-xs font-[var(--mono)] uppercase text-[var(--secondary-text)] font-semibold mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Applied In Projects:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--secondary-text)]">
                  {selectedNode.projectsUsedIn.map((proj, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[var(--primary-text)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Accessible List View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 bg-[var(--surface)] border transition-all cursor-pointer ${
                  selectedNode.id === node.id ? 'border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]' : 'border-[var(--border)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-sm text-[var(--primary-text)]">{node.name}</strong>
                  <span className="text-[0.65rem] font-[var(--mono)] uppercase text-[var(--accent)] px-1.5 py-0.5 bg-[var(--raised)]">
                    {node.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed mb-3">
                  {node.description}
                </p>
                <div className="text-[0.7rem] font-[var(--mono)] text-[var(--muted)]">
                  Projects: {node.projectsUsedIn.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
