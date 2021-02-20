$.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
charger();
// Chargement de la page 
function charger(){
    $.get("load_stagiaires", { },function(response){ 
        $("#rows").text(''); var data = $.parseJSON(response);
        $.each(data,function(i,value){
            $("#span").append("<span style='display:none' id='fil"+data[i].id+"'>"+data[i].code_filiere+"</span>");
            $("#rows").append("<tr id="+data[i].id+"><td id='cin"+data[i].id+"'>"+data[i].cin+"</td><td id='nom"+data[i].id+"'>"+data[i].name+"</td><td id='prenom"+data[i].id+"'>"+data[i].prenom+"</td><td id='tele"+data[i].id+"'>"+data[i].tele+"</td><td id='fil"+data[i].id+"'>"+data[i].nom_filiere+"</td><td><button class='btn btn-circle btn-mn btn-warning' onclick='edit_stag("+data[i].id+")' class='modifier'><span class='fa fa-edit'></span></button></td><td><button onclick='delete_user("+data[i].id+")'class='btn btn-circle btn-mn btn-danger' value='delete'><span class='fa fa-trash'></span></button></td></tr>");      
        });
        $('#datatables-example').DataTable();
    });
}
// Ajouter stagiaire
function store_user(){
    $(".cssload-container").css("display","block"); 
    $.post("user_store",
        {   role:$("#role").val(),
            cin:$("#cin").val(), 
            name:$("#name").val(), 
            prenom:$("#prenom").val(), 
            email:$("#email").val(), 
            tele:$("#tele").val(), 
            sexe:$("#sexe option:selected").val(),
            adress:$("#adress").val(), 
            date_n:$("#dn").val(), 
            lieu_n:$("#ln").val(), 
            code_filiere:$("#cf option:selected").val()
        },function(response){ 
                charger();
                if(response = '1'){ $("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);$("#msg").css('color','green'); }
                else{ $("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);$("#msg").css('color','red');}
            });
    $(".cssload-container").css("display","none");   
}
// interface Modifier stagiaire
function edit_stag(x){
    $(".modif").show();
    $("#aj").hide();    
    $(".id").val(x);            
    $(".cin").val($("#cin"+x).text());
    $(".name").val($("#nom"+x).text());
    $(".prenom").val($("#prenom"+x).text());
    $(".tele").val($("#tele"+x).text());
    $(".cf").val($("#fil"+x).text());
}
// Modifier stagiaire
function update_stag(){
    $.post("user_update",
        {   id:$(".id").val(),
            cin:$(".cin").val(),
            name:$(".name").val(), 
            prenom:$(".prenom").val(), 
            tele:$(".tele").val(), 
            code_filiere:$(".cf option:selected").val()
        },
        function(response){ 
            charger();
            if(response = '1'){ $("#msg1").fadeIn(4000);$("#msg1").html('Opération éffectuer.');$("#msg1").fadeOut(4000);$("#msg1").css('color','green');$(".modif").hide();}
            else{ $("#msg1").fadeIn(4000);$("#msg1").html('Opération échouée.');$("#msg1").fadeOut(4000);$("#msg1").css('color','red');}
        });
}
