import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
function AverageChart() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [width, setWidth] = useState(0);

  const data = [
    { exam: "UT 1", Attendance: 0 },
    { exam: "UT 2", Attendance: 25 },
    { exam: "Mid Term Exam", Attendance: 55 },
    { exam: "UT 3", Attendance: 56 },
    { exam: "UT 4", Attendance: 32 },
    { exam: "Final Exam", Attendance: 30 },
  ];

  /* ---------------- Resize Observer ---------------- */
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- Draw Chart ---------------- */
  useEffect(() => {
    if (!width) return;
    

    const height = 300;
    // const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const margin = { top: 10, right: 40, bottom: 30, left: 30 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    /* ---------------- Gradient Definition ---------------- */
    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
     

    // gradient
    //   .append("stop")
    //   .attr("offset", "0%")
    //   .attr("stop-color", "#007AFF")
    //   .attr("stop-opacity", 0.35);

    // gradient
    //   .append("stop")
    //   .attr("offset", "100%")
    //   .attr("stop-color", "#007AFF")
    //   .attr("stop-opacity", 0);
    gradient
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "rgba(0, 115, 181, 0.25)");

  gradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "rgba(255, 255, 255, 0.10)");

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.exam))
      .range([0, innerWidth])
      .padding(0);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([innerHeight, 0]);

    /* ---------------- Grid Lines ---------------- */
    const grid = chart
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([0, 25, 50, 75, 100])
          .tickSize(-innerWidth)
          .tickFormat("")
      );

    grid
      .selectAll("line")
      .attr("stroke", "#e6e6e6")
      .attr("stroke-dasharray", "2 2");

    grid
      .selectAll("line")
      .filter((d) => d === 100)
      .remove();

    chart
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickValues([0, 25, 50, 75, 100]));

    chart.select(".y-axis").select(".domain").remove();
    chart.selectAll(".y-axis .tick line").remove();

    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    chart.selectAll(".domain").remove();

    chart
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", yScale(100))
      .attr("y2", yScale(100))
      .attr("stroke", "#9CA3AF")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2 2");

    const area = d3
      .area()
      .x((d) => xScale(d.exam))
      .y0(innerHeight)
      .y1((d) => yScale(d.Attendance))
      .curve(d3.curveMonotoneX);

    chart
      .append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    const line = d3
      .line()
      .x((d) => xScale(d.exam))
      .y((d) => yScale(d.Attendance))
      .curve(d3.curveMonotoneX);

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#118AB2")
      .attr("stroke-width", 3)
      .attr("d", line);

    const hoverLine = chart
      .append("line")
      .attr("stroke", "#118AB2")
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .style("opacity", 0);

    chart
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.exam))
      .attr("cy", (d) => yScale(d.Attendance))
      .attr("r", 6)
      .attr("fill", "#118AB2")
       
      .on("mouseenter", (event, d) => {
        const cy = yScale(d.Attendance);
        hoverLine
          .attr("x1", xScale(d.exam))
          .attr("x2", xScale(d.exam))
          .attr("y1", cy)
          .attr("y2", innerHeight)
          .style("opacity", 1);
        d3.select(tooltipRef.current)
          .style("opacity", 1)
        //   .html(`<strong >${d.exam}</strong><br/>Attendance%: ${d.Attendance}`);
        .html(`
  <strong style="color:#1C1C1C">${d.exam}</strong><br/>
  <span style="color:#118AB2">Avg Score: ${d.Attendance}</span>
`);
      })
      .on("mousemove", (event) => {
        const bounds = wrapperRef.current.getBoundingClientRect();
        d3.select(tooltipRef.current)
          .style("left", event.clientX - bounds.left + 10 + "px")
          .style("top", event.clientY - bounds.top - 40 + "px");
      })
      .on("mouseleave", () => {
        hoverLine.style("opacity", 0);
        d3.select(tooltipRef.current).style("opacity", 0);
      });

      chart.selectAll("text")
  .style("font-family", "Segoe UI")
  .style("font-size", "12px");
  
  }, [width]);


  return (
    <div  ref={wrapperRef} className="relative w-full" style={{ fontFamily: "Segoe UI" }}>
      <svg  ref={svgRef} />
      <div
        
        ref={tooltipRef}
        className="absolute bg-[#FFFFFF] text-black px-3 py-2 text-sm pointer-events-none opacity-0"
        style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)',padding:'10px', borderLeft:"4px solid #00B4D8", borderRadius:"8px"}}
      />
      </div>
  );
}


export default AverageChart;