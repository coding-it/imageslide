$(document).ready(function () {

    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var img_01 = document.getElementById("img1");
	var img_02 = document.getElementById("img2");
	var new_top = 0;
	
    var img_width = img_01.width;
    var img_height = img_01.height;
    new_top = img_height/2;

    canvas.width = img_width;
    canvas.height = img_height;
    context.drawImage(img_01, 0, 0, img_width, img_height);//img, x, y, w, h
    
        context.drawImage(img_02, 0, img_height, img_width, img_height);//img, x, y, w, h
        var img = canvas.toDataURL("image/png");
        document.write('<img src="' + img + '" class="image-slide"/>');

	$('.image-slide').css({"position": "relative", "top": "0", "transition": "top .2s ease-in-out"});


	$('.image-slide').hover(function(){
    	$('.image-slide').css({"top": -new_top});
	});

});