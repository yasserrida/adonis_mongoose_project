// Ajouter un cour
function store_cour(){
    $(".cssload-container").css("display","block");
    $.post("cour_store",
        {   code_module:$("#module option:selected").val(),
            nom:$("#nom").val(), 
            type:$("#type option:selected").val(),
            manualfile:$("#manualfile").val()
        },function(response){ 
            if(response = '1'){ $("#msg").css('color','green');$("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);}
            else { $("#msg").css('color','red');$("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);}
    });
    $(".cssload-container").css("display","none");           
}
// Supprimer cour
function delete_cour(x){
    if (confirm("Voulez-vous supprimer ce cour ?")) {
        $.post( "cour_delete", { id:x }, function(response){ if(response = '1'){$("#"+x).hide();}else{alert('Opération échouée.');}});
    }
}
//Interface modifier cour
function edit_cour(x){
    $(".modif").show();
    $("#aj").hide();    
    $(".id").val(x);            
    $(".nom").val($("#nom"+x).text());
    $(".type").val($("#type"+x).text());
    $(".module").val($("#intitule"+x).text());
}
// modifier cour
function update_cour(){
    $.post("cour_update",
            {   id:$(".id").val(),
                code_module:$(".module option:selected").val(),
                nom:$(".nom").val(), 
                type:$(".type option:selected").val()
            },
            function(response){ 
                if(response = '1'){ $("#msg1").fadeIn(4000);$("#msg1").html('Opération éffectuer.');$("#msg1").fadeOut(4000);$("#msg1").css('color','green');$(".modif").hide(); }
                else { $("#msg1").fadeIn(4000);$("#msg1").html('Opération échouée.');$("#msg1").fadeOut(4000);$("#msg1").css('color','red');}
            });
}