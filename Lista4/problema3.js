var width = 960,
    height = 1060;

var format = d3.format(",d");

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(function(c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));

var stratify = d3.stratify()
    .parentId(function(d) { return d.Partido });

var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

var data = []
d3.csv("cand_ver_recife_2016.csv", type, function(error, data1) {
  if (error) throw error;
  part = ''
  for (var i = 0; i < data1.length; i++) {
      if (i == 0){
        data.push(d[0])
        // insert root
        data.push("Politica")
        part = d[1].Partido
        data.push("Politica."+part)
      } else if (data1[i] != part){

      } else {
        
      }
  }
    
  

  var root = stratify(data)
      .sum(function(d) { return d.Votos; })
      .sort(function(a, b) { return b.height - a.height || b.Votos - a.Votos; });

  treemap(root);

  d3.select("body")
    .selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .attr("title", function(d) { return d.id + "\n" + format(d.Votos); })
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; })
      .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
    .append("div")
      .attr("class", "node-label")
      .text(function(d) { return d.Candidato; })
    .append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.Votos); });
});

function type(d) {
  d.Votos = +d.Votos;
  return d;
}
