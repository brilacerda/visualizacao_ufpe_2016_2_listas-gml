window.svg = d3.select("body")
.append("svg")
.attr("width", "960px")
.attr("height", "500px");    

svg
.on( "mousedown", function() {
    var p = d3.mouse( this);

    svg.append( "rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", p[0])
        .attr("y", p[1])
        .attr("width", 0)
        .attr("height", 0)
        .attr("stroke", 'gray')
        .attr("fill", 'transparent')
        .attr('stroke-width', '1px')
        .attr('stroke-dasharray', '4px')
        .attr('stroke-opacity', '0.5')
})
.on( "mousemove", function() {
    var s = svg.select("rect");
    if( !s.empty()) {
        var p = d3.mouse( this),

            d = {
                x       : parseInt( s.attr( "x"), 10),
                y       : parseInt( s.attr( "y"), 10),
                width   : parseInt( s.attr( "width"), 10),
                height  : parseInt( s.attr( "height"), 10)
            },
            move = {
                x : p[0] - d.x,
                y : p[1] - d.y
            }
        ;

        if( move.x < 1 || (move.x*2<d.width)) {
            d.x = p[0];
            d.width -= move.x;
        } else {
            d.width = move.x;       
        }

        if( move.y < 1 || (move.y*2<d.height)) {
            d.y = p[1];
            d.height -= move.y;
        } else {
            d.height = move.y;       
        }
       
        s
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("width", d.width)
        .attr("height", d.height)
        //console.log( d);
    }
})
.on( "mouseup", function() {
    svg.select( "rect").remove();
});