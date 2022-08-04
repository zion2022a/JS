
const quizData=[
    {

        q:"Which is the captail of India",
        a: 'Mumbai',
        b:'Delhi',
        c: 'Chennai',
        d: 'Kolkata',
        correct:'b'
    },

    {
        q:"Which is the most popular programming language",
        a:'JavaScript',
        b:'Java',
        c:'C++',
        d:'Python',
        correct:'a'
    },

    {
        q:"Who was the founder of Apple Inc",
        a:'Steve Wozniak',
        b:'Bill Gates',
        c:'Elon Musk',
        d:'Steve Jobbs',
        correct:'d'
    },

    {
        q:"What does the Internet prefix WWW stand for?",
        a:'Western Washington World',
        b:'Wide Width Wickets',
        c:'World Wide Web',
        d:'Worldwide Weather',
        correct:'c'
    },

    {
        q:"Which of these products is not made by the Apple Corporation",
        a:'Ipod',
        b:'Ipad',
        c:'IMax',
        d:'Iphone',
        correct:'c'
    }

    ];


    let currentq=0;
    let a1=document.getElementById('a_text');
    let b1=document.getElementById('b_text');
    let c1=document.getElementById('c_text');
    let d1=document.getElementById('d_text');

    const ques=document.getElementById('question');

    let selans=undefined;
    let score=0;

    function quiz(currentq){

        deselect();

        if(currentq>=quizData.length){

            $('.quiz-container').html('<h4>Your score is '+score+'/'+quizData.length+'</h4>');
           // alert("Quiz Over");
        }
        else{

            ques.innerHTML=quizData[currentq].q;
            a1.innerHTML=quizData[currentq].a;
            b1.innerHTML=quizData[currentq].b;
            c1.innerHTML=quizData[currentq].c;
            d1.innerHTML=quizData[currentq].d;
        }

       
        

        // $('.btn').click(function (){

        //     currentq++;
        //     quiz(currentq);

        // });
        
    }
    quiz(currentq);

    function deselect(){

        const ans1=document.querySelectorAll('.answer');

        ans1.forEach( (ans1)=>{

            
            ans1.checked=false;
            
        })
    }


    function check(){

        selans=undefined;
        const ans=document.querySelectorAll('.answer');

        ans.forEach((ans)=>{

            if(ans.checked){
                selans=ans.id;
            }
            
            // console.log(ans.checked);
            
           
    });

    
}

    $('.btn').click( ()=>{

        check();

        if(selans){
            console.log(selans);
            

            if(selans==quizData[currentq].correct){
                score++;
            }
            currentq++;
            console.log(score);
            quiz(currentq);
        }

        
    });
    check();
    