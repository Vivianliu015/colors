function rbg2hex(s) {
	var a = s.split("(")[1].split(")")[0];

	a = a.split(",");

	var b = a.map(function (x) {
		x = parseInt(x).toString(16);      
		return (x.length == 1) ? "0" + x : x; 
	})

	b = "#" + b.join("");
	b=b.toUpperCase();
	return b;
}

function getPos(el) {
	var rect = el.getBoundingClientRect();
	return { x: rect.left + (rect.right - rect.left) / 2, y: rect.top + (rect.bottom - rect.top) / 2 };
}

let circles = document.getElementById("wrapper").children;

console.log(circles)

for (let i = 0; i < circles.length; i++) {
	let circleGroup = circles[i].children

	for (let j = 0; j < circleGroup.length; j++) {
		let circle = circleGroup[j]
		circle.id = "c" + i + j



		let circleText = document.createElement("p");
		circleText.style.position = "absolute"
		circleText.id = "p" + i + j
		circleText.style.display = "none"

		circleText.innerHTML = rbg2hex(getComputedStyle(circle).getPropertyValue("background-color"))

		setInterval(function () {
			circleText.style.left = `${getPos(circle).x -90}px`
			circleText.style.top = getPos(circle).y + "px"
			circleText.style.color='white'
			circleText.style.fontFamily='Montserrat Alternates'
			circleText.style.fontSize='25px'


		}, 1);

		document.getElementById("texts").appendChild(circleText)

		console.log(circleText)
		console.log(circle)




		circle.addEventListener("mouseover", function (event) {
			for (let i = 0; i < circles.length; i++) {
				for (let j = 0; j < circles[i].children.length; j++) {
					let ele = circles[i].children[j]
					if (i != circle.id.charAt(1) || j != circle.id.charAt(2)) {
						ele.style.display = "none"
						 
					} else {
						document.getElementById("p"+i+j).style.display = "block"
					}
				}
			}
		}, false);

		circle.addEventListener("mouseleave", function (event) {
			for (let i = 0; i < circles.length; i++) {
				for (let j = 0; j < circles[i].children.length; j++) {
					let ele = circles[i].children[j]
					ele.style.display = "block"
					document.getElementById("p"+i+j).style.display = "none"
				}
			}
		}, false);
	}

}