
var level=0;

var gamepattern=[];

var btncolors=['blue','green','red','yellow'];

var usercolors=[];

$('body').keydown( nextseq);

    

    
    function nextseq(){

        usercolors=[];

        

        $('h1').text("Level "+level);

        var rand1=Math.floor(Math.random()*4);
            
        var color1=btncolors[rand1];

        gamepattern.push(color1);

        $('#'+color1).fadeOut(100).fadeIn(100);

        var audio = new Audio("sounds/"+color1+".mp3");


        audio.play()

       

       
 

    }

    // button press

    $('.btn').click(function(){

        var btncl=this.id;
        

        usercolors.push(btncl);

        $('#'+btncl).addClass('pressed');

        var delayInMilliseconds=100;

        setTimeout(function() {
            //your code to be executed after 1 second
            $('#'+btncl).removeClass('pressed');
        }, delayInMilliseconds);

        

    // $('#'+btncl).fadeOut(100).fadeIn(100);

        var audio = new Audio("sounds/"+btncl+".mp3");


        audio.play()

        checkans(usercolors.length);

        

    });



    function checkans(curr){

        if(gamepattern[curr-1]==usercolors[curr-1]){


            if(gamepattern.length==usercolors.length){

                level++;
                setTimeout(function () {
                    nextseq();
                  }, 1000);
                
            }
        }
        else{
            $('h1').text("Game Over, press any key to continue");
            level=0;
            $('body').addClass('game-over');

            var audio = new Audio("sounds/wrong.mp3");
            audio.play()

            setTimeout(function () {
                $('body').removeClass('game-over');
              }, 400);

              gamepattern=[];
        }
        
        console.log(usercolors);
        console.log(gamepattern);

      
    }

// audio.play();


