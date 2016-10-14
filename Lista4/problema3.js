// Tive pouco tempo devido a grande demanda da graduação e portanto os partidos não possuem
// as cores correspondente ao mundo real. Caso sobre tempo, realizarei o ajuste.

var width = 1320,
    height = 760;
var partidos = ["PP", "PSB", "PSC", "PT", "PEN", "PMDB", "PTB", "PRB", "PROS", "PDT", "PSDB", "PRTB", "PSDC", "PC do B", "PTC", "PSD", "PRP", "PSOL", "PSL", "PPS", "SD", "REDE", "PV", "PPL", "DEM", "PR", "PHS", "PMN", "PCB", "PSTU", "PCO"]

var format = d3.format(",d");

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(function(c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));

var stratify = d3.stratify()
    .parentId(function(d) { return d.Partido })
    .id(function(d){return d.Candidato});

var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

d3.csv("cand_ver_recife_2016.csv", type, function(error, data) {
  if (error) throw error;

  extra = []
  // add the root and nodes
  extra.push({Candidato : "Vereadores"})
  for (var i = 0; i <= partidos.length; i++) {
    extra.push({Candidato:partidos[i], Partido:"Vereadores"})
  };
  data = extra.concat(data);
  console.log(data)
    
  var root = stratify(data)
      .sum(function(d) { return d.Votos; })
      .sort(function(a, b) { return b.height - a.height || b.Votos - a.Votos; });

  treemap(root);

  d3.select("body")
    .selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .attr("title", function(d) { return d.Candidato + "\n" + format(d.Votos); })
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; })
      .style("background", function(d) { while (d.depth > 1) d = d.parent; console.log(d); return color(d.id); })
    .append("div")
      .attr("class", "node-label")
      .text(function(d) { if (d.depth > 1) return d.id; })
    .append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.value); });
});

function type(d) {
  d.Votos = +d.Votos;
  return d;
}

// Getting the Legends

// part=[]
// for (var i = 0; i < data.length; i++)
// part.push(data[i].Partido)
// var mySet = new Set(part)
// mySet