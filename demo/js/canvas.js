;(function(window, undefined) {

	var ctx = document.querySelector("canvas").getContext("2d"),
	
	    W = 320,
	    H = 180,

	    imageData = ctx.createImageData(W,H),

	    d = imageData.data,
	    N = 300,
	    a = 0,

	    CX = -1.77810334274064037110522326038852639499207961414628307584575173232969154440,
	    CY = 0.00767394242121339392672671947893471774958985018535019684946671264012302378,
	    CZ = 8,

	    interval;

	function render() {

		var r,i,t,n,_x,_y,__x,__y;

		a += 0.01;
		CZ *= 0.9;

		for(var y = 0; y < H; y++) {

			_y = (y/H-0.5)*CZ*H/W+CY;
			__y = _y;

			for(var x = 0; x < W; x++) {

				_x = (x/W-0.5)*CZ+CX;
				__x = _x;

				_x = CX + (__x-CX)*Math.cos(a) - (__y-CY)*Math.sin(a);
				_y = CY + (__x-CX)*Math.sin(a) + (__y-CY)*Math.cos(a);

				r=i=t=0;n=N;

				while(r*r+i*i<128&&n--) {
					r = r*r-i*i+_x;
					i = 2*t*i+_y;t=r;
				}
				
				n=n>0?(N-n-Math.log(Math.log(r*r+i*i)/Math.log(2))/Math.log(2))*0.1:0;
				i = (y*W+x)*4;

				d[i++] = n&&Math.sin(n+120)*255;
				d[i++] = n&&Math.sin(n+240)*255;
				d[i++] = n&&Math.sin(n+360)*255;
				d[i++] = 255;
			}
		}

		ctx.putImageData(imageData,0,0);

		if (CZ <= 1e-10) { CZ = 4; }
	}

	ctx.canvas.onmouseover = function() { interval = window.setInterval(render, 1000 / 60); };
	ctx.canvas.onmouseout  = function() { window.clearInterval(interval); };

	render();

}(window));