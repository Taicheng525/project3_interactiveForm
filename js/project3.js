//functions ================================================================================
const show_JSpun_color =()=>{
    $("#color").val("Select Color");
    $("option[value='cornflowerblue']").show();
    $("option[value='darkslategrey']").show();
    $("option[value='gold']").show();
    $("option[value='tomato']").hide();
    $("option[value='steelblue']").hide();
    $("option[value='dimgrey']").hide(); 
    $("#color option:first-child").hide();
}

const show_heartJS_color = ()=>{
    $("#color").val("Select Color");
    $("option[value='cornflowerblue']").hide();
    $("option[value='darkslategrey']").hide();
    $("option[value='gold']").hide();
    $("option[value='tomato']").show();
    $("option[value='steelblue']").show();
    $("option[value='dimgrey']").show();
    $("#color option:first-child").hide();
}

const default_colorDisplay =()=>{
    $("#color").val("Select Color");
    $("option[value='cornflowerblue']").hide();
    $("option[value='darkslategrey']").hide();
    $("option[value='gold']").hide();
    $("option[value='tomato']").hide();
    $("option[value='steelblue']").hide();
    $("option[value='dimgrey']").hide();
    $("#color option:first-child").show();
}

const checkboxStatus=(inputList)=>{
    if(inputList.is(':checked')===false){
        return false;
    }else{
        return true;
    }
}

//Set focus on the first text field ======================================================
$("#name").focus();

//”Job Role” section of the form =========================================================
$("#other-title").hide();

$("#title").on('change',function(){
    if($(this).val()==="other"){
        $("#other-title").show();
    }else{
        $("#other-title").hide();
    }
});

//”T-Shirt Info” section of the form =====================================================
$("#design").on('change',function(){
    if($(this).val()==="js puns"){
        show_JSpun_color();
    }else if($(this).val()==="heart js"){
        show_heartJS_color();
    }else if($(this).val()==="Select Theme"){
        default_colorDisplay();
    }
});

//”Register for Activities” section of the form ==========================================
$(".activities :checkbox").on('change', function(){
    let total= 0;

// The code below is also work for this part but I prefer using anthoer logic that I got later, so I comment this part here.
/*    if($("input[type='checkbox']:eq(0)").is(":checked")){
        total+=200;
        console.log("first checked");
    }
    for(let i=1; i<7;i++){
            if($("input[type='checkbox']:eq("+i+")").is(":checked")){
            total+=100;
        }
    }*/
    if($("input[type='checkbox']:eq(1)").is(":checked")){
            $("input[type='checkbox']:eq(3)").attr('disabled', true);
        }else{
            $("input[type='checkbox']:eq(3)").removeAttr('disabled');
        }
    
    if($("input[type='checkbox']:eq(3)").is(":checked")){
            $("input[type='checkbox']:eq(1)").attr('disabled', true);
        }else{
            $("input[type='checkbox']:eq(1)").removeAttr('disabled');
        }
    
    if($("input[type='checkbox']:eq(2)").is(":checked")){
            $("input[type='checkbox']:eq(4)").attr('disabled', true);
        }else{
            $("input[type='checkbox']:eq(4)").removeAttr('disabled');
        }
    
    if($("input[type='checkbox']:eq(4)").is(":checked")){
            $("input[type='checkbox']:eq(2)").attr('disabled', true);
        }else{
            $("input[type='checkbox']:eq(2)").removeAttr('disabled');
        }
    
    if($("input[type='checkbox']:eq(0)").is(":checked")){
        total+=100;
        console.log("first checked");
    }
    
    $(".activities :checked").each(function(){
        total+=100;
    });
    $('#a').show();
    $('#a').text("Total: "+total);
    
    if($("#a").text()=='Total: 0'){
        $("#a").hide();
    }
});

//Payment Info section of the form ======================================================
$("#payment option[value='credit card']").attr('selected',true);
$("#paypal").hide();
$("#bitcoin").hide();

$("#payment").on('change',function(){
    if($("#payment").val()==='select_method'){
        $("#credit-card").hide();
        $("#paypal").hide();
        $("#bitcoin").hide();
       }
    else if($("#payment").val()==='credit card'){
        $("#credit-card").show();
        $("#paypal").hide();
        $("#bitcoin").hide();
    }
    else if($("#payment").val()==='paypal'){
        $("#credit-card").hide();
        $("#paypal").show();
        $("#bitcoin").hide();
    }
    else if($("#payment").val()==='bitcoin'){
        $("#credit-card").hide();
        $("#paypal").hide();
        $("#bitcoin").show();     
             }
});

//Form validation =====================================================================
$("form").submit(function(){
    $('label span').remove();
    $('legend span').remove();
    $('label span').removeAttr("style");
    $('label').removeAttr("style");
    let status = true;
    
    //name section
    if($("#name").val()==''){
        $("label[for='name']").attr("style","color:red; font-weight:bold");
        $("label[for='name']").append("<span>(please provide your name)</span>")
        status = false;
    }
    
    //email section
    /*let at = $("#mail").val().indexOf("@"); <-------------------------------QUESTION HERE!
    let dot = $("#mail").val().lastIndexOf(".");*/
    if($("#mail").val()==''|| $("#mail").val().indexOf("@")<1|| $("#mail").val().lastIndexOf(".")<$("#mail").val().indexOf("@")+2|| $("#mail").val().lastIndexOf(".")+2>=($("#mail").val().length)){
        $("label[for='mail']").attr("style","color:red; font-weight:bold");
        $("label[for='mail']").append("<span>(please provide a valid email address)</span>");
        status = false;
    }
    
    //T-shirt info section
    if($("#design").val()==="Select Theme"){
        $(".shirt legend").append("<span style='color: red; font-weight:bold'> (Don't forget to pick a T-shirt)</span>");
        status = false;
    }
    
    //activities section
    if(checkboxStatus($(".activities :checked"))==false){
        $(".activities legend").append("<span style='color: red; font-weight:bold'> (please select an Activity)</span>");
        status = false;
    }
    
    //payment section
    if($("#payment").val()==="credit card"){
        if($("#cc-num").val()==""|| $("#cc-num").val().length<13|| $("#cc-num").val().length>16|| isNaN($("#cc-num").val())==true){
            $("label[for='cc-num']").attr("style","color:red; font-weight:bold");
            status = false;
           }
        if($("#zip").val()==""|| $("#zip").val().length !=5|| isNaN($("#zip").val())==true){
            $("label[for='zip']").attr("style","color:red; font-weight:bold");
            status = false;
           }
        if($("#cvv").val()==""|| $("#cvv").val().length !=3|| isNaN($("#cvv").val())==true){
            $("label[for='cvv']").attr("style","color:red; font-weight:bold");
            status = false;
           }
    }
    
    //return the final status
    return status;
});







