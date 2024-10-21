function loading(flag){
    if(flag){
        $('#loading').show();
    }else{
        $('#loading').hide();
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function redirectPage(url){
    var getNIK = getUrlParameter("nik");
    var getPhone = getUrlParameter("phone");
    var getName = getUrlParameter("name");
    if(getNIK){
        window.location.href = url+"?nik="+getNIK;
        return
    }else if(getPhone){
        window.location.href = url+"?phone="+getPhone;
        return
    }else if(getName){
        window.location.href = url+"?name="+getName;
        return
    }else{
        window.location.href = url;
    }
}

function calculateAge(birthdate) {
    var birthDate = new Date(birthdate); 
    var today = new Date(); 
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; 
    }

    return age;
}

var getNIK = getUrlParameter("nik");
if(getNIK){
    $("#input-nik").val(getNIK);
}
var getPhone = getUrlParameter("phone");
if(getPhone){
    $("#input-nohp").val(getPhone);
}
var getName = getUrlParameter("name");
if(getName){
    $("#input-nama").val(getName);
}

$(document).ready(function () {
    var sessionUser = Cookies.get('sessionUser');
    var username = localStorage.getItem("username");
    if (!sessionUser && !username) {
        window.location.href = "login.html";
    }
    if(sessionUser){
        $('#tag-username').text(sessionUser)
    }
    
    if(username){
        $('#tag-username').text(username)
    }
    $('#logoutButton').click(function () {

        Cookies.remove('sessionUser');
        
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("loginTime");

        window.location.href = "login.html";
        alert("logout");
    });
});