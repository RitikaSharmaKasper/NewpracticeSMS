// import React,{useState,useRef,useEffect} from 'react';
// import * as d3 from "d3";
// function AcrossClassesGraph() {
//   const svgRef = useRef(null);
//   const wrapperRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const [width, setWidth] = useState(0);
//   const gridTicks = [25, 50, 75];

//   const data = [
//     { subject: "A+", marks: 400 },
//     { subject: "A", marks: 208 },
//     { subject: "B+", marks: 78 },
//     { subject: "B", marks: 88 },
//     { subject: "C", marks: 308 },
//     { subject: "D", marks: 120 },
//     { subject: "F", marks: 88 },
//   ];

//   /* Resize Observer */
//   useEffect(() => {
//     if (!wrapperRef.current) return;

//     const observer = new ResizeObserver((entries) => {
//       setWidth(entries[0].contentRect.width);
//     });

//     observer.observe(wrapperRef.current);
//     return () => observer.disconnect();
//   }, []);

//   /* Draw Chart */
//   useEffect(() => {
//     if (!width) return;

//     const height = 300;
//     const margin = { top: 20, right: 20, bottom: 40, left: 50 };

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     svg.attr("width", width).attr("height", height);

//     const chart = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const xScale = d3
//       .scaleBand()
//       .domain(data.map((d) => d.subject))
//       .range([0, innerWidth])
//       .padding(0.25);

//     const yScale = d3.scaleLinear().domain([0, 500]).range([innerHeight, 0]);

//     const grid = chart.append("g").call(
//       d3
//         .axisLeft(yScale)

//         .tickSize(-innerWidth)
//         .tickFormat(() => "")
//     );

//     grid
//       .selectAll("line")
//       .attr("stroke", "#e6e6e6")
//       .attr("stroke-dasharray", "2 2");

//     grid
//       .selectAll("line")
//       .filter((d) => d === 0 || d === yScale.domain()[1])
//       .remove();

//     chart
//       .append("g")
//       .call(d3.axisLeft(yScale).tickValues([0, 100, 200, 300, 400, 500]));

//     chart.selectAll(".domain").attr("stroke", "#e6e6e6");

//     chart
//       .append("g")
//       .attr("transform", `translate(0,${innerHeight})`)
//       .call(d3.axisBottom(xScale))
//       .call((g) => g.selectAll("line").remove()) // remove tick lines
//       .call((g) => g.select(".domain").remove()) // remove bottom axis line
//       .call((g) =>
//         g
//           .selectAll("text") // style labels
//           .attr("fill", "#1c1c1c")
//           .attr("font-size", "13px")
//           .attr("font-weight", "500")
//       );
//     chart
//       .append("g")
//       .attr("transform", `translate(0,${innerHeight})`)
//       .call(d3.axisBottom(xScale))
//       .call((g) => g.selectAll("line").remove())
//       .call((g) => g.select(".domain").remove())
//       .call((g) =>
//         g
//           .selectAll("text")
//           .attr("fill", "#1c1c1c")
//           .attr("font-size", "13px")
//           .attr("font-weight", "500")
//       );

//     /* ---------------- Bars (ONLY ONCE) ---------------- */
//     chart
//       .selectAll(".bar")
//       .data(data)
//       .enter()
//       .append("path")
//       .attr("class", "bar")
//       .attr("fill", "#00B4D8")
//       .attr("d", (d) => {
//         const x = xScale(d.subject);
//         const y = yScale(d.marks);
//         const w = xScale.bandwidth();
//         const h = innerHeight - y;
//         const r = 6;

//         return `
//       M ${x}, ${y + r}
//       Q ${x}, ${y} ${x + r}, ${y}
//       L ${x + w - r}, ${y}
//       Q ${x + w}, ${y} ${x + w}, ${y + r}
//       L ${x + w}, ${y + h}
//       L ${x}, ${y + h}
//       Z
//     `;
//       })
//       .on("mouseenter", function (event, d) {
//         d3.select(this).attr("opacity", 0.8);

