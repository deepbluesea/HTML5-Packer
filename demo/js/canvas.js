;(function(window, undefined) {

	var ctx = document.querySelector("canvas").getContext("2d");

	var W = 320;
	var H = 180;

	var imageData = ctx.createImageData(W,H),

		d = imageData.data,
	    N = 600,
	    CX = -1.7451606879398844,
	    CY = -9.383515877032168e-12,
	    CZ = 2.9802322387695312e-8,

	    r,i,t,n,_x,_y;

	for(var y = 0; y < H; y++) {

		_y = (y/H-0.5)*CZ*H/W+CY;

		for(var x = 0; x < W; x++) {

			_x = (x/W-0.5)*CZ+CX;

			r=i=t=0;n=N;

			while(r*r+i*i<128&&n--) {
				r = r*r-i*i+_x;
				i = 2*t*i+_y;t=r;
			}
			
			n=n>0?(N-n-Math.log(Math.log(r*r+i*i)/Math.log(2))/Math.log(2))*0.05:0;
			i = (y*W+x)*4;

			d[i++] = n&&Math.sin(n+120)*255;
			d[i++] = n&&Math.sin(n+240)*255;
			d[i++] = n&&Math.sin(n+360)*255;
			d[i++] = 255;
		}
	}

	ctx.putImageData(imageData,0,0);

}(window));