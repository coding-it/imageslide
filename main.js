$(document).ready(function () {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var img_01 = new Image();
    img_01.src = "1.png";

    var img_02 = new Image();
    img_02.src = "2.png";

    var new_top = 0;

    img_01.onload = function()
    {
        var img_width = img_01.width;
        var img_height = img_01.height;
        new_top = img_height;

        canvas.width = img_width;
        canvas.height = img_height*2;
        context.drawImage(img_01, 0, 0, img_width, img_height);//img, x, y, w, h

        img_02.onload = function() 
        {
            context.drawImage(img_02, 0, img_height, img_width, img_height);//img, x, y, w, h
            var img = canvas.toDataURL("image/png");
            document.getElementById("imageslide").innerHTML +='<img src="' + img + '" class="image-slide"/>';

            $('.image-slide').css({"position": "relative", "top": "0", "transition": "top .2s ease-in-out"});
            $('.imageslide').css({"overflow": "hidden", "height": img_height});

            var niggaFlip = false;

            $('.image-slide').hover(function(){
                var target = (niggaFlip) ? 0 : -new_top;
                $('.image-slide').css({"top": target});
                niggaFlip = !niggaFlip;
            });
        }
    };

	

});