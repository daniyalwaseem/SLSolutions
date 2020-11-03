$(".toggle_btn1").click(function(){
   $(this).toggleClass("active");
  $(".wrapper1 ul").toggleClass("active");

  if($(".toggle_btn1").hasClass("active")){
    $(".toggle_text1").text("Show Less");
  }
  else{
    $(".toggle_text1").text("Show More");
  }
});

$(".toggle_btn2").click(function(){
   $(this).toggleClass("active");
  $(".wrapper2 ul").toggleClass("active");

  if($(".toggle_btn2").hasClass("active")){
    $(".toggle_text2").text("Show Less");
  }
  else{
    $(".toggle_text2").text("Show More");
  }
});

$(".toggle_btn3").click(function(){
   $(this).toggleClass("active");
  $(".wrapper3 ul").toggleClass("active");

  if($(".toggle_btn3").hasClass("active")){
    $(".toggle_text3").text("Show Less");
  }
  else{
    $(".toggle_text3").text("Show More");
  }
});

$(".toggle_btn4").click(function(){
   $(this).toggleClass("active");
  $(".wrapper4 ul").toggleClass("active");

  if($(".toggle_btn4").hasClass("active")){
    $(".toggle_text4").text("Show Less");
  }
  else{
    $(".toggle_text4").text("Show More");
  }
});
