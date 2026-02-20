
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeType, ResumeNode, ResumeLink } from '../types';

interface SkillGraphProps {
  activeNodeId: string | null;
  onNodeClick: (id: string | null) => void;
  data: { nodes: ResumeNode[]; links: ResumeLink[] };
}

const SkillGraph: React.FC<SkillGraphProps> = ({ activeNodeId, onNodeClick, data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<ResumeNode, ResumeLink> | null>(null);
  const nodeSelRef = useRef<d3.Selection<SVGGElement, ResumeNode, SVGGElement, unknown> | null>(null);
  const linkSelRef = useRef<d3.Selection<SVGLineElement, ResumeLink, SVGGElement, unknown> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .html(""); // Clear previous content

    // Deep copy nodes and links because D3 mutates them
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<any, any>(nodes)
      .force("link", d3.forceLink<any, any>(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    simulationRef.current = simulation;

    const g = svg.append("g");

    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value) * 2);

    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    node.append("circle")
      .attr("r", d => d.val / 2 + 5)
      .attr("fill", d => {
        if (d.type === NodeType.SKILL) return "#3b82f6"; // blue-500
        if (d.type === NodeType.EXPERIENCE) return "#f59e0b"; // amber-500 (Updated for distinction)
        return "#10b981"; // emerald-500
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", d => d.val / 2 + 15)
      .attr("text-anchor", "middle")
      .text(d => d.label)
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("fill", "#475569");

    nodeSelRef.current = node as any;
    linkSelRef.current = link as any;

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  useEffect(() => {
    if (!nodeSelRef.current || !linkSelRef.current) return;

    const node = nodeSelRef.current;
    const link = linkSelRef.current;

    if (!activeNodeId) {
      node.style("opacity", 1);
      link.attr("stroke-opacity", 0.6).attr("stroke", "#cbd5e1");
    } else {
      const connectedNodeIds = new Set<string>([activeNodeId]);
      data.links.forEach(l => {
        const sourceId = (l.source as any).id || l.source;
        const targetId = (l.target as any).id || l.target;
        if (sourceId === activeNodeId) connectedNodeIds.add(targetId);
        if (targetId === activeNodeId) connectedNodeIds.add(sourceId);
      });

      node.style("opacity", d => connectedNodeIds.has(d.id) ? 1 : 0.2);
      link.attr("stroke-opacity", l => {
        const s = (l.source as any).id || l.source;
        const t = (l.target as any).id || l.target;
        return (s === activeNodeId || t === activeNodeId) ? 1 : 0.05;
      });
      link.attr("stroke", l => {
        const s = (l.source as any).id || l.source;
        const t = (l.target as any).id || l.target;
        return (s === activeNodeId || t === activeNodeId) ? "#3b82f6" : "#cbd5e1";
      });
    }

    node.on("click", (event, d) => onNodeClick(activeNodeId === d.id ? null : d.id));
  }, [activeNodeId, onNodeClick, data]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Graph Legend
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div> Core Skill
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div> Experience
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Certification
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-xs text-slate-400 italic">Drag to explore • Click to filter</span>
      </div>
      <svg ref={svgRef} className="w-full h-[500px]"></svg>
    </div>
  );
};

export default SkillGraph;
