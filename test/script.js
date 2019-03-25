var square = JC(".red-square");
var square_child = square.select("div");

square.rule({
    background: "red",
    width: "200px",
    height: "200px"
});

square_child.rule({
    width: "20px",
    height: "20px",
    background: "black"
});

square.select_rule("hover", {
    background: "blue"
});

JC(".red-square").rule({
    opacity: 0.5
});

JC.apply_style();

window.onload = function () {
    square_child.bind(
        "onmouseover",
        function () {
            alert("Hi");
        }
    );

    console.log(JC(".red-square").rules);
}
