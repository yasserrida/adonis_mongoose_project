$.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
// Chargement de la page des formateurs
function chargerfor(){
    $.get("load_formateurs", { },function(response){ 
        $("#rows").text('');var data = $.parseJSON(response);
        $.each(data,function(i,value){ $("#rows").append("<tr id="+data[i].id+"><td id='cin"+data[i].id+"'>"+data[i].cin+"</td><td id='nom"+data[i].id+"'>"+data[i].name+"</td><td id='prenom"+data[i].id+"'>"+data[i].prenom+"</td><td id='tele"+data[i].id+"'>"+data[i].tele+"</td><td>"+data[i].email+"</td><td><button class='btn btn-circle btn-mn btn-warning' onclick='edit_formateur("+data[i].id+")' class='modifier'><span class='fa fa-edit'></span></button></td><td><button onclick='delete_user("+data[i].id+")'class='btn btn-circle btn-mn btn-danger' value='delete'><span class='fa fa-trash'></span></button></td></tr>"); });
        $('#datatables-example').DataTable();
    });
}
// Chargement de la page des services
function chargerser(){
    $.get("load_services", { },function(response){ 
        $("#rows").text('');var data = $.parseJSON(response);
        $.each(data,function(i,value){ $("#rows").append("<tr id="+data[i].id+"><td id='cin"+data[i].id+"'>"+data[i].cin+"</td><td id='nom"+data[i].id+"'>"+data[i].name+"</td><td id='prenom"+data[i].id+"'>"+data[i].prenom+"</td><td id='tele"+data[i].id+"'>"+data[i].tele+"</td><td>"+data[i].email+"</td><td><button class='btn btn-circle btn-mn btn-warning' onclick='edit_formateur("+data[i].id+")' class='modifier'><span class='fa fa-edit'></span></button></td><td><button onclick='delete_user("+data[i].id+")'class='btn btn-circle btn-mn btn-danger' value='delete'><span class='fa fa-trash'></span></button></td></tr>");});
        $('#datatables-example').DataTable();
    });
}
// Ajouter formateur ou service
function store_formateur(){
    $(".cssload-container").css("display","block"); 
    $.post("prof_store",
            {   role:$("#content").find("input[name='role']").val(),
                cin:$("#content").find("input[name='cin']").val(), 
                name:$("#content").find("input[name='name']").val(), 
                prenom:$("#content").find("input[name='prenom']").val(), 
                email:$("#content").find("input[name='email']").val(), 
                tele:$("#content").find("input[name='tele']").val(), 
                sexe:$("#sexe option:selected").val()
            },function(response){ 
                if ($("#content").find("input[name='role']").val() == "prof"){ chargerfor(); }else{ chargerser();}
                if(response = '1'){ $("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);$("#msg").css('color','green');}
                else { $("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);$("#msg").css('color','red');}
            });
    $(".cssload-container").css("display","none");   
}
// Interface Modifier formateur ou service
function edit_formateur(x){
    $(".modif").show();
    $("#aj").hide();    
    $(".id").val(x);            
    $(".cin").val($("#cin"+x).text());
    $(".name").val($("#nom"+x).text());
    $(".prenom").val($("#prenom"+x).text());
    $(".tele").val($("#tele"+x).text());
}
// Modifier formateur ou service
function update_formateur(){
    $.post("prof_update",
            {   id:$(".id").val(),
                name:$(".name").val(), 
                prenom:$(".prenom").val(), 
                tele:$(".tele").val(), 
                cin:$(".cin").val()
            },function(response){ 
                if ($("#content").find("input[name='role']").val() == "prof"){ chargerfor(); }else{ chargerser();}
                if(response = '1'){ $("#msg1").fadeIn(4000);$("#msg1").html('Opération éffectuer.');$("#msg1").fadeOut(4000);$("#msg1").css('color','green');$(".modif").hide(); }
                else{ $("#msg1").fadeIn(4000);$("#msg1").html('Opération échouée.');$("#msg1").fadeOut(4000);$("#msg1").css('color','red');}
            });
}