//         d3.select(tooltipRef.current)
//           .style("opacity", 1)
//           .html(`<strong>${d.subject}</strong><br/>Marks: ${d.marks}`);
//       })
//       .on("mousemove", function (event) {
//         const bounds = wrapperRef.current.getBoundingClientRect();

//         d3.select(tooltipRef.current)
//           .style("left", event.clientX - bounds.left + 10 + "px")
//           .style("top", event.clientY - bounds.top - 40 + "px");
//       })
//       .on("mouseleave", function () {
//         d3.select(this).attr("opacity", 1);
//         d3.select(tooltipRef.current).style("opacity", 0);
//       });
//       chart.selectAll("text")
//   .style("font-family", "Segoe UI")
//   .style("font-size", "12px");
//   }, [width]);

//   return (
//     <div ref={wrapperRef} className="w-full"  style={{ fontFamily: "Segoe UI" }}>
//       <svg ref={svgRef} />
//     </div>
//   );
// }

// export default AcrossClassesGraph;


import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

function AcrossClassesGraph() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(0);

  // ✅ Grouped Data (like image)
  const data = [
    { class: "Nursery A", values: [100, 85, 70, 95, 60, 78] },
    { class: "Nursery B", values: [100, 85, 70, 95, 60, 78] },
    { class: "Nursery C", values: [100, 85, 70, 95, 60, 78] },
    { class: "Nursery D", values: [100, 85, 70, 95, 60, 78] },
  ];

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width) return;

    const height = 320;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* ------------------ GRADIENTS ------------------ */
    const defs = svg.append("defs");

    const colors = [
      ["#FF3B3B", "#FF6B6B"],
      ["#FF7A00", "#FFB347"],
      ["#FFA500", "#FFD580"],
      ["#FFD166", "#FFE7A0"],
      ["#7CB342", "#A5D6A7"],
      ["#2A9D8F", "#80CBC4"],
    ];

    colors.forEach((c, i) => {
      const grad = defs
        .append("linearGradient")
        .attr("id", `grad-${i}`)
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", "0")
        .attr("y2", "1");

      grad.append("stop").attr("offset", "0%").attr("stop-color", c[0]);
      grad.append("stop").attr("offset", "100%").attr("stop-color", c[1]);
    });

    /* ------------------ SCALES ------------------ */
    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.class))
      .range([0, innerWidth])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(d3.range(6))
      .range([0, x0.bandwidth()])
      .padding(0.12);

    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    /* ------------------ GRID ------------------ */
    chart
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat("")
      )
      .selectAll("line")
      .attr("stroke", "#EAEAEA")
      .attr("stroke-dasharray", "3 3");

    /* ------------------ Y AXIS ------------------ */
    chart
      .append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll("text")
          .style("font-family", "Segoe UI")
          .style("font-size", "12px")
      );

    /* ------------------ X AXIS ------------------ */
    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0))
      .call((g) => g.selectAll("line").remove())
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll("text")
          .style("font-family", "Segoe UI")
          .style("font-size", "13px")
          .style("font-weight", "500")
      );

    /* ------------------ BARS ------------------ */
    chart
      .selectAll(".group")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d.class)},0)`)
      .selectAll("path")
      .data((d) => d.values)
      .enter()
      .append("path")
      .attr("d", (d, i) => {
        const x = x1(i);
        const y = yScale(d);
        const w = x1.bandwidth();
        const h = innerHeight - y;
        const r = 8; // rounded top

        return `
          M ${x}, ${y + r}
          Q ${x}, ${y} ${x + r}, ${y}
          L ${x + w - r}, ${y}
          Q ${x + w}, ${y} ${x + w}, ${y + r}
          L ${x + w}, ${y + h}
          L ${x}, ${y + h}
          Z
        `;
      })
      .attr("fill", (d, i) => `url(#grad-${i})`);

  }, [width]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", fontFamily: "Segoe UI" }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default AcrossClassesGraph;