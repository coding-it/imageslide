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
        if(orientation == null)
        {
            orientation = "vertical";
        }
        
        if(orientation != null && orientation != "vertical" && orientation != "horizontal")
        {
            orientation = "vertical";
        }
                
        return $(this).each(function()
        {
            $(this).append('<img src="' + image1 + '" id="img1" class="image-slide">');
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

                if(orientation == "vertical")
                {
                    canvas.width = img_width;
                    canvas.height = img_height * 2;
                }
                
                if(orientation == "horizontal")
                {
                    canvas.width = img_width * 2;
                    canvas.height = img_height;
                }
                
                context.drawImage(img_01, 0, 0, img_width, img_height);//img, x, y, w, h

                img_02.onload = function() 
                {
                    if(orientation == "vertical")
                    {
                        new_pos = img_height;
                        
                        context.drawImage(img_02, 0, img_height, img_width, img_height);//img, x, y, w, h
                        
                        var map = context.getImageData(0, img_height, img_width, img_height);        
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

                        context.putImageData(map, 0, img_height);
                        
                        context.globalCompositeOperation = "lighter";
                        context.globalAlpha = 1;
                        context.fillStyle = tintColor;
                        context.fillRect(0, img_height, img_width, img_height);
                        
                        var img = canvas.toDataURL("image/png");
                        document.getElementById("imageslide").innerHTML +='<img src="' + img + '" class="image-slide"/>';

                        $('.image-slide').css({"position": "relative", "top": "0", "transition": "top .2s ease-in-out"});
                        $('.imageslide').css({"overflow": "hidden", "height": img_height, "display": "inline-block"});
                        
                        

                        var slide = false;

                        $('.image-slide').hover(function()
                        {
                            var target = (slide) ? 0 : -new_pos;
                            $('.image-slide').css({"top": target});
                            slide = !slide;
                        });
                    }
                    
                    if(orientation == "horizontal")
                    {
                        new_pos = img_width;
                        
                        context.drawImage(img_02, img_width, 0, img_width, img_height);//img, x, y, w, h
                        
                        var map = context.getImageData(img_width, 0, img_width, img_height);        
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

                        context.putImageData(map, img_width, 0);
                        
                        context.globalCompositeOperation = "lighter";
                        context.globalAlpha = 1;
                        context.fillStyle = tintColor;
                        context.fillRect(img_width, 0, img_width, img_height);
                        
                        var img = canvas.toDataURL("image/png");
                        document.getElementById("imageslide").innerHTML +='<img src="' + img + '" class="image-slide"/>';

                        $('.image-slide').css({"position": "relative", "left": "0", "transition": "left .2s ease-in-out"});
                        $('.imageslide').css({"overflow": "hidden", "width": img_width, "display": "inline-block"});

                        var slide = false;

                        $('.image-slide').hover(function()
                        {
                            var target = (slide) ? 0 : -new_pos;
                            $('.image-slide').css({"left": target});
                            slide = !slide;
                        });
                    }
                };
            };

            $('#canvas').remove();
        });
    }
    
    $('#imageslide.imageslide').imageSlide('1.png', '2.png', 'vertical', '#000');
});