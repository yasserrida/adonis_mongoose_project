$.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
// Ajouter Module
function store_module(){
    $(".cssload-container").css("display","block"); 
    $.post("module_store",
            {   intitule:$("#content").find("input[name='intitule']").val(),
                masse:$("#content").find("input[name='masse']").val(), 
                formateur:$("#formateur option:selected").val(),
                filiere:$("#filiere option:selected").val()
            },function(response){ 
                if(response = '1'){ $("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);$("#msg").css('color','green'); }
                else{ $("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);$("#msg").css('color','red');}
            });
    $(".cssload-container").css("display","none");   
}
// interface modifier Module
function edit_module(x){
    $(".modif").show();
    $("#aj").hide();    
    $(".id").val(x);            
    $(".intitule").val($("#intitule"+x).text());
    $(".masse").val($("#masse"+x).text());
    $(".formateur").val($('#prof'+x).text());
    $(".filiere").val($('#fil'+x).text());
}
// Modifier Module
function update_module(){
    $.post("module_update",
        {   id:$(".id").val(),
            intitule:$(".intitule").val(), 
            masse:$(".masse").val(), 
            formateur:$(".formateur").val(), 
            filiere:$(".filiere").val()
        },function(response){ 
            if(response = '1'){ $("#msg1").fadeIn(4000);$("#msg1").html('Opération éffectuer.');$("#msg1").fadeOut(4000);$("#msg1").css('color','green');$(".modif").hide();}
            else{ $("#msg1").fadeIn(4000);$("#msg1").html('Opération échouée.');$("#msg1").fadeOut(4000);$("#msg1").css('color','red');}
        });
}
// Supprimer Module
function delete_module(x){
    if (confirm("Voulez-vous supprimer ce Module ?")) {
        $.post( "module_delete", { id:x }, function(response){ if(response = '1'){ $("#"+x).hide(); } else{ alert('Opération échouée.'); }});
    }
}