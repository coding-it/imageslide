$(function () 
{
    function tintImage(imgElement,tintColor) 
    {
        /*var map = context.getImageData(0,0,320,240);        
        var imdata = map.data;

        var r,g,b,avg;
        for(var p = 0, len = imdata.length; p < len; p+=4) 
        {
            r = imdata[p]
            g = imdata[p+1];
            b = imdata[p+2];
            
            avg = Math.floor((r+g+b)/3);

            imdata[p] = imdata[p+1] = imdata[p+2] = avg;
        }

        context.putImageData(map,0,0);*/

        // overlay filled rectangle using lighter composition

        // replace image source with canvas data
        imgElement.src = canvas.toDataURL();
    }   
    
    
    //Verificar se color tem # e mais ou igual a 3 letras/numeros
    $.fn.imageSlide = function(image1, image2, orientation, tintColor)
    {
        orientation = (orientation == null || (orientation != "vertical" && orientation != "horizontal")) ? "vertical" : orientation;

        return $(this).each(function()
        {
            $(this).append('<img src="' + image1 + '" id="img1" class="image-slide">');

            if(image2 == null){
                image2 = image1;
            }

            var r = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
            alert(r.test(tintColor));

            $(this).append('<img src="' + image2 + '" id="img2" class="image-slide">');
            $(this).children('*').wrapAll('<canvas id="canvas"></canvas>');
            
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            var img_01 = document.getElementById("img1");
            var img_02 = document.getElementById("img2");

            var new_pos = 0;

            img_01.onload = function()
            {
                var img_width = img_01.width;
                var img_height = img_01.height;

                canvas.width = (orientation == "vertical") ? img_width : img_width * 2;
                canvas.height = (orientation == "vertical") ? img_height * 2 : img_height;
                
                context.drawImage(img_01, 0, 0, img_width, img_height);//img, x, y, w, h

                img_02.onload = function() 
                {
                    new_pos = (orientation == "vertical") ? img_height : img_width;

                    var x = (orientation == "vertical") ? 0 : img_width;
                    var y = (orientation == "vertical") ? img_height : 0;

                    context.drawImage(img_02, x, y, img_width, img_height);//img, x, y, w, h
                    var map = context.getImageData(x, y, img_width, img_height);        

                    var imgdata = map.data;
                    var r,g,b,avg;
                    
                    for(var p = 0, len = imgdata.length; p < len; p+=4) 
                    {
                        r = imgdata[p]
                        g = imgdata[p+1];
                        b = imgdata[p+2];

                        avg = Math.floor((r+g+b)/3);

                        imgdata[p] = imgdata[p+1] = imgdata[p+2] = avg;
                    }

                    context.putImageData(map, x, y);
                    
                    context.globalCompositeOperation = "lighter";
                    context.globalAlpha = 1;
                    context.fillStyle = tintColor;
                    context.fillRect(x, y, img_width, img_height);

                    var img = canvas.toDataURL("image/png");
                    document.getElementById("imageslide").innerHTML +='<img src="' + img + '" class="image-slide"/>';

                    var direction = (orientation == "vertical") ? "top" : "left";
                    var sizeValue = (orientation == "vertical") ? img_height : img_width;

                    if(orientation == 'vertical'){
                        $('.image-slide').css({"position": "relative", "top": "0", "transition": direction+" .2s ease-in-out"});
                        $('.imageslide').css({"overflow": "hidden", "height": sizeValue, "display": "inline-block"});
                    } else {
                        $('.image-slide').css({"position": "relative", "left": "0", "transition": direction+" .2s ease-in-out"});
                        $('.imageslide').css({"overflow": "hidden", "width": sizeValue, "display": "inline-block"});
                    }
                    
                    var slide = false;

                    $('.image-slide').hover(function()
                    {
                        var target = (slide) ? 0 : -new_pos;

                        if(orientation == 'vertical'){
                            $('.image-slide').css({"top": target});
                        } else {
                            $('.image-slide').css({"left": target});
                        }

                        slide = !slide;
                    });
                    
                };
            };

            $('#canvas').remove();
        });
    }
    
    $('#imageslide.imageslide').imageSlide('1.png', '2.png', 'horizontal', '#fff');
});